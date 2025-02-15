import { NextResponse } from "next/server";
import { getDBConnection } from "@/config/db_connection";

export async function POST(req) {
    try {
        const { user_id, upino, account_holder_name, account_type, pin, bank_name, upi_app } = await req.json();
        
        if (!user_id || !upino || !account_holder_name || !account_type || !pin || !bank_name || !upi_app) {
            return NextResponse.json({ message: "All Fields are Required" }, { status: 400 });
        }

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
