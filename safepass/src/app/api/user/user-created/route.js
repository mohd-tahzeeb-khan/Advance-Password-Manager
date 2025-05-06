import { getDBConnection } from "@/config/db_connection";



export async function POST(request) {
    try {
      const body = await request.json();
      const { id, email_addresses, username } = body.data;
      const email = email_addresses?.[0]?.email_address;
      const clerk_id=id.replace("user_", "");
      const connection=await getDBConnection();
      await connection.execute("INSERT INTO user (name, email, clerk_id) VALUES (?, ?, ?)", [username, email, clerk_id]);
      await connection.end();
      return new Response({status:200})

    } catch (error) {
      console.error('❌ Error handling webhook:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  