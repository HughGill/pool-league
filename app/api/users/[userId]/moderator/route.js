import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getToken } from "next-auth/jwt";

const USERS_FILE = path.join(process.cwd(), "data", "application_users.json");

async function updateUserRole(userId, request, roleUpdates) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    const usersData = JSON.parse(data);
    const users = usersData.users;

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    Object.assign(users[userIndex], roleUpdates);

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 4));

    return NextResponse.json({ status: "success", message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { userId } = await params;
  return updateUserRole(userId, request, { isMod: true, isAdmin: false, isUser: false });
}
