import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.post(
      "https://api.igdb.com/v4/games",
      "fields checksum,created_at,name,platforms,slug,updated_at,url,cover.*;",
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
