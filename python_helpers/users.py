from flask import Blueprint, request, jsonify
import json
import bcrypt
import os

users_bp = Blueprint('users', __name__, url_prefix='/api')

USERS_FILE = 'data/application_users.json'  # Adjust path if needed

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
        "id": len(users) + 1,
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



@users_bp.route('/user/:userId', methods=['PUT'])
def editUser():