import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req?.nextUrl?.searchParams?.get("id");

    const { data } = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields checksum,created_at,name,platforms.*,slug,updated_at,url,cover.*; where slug = "${id}";`,
      {
        headers: {
          Accept: "application/json",
          Authorization: process.env.AUTHORIZATION,
          "Client-ID": process.env.CLIENT_ID,
        },
      }
    );

    return new Response(JSON.stringify(data[0]));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
