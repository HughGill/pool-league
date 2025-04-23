import jwt

from dotenv import load_dotenv
load_dotenv()

import os
secret = os.getenv("NEXTAUTH_SECRET")

NEXTAUTH_SECRET = secret

def verify_nextauth_token(request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]
    try:
        decoded = jwt.decode(token, NEXTAUTH_SECRET, algorithms=["HS256"])
        print("Decoded token:", decoded)
        return decoded  # contains email, name, role, etc.
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
