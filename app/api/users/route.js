import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "application_users.json");

export async function GET() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ users: [] });
    }

    const data = fs.readFileSync(USERS_FILE, "utf8");
    const usersData = JSON.parse(data);
    const users = usersData.users || [];

    // Remove password field
    const sanitizedUsers = users.map(({ password, ...user }) => user);

    return NextResponse.json({ users: sanitizedUsers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
