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
      const [passwords] = await connection.execute("SELECT * FROM userPassword WHERE user_id = ?", [userid]);
      await connection.end();
  
      if (passwords.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const decryptedPassword = passwords.map(password => ({
        ...password,
        password_hashed:BEdecrypt(password.password_hashed) // Decrypt pin before sending responsedecrypt(user.pin)
      }));
      return NextResponse.json(decryptedPassword); // Return user details
    } catch (error) {
      console.error("❌ Fetch User Error:", error);
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
  }


// -------------------------------------------------------------------------------------------------------
export async function POST(req) {
    try {
        
        let { user_id ,username, websiteName, url, password, confirmPassword}=await req.json();
        if(!user_id || !username ||!websiteName ||!url||!password||!confirmPassword){
            return NextResponse.json({
                message:"All Fields are Required"
            }, {
                status:400
            });
        }
        password=BEencrypt(password);
        const connection =await getDBConnection();
        await connection.execute("INSERT INTO userPassword (user_id,username, website_name, url, password_hashed) VALUES (?,?,?,?,?)",
            [user_id, username, websiteName,url, password]);
            await connection.end();
            return NextResponse.json({message:"Card added to the user's Account"}, {status:201});
    } catch (error) {
        console.log("POST Request for Card adding is failed", error)
        return NextResponse.json({message:"Internal Server Error", error:error.message}, {status:500});
    }
    
}