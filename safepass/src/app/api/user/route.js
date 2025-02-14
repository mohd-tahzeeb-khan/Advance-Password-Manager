import { NextResponse } from "next/server";
import { getDBConnection } from "../../../config/db_connection";

// ----------------------------------------------------------------------------------
export async function GET() {
  try {
    const connection = await getDBConnection();// Establish a MySQL connection
    const [results] = await connection.execute("SELECT * FROM user");// Execute the query
    await connection.end();// Close the connection
    return NextResponse.json(results); // Return JSON response
  } catch (error) {
    return NextResponse.json(
        {
            message:"Database Error: ", error:error.message //return Json response with Error message.
        }
    )}
}
// ----------------------------------------------------------------------------------
export async function CreateUserPost() {
    
    
}
