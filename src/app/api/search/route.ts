import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const value = req?.nextUrl?.searchParams?.get("value");

    const { data } = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields name, cover.image_id, slug; 
      where name != null & cover.image_id != null & name ~ "${value}"*; 
      limit 10;`,
      {
        headers: {
          Accept: "application/json",
          Authorization: process.env.AUTHORIZATION,
          "Client-ID": process.env.CLIENT_ID,
        },
      }
    );

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]));
  }
}
