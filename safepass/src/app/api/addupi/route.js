import { NextResponse } from "next/server";
import { getDBConnection } from "@/config/db_connection";
import { BEdecrypt, BEencrypt } from "@/utils/encryption";



export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const userid = searchParams.get("userid");
  
      if (!userid) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
      }
      const connection = await getDBConnection();
      const [upis] = await connection.execute("SELECT * FROM userUpi WHERE user_id = ?", [userid]);
      await connection.end();
  
      if (upis.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      const decryptedUpis = upis.map(upi => ({
        ...upi,
        pin:BEdecrypt(upi.pin),UPI_no:BEdecrypt(upi.UPI_no) // Decrypt pin before sending responsedecrypt(user.pin)
      }));
      console.log("111d",decryptedUpis)
      return NextResponse.json(decryptedUpis); // Return user details
    } catch (error) {
      console.error("❌ Fetch User Error:", error);
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
  }



// -------------------------------------------------------------------------------------------------------------
export async function POST(req) {
    try {
      console.log(req)
        let { user_id, upino, account_holder_name, account_type, pin, bank_name, upi_app } = await req.json();
        
        if (!user_id || !upino || !account_holder_name || !account_type || !pin || !bank_name || !upi_app) {
            return NextResponse.json({ message: "All Fields are Required" }, { status: 400 });
        }
        upino=BEencrypt(upino);
        pin=BEencrypt(pin);
        const connection = await getDBConnection();
        await connection.execute(
            "INSERT INTO userUpi (user_id, UPI_no, account_holder_name, account_type, pin, bank_name, upi_app) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [user_id, upino, account_holder_name, account_type, pin, bank_name, upi_app]
        );
        await connection.end();
        
        return NextResponse.json({ message: "UPI details added successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error adding UPI details:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
