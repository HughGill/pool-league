import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getToken } from "next-auth/jwt";

const USERS_FILE = path.join(process.cwd(), "data", "application_users.json");

export async function GET(request, { params }) {
  const { userId } = await params;

  try {
    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = fs.readFileSync(USERS_FILE, "utf8");
    const usersData = JSON.parse(data);
    const user = usersData.users.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { userId } = await params;
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isAdministrator, isModerator, isUser } = await request.json();

  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    const usersData = JSON.parse(data);
    const users = usersData.users;

    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    users[userIndex].isAdmin = isAdministrator;
    users[userIndex].isMod = isModerator;
    users[userIndex].isUser = isUser;

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 4));

    return NextResponse.json({ status: "success", message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { userId } = await params;
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    const usersData = JSON.parse(data);
    const users = usersData.users;

    const updatedUsers = users.filter((u) => u.id !== userId);

    if (updatedUsers.length === users.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: updatedUsers }, null, 4));

    return NextResponse.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
