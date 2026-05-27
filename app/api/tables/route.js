import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TABLES_FILE = path.join(process.cwd(), "data", "tables.json");

export async function GET() {
  try {
    if (!fs.existsSync(TABLES_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(TABLES_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to load tables" }, { status: 500 });
  }
}
