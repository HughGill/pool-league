from flask import Blueprint, request, jsonify
import json
import bcrypt
import os
from python_helpers.auth import verify_nextauth_token

users_bp = Blueprint('users', __name__, url_prefix='/server-api')

USERS_FILE = 'data/application_users.json'  # Adjust path if needed

def generate_custom_user_id(users, prefix="NorthInishowenPoolLeague", padding=5):
    max_id_num = 0

    for user in users:
        user_id = user.get("id", "")
        if user_id.startswith(prefix):
            num_part = user_id.replace(prefix, "")
            if num_part.isdigit():
                max_id_num = max(max_id_num, int(num_part))

    next_id_num = max_id_num + 1
    return f"{prefix}{str(next_id_num).zfill(padding)}"


@users_bp.route('/register', methods=['POST'])
def register():
    given_name = request.json.get('first_name', "").strip()
    surname = request.json.get('surname', "").strip()
    full_name = f"{given_name} {surname}".strip()
    email = request.json.get("email", "").lower().strip()
    password = request.json.get("password", "")

    if not all([given_name, surname, email, password]):
        return jsonify({"error": "All fields are required."}), 400

    # Load existing users
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, "r") as f:
            try:
                users_data = json.load(f)
                users = users_data.get("users", [])
            except json.JSONDecodeError:
                users = []
    else:
        users = []

    # Check for existing user
    if any(user["email"] == email for user in users):
        return jsonify({"error": "Email already registered."}), 409

    # Hash the password properly
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12)).decode('utf-8')

    # Create new user entry
    new_user = {
        "id": generate_custom_user_id(users),
        "given_name": given_name,
        "surname": surname,
        "full_name": full_name,
        "email": email,
        "password": hashed_password,
        "isMod": False,
        "isAdmin": False,
        "isUser": True,
        "isBlocked": False
    }

    users.append(new_user)

    # Save back to the JSON file
    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User registered successfully", "user": {
        "given_name": given_name,
        "surname": surname,
        "email": email
    }}), 201

@users_bp.route('/users', methods=['GET'])
def getAllUsers():
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    # Remove password field from each user before returning
    for user in users:
        user.pop("password", None)

    return jsonify({"users": users}), 200


@users_bp.route('/user/<userId>', methods=['PUT'])
def editUser(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    isAdmin = request.json.get('isAdministrator', False)
    isMod = request.json.get('isModerator', False)
    isUser = request.json.get('isUser', True)

    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isMod"] = isMod
            user["isAdmin"] = isAdmin 
            user["isUser"] = isUser   
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200  



@users_bp.route('/user/<userId>', methods=['GET'])
def get_user_by_id(userId):
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == userId:
            return jsonify({"user": user}), 200

    return jsonify({"error": "User not found"}), 404

   

@users_bp.route('/user/<userId>', methods=['DELETE'])
def delete_user_by_id(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    updated_users = [user for user in users if user["id"] != userId]

    if len(updated_users) == len(users):
        return jsonify({"error": "User not found"}), 404

    with open(USERS_FILE, "w") as f:
        json.dump({"users": updated_users}, f, indent=4)

    return jsonify({"status": "success", "message": "User deleted successfully"}), 200


@users_bp.route('/user/<userId>/administrator', methods=['PUT'])
def makeUserAdmin(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isMod"] = False
            user["isAdmin"] = True 
            user["isUser"] = False   
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200 

@users_bp.route('/user/<userId>/moderator', methods=['PUT'])
def makeUserModerator(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isMod"] = True
            user["isAdmin"] = False 
            user["isUser"] = False   
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200 

@users_bp.route('/user/<userId>/user', methods=['PUT'])
def makeUser(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isMod"] = False
            user["isAdmin"] = False 
            user["isUser"] = True   
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200 

@users_bp.route('/user/<userId>/block', methods=['PUT'])
def blockUser(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isBlocked"] = True 
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200

@users_bp.route('/user/<userId>/unblock', methods=['PUT'])
def unblockUser(userId):
    user = verify_nextauth_token(request)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    with open(USERS_FILE, "r") as f:
        users_data = json.load(f)
        users = users_data.get("users", [])

    for user in users:
        if user["id"] == str(userId):
            user["isBlocked"] = False 
            break

    with open(USERS_FILE, "w") as f:
        json.dump({"users": users}, f, indent=4)

    return jsonify({"status": "success", "message": "User updated successfully"}), 200  