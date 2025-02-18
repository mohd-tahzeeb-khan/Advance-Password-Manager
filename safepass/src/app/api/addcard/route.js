import { NextResponse } from "next/server";
import { getDBConnection } from "@/config/db_connection";
import { BEdecrypt, BEencrypt} from "@/utils/encryption";
import { Bed } from "lucide-react";
// import { useEffect } from "react";


export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const userid = searchParams.get("userid");
      console.log("sdgfd",userid)
      if (!userid) {
        return NextResponse.json({ message: "i dont know Email is required" }, { status: 400 });
      }
      const connection = await getDBConnection();
      const [cards] = await connection.execute("SELECT * FROM usercards WHERE user_id = ?", [userid]);
      await connection.end();
  
      if (cards.length === 0) {
        return NextResponse.json({ message: "Cards not found" }, { status: 404 });
      }
      const decryptedCards = cards.map(card => ({
        ...card,
        pin:BEdecrypt(card.pin),cvv:BEdecrypt(card.cvv), expiry_date:BEdecrypt(card.expiry_date) // Decrypt pin before sending responsedecrypt(user.pin)
      }));
      return NextResponse.json(decryptedCards); // Return user details
    } catch (error) {
      console.error("❌ Fetch User Error:", error);
      return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
  }




  
// -----------------------------------------------------------------------------------------------------------------
export async function POST(req) {
    try {
        let { user_id, cardNumber,cardholderName, expiryDate, cvv, pin, network, bank, cardType }=await req.json();
        if(!user_id || !cardNumber || !cardholderName ||!expiryDate ||!cvv||!pin||!network || !bank || !cardType){
            return NextResponse.json({
                message:"All Fields are Required"
            }, {
                status:400
            });
        }
        pin=BEencrypt(pin);
        cvv=BEencrypt(cvv);
        expiryDate=BEencrypt(expiryDate);
        const connection =await getDBConnection();
        await connection.execute("INSERT INTO usercards (user_id, pin,cvv,expiry_date,card_no,cardholder_name,type,card_network,bank_name) VALUES (?,?,?,?,?,?,?,?,?)",
           
           
           
            [user_id, pin, cvv,expiryDate, cardNumber, cardholderName,cardType, network, bank ]);
            await connection.end();
            return NextResponse.json({message:"Card added to the user's Account"}, {status:201});
    } catch (error) {
        console.log("POST Request for Card adding is failed", error)
        return NextResponse.json({message:"Internal Server Error", error:error.message}, {status:500});
    }
    
}