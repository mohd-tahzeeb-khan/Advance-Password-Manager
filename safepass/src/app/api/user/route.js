import { NextResponse } from "next/server";
import { getDBConnection } from "../../../config/db_connection";

// ----------------------------------------------------------------------------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const decodedEmail = decodeURIComponent(email); // ✅ Fix: Decode email before querying
    console.log("🔍 Searching for user with email:", decodedEmail); // Debugging log

    const connection = await getDBConnection();
    const [users] = await connection.execute("SELECT * FROM user WHERE email = ?", [decodedEmail]);
    await connection.end();

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users[0]); // Return user details
  } catch (error) {
    console.error("❌ Fetch User Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
// ----------------------------------------------------------------------------------
export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const connection = await getDBConnection();
    await connection.execute("INSERT INTO user (name, email) VALUES (?, ?)", [name, email]);
    await connection.end();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ POST User Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
    
}
