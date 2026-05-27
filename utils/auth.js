import jwt from "jsonwebtoken";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

/**
 * Verifies a NextAuth token from the request headers.
 * @param {Object} request - The request object (expected to have a headers property).
 * @returns {Object|null} - The decoded token or null if invalid.
 */
export function verifyNextAuthToken(request) {
  const authHeader = request.headers.get ? request.headers.get("Authorization") : request.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, NEXTAUTH_SECRET, { algorithms: ["HS256"] });
    console.log("Decoded token:", decoded);
    return decoded; // contains email, name, role, etc.
  } catch (error) {
    return null;
  }
}
