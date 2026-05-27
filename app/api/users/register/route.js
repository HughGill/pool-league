import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const USERS_FILE = path.join(process.cwd(), "data", "application_users.json");

function generateCustomUserId(users, prefix = "NorthInishowenPoolLeague", padding = 5) {
  let maxIdNum = 0;

  for (const user of users) {
    const userId = user.id || "";
    if (userId.startsWith(prefix)) {
      const numPart = userId.replace(prefix, "");
      if (!isNaN(numPart) && numPart !== "") {
        maxIdNum = Math.max(maxIdNum, parseInt(numPart, 10));
      }
    }
  }

  const nextIdNum = maxIdNum + 1;
  return `${prefix}${String(nextIdNum).padStart(padding, "0")}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const given_name = (body.first_name || "").trim();
    const surname = (body.surname || "").trim();
    const full_name = `${given_name} ${surname}`.trim();
    const email = (body.email || "").toLowerCase().trim();
    const password = body.password || "";

    if (!given_name || !surname || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    let users = [];
    if (fs.existsSync(USERS_FILE)) {
      try {
        const usersData = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
        users = usersData.users || [];
      } catch (e) {
        users = [];
      }
    }

    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: generateCustomUserId(users),
      given_name,
      surname,
      full_name,
      email,
      password: hashedPassword,
      isMod: false,
      isAdmin: false,
      isUser: true,
      isBlocked: false,
    };

    users.push(newUser);

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 4));

    return NextResponse.json(
      {
        status: "success",
        message: "User registered successfully",
        user: {
          given_name,
          surname,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
