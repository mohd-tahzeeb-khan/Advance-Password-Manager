import { NextResponse } from "next/server";
import { getDBConnection } from "@/config/db_connection";
// import { useEffect } from "react";

export async function POST(req) {
    try {
        const { user_id, cardNumber,cardholderName, expiryDate, cvv, pin, network, bank, cardType }=await req.json();
        if(!cardNumber || !cardholderName ||!expiryDate ||!cvv||!pin||!network || !bank || !cardType){
            return NextResponse.json({
                message:"All Fields are Required"
            }, {
                status:400
            });
        }
        const connection =await getDBConnection();
        await connection.execute("INSERT INTO userCards (user_id, pin,cvv,expiry_date,card_no,cardholder_name,type,card_network,bank_name) VALUES (?,?,?,?,?,?,?,?,?)",
           
           
           
            [user_id, pin, cvv,expiryDate, cardNumber, cardholderName,cardType, network, bank ]);
            await connection.end();
            return NextResponse.json({message:"Card added to the user's Account"}, {status:201});
    } catch (error) {
        console.log("POST Request for Card adding is failed", error)
        return NextResponse.json({message:"Internal Server Error", error:error.message}, {status:500});
    }
    
}