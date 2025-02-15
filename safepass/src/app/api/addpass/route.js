import { NextResponse } from "next/server";
import { getDBConnection } from "@/config/db_connection";


export async function POST(req) {
    try {
        
        const { user_id ,username, websiteName, url, password, confirmPassword}=await req.json();
        if(!user_id || !username ||!websiteName ||!url||!password||!confirmPassword){
            return NextResponse.json({
                message:"All Fields are Required"
            }, {
                status:400
            });
        }
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