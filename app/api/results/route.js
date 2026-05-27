import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESULTS_FILE = path.join(process.cwd(), "data", "results.json");

export async function GET() {
  try {
    if (!fs.existsSync(RESULTS_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(RESULTS_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to load results" }, { status: 500 });
  }
}
