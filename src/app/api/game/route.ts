import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req?.nextUrl?.searchParams?.get("id");

    const { data } = await axios.post(
      "https://api.igdb.com/v4/games",
      `
        fields
        created_at,
        name,
        summary,
        first_release_date, 
        total_rating,
        status,
        involved_companies.company.name,

        release_dates.status.name,
        release_dates.status.description,
        release_dates.human,

        platforms.name,
        platforms.abbreviation,
        platforms.slug,
        platforms.platform_logo.url,
        platforms.platform_logo.image_id,

        slug,
        updated_at,
        url,
        genres.*,

        similar_games.name,
        similar_games.cover.url,
        similar_games.cover.image_id,
        similar_games.slug,

        cover.url,
        cover.image_id, 
        screenshots.url,
        screenshots.image_id; 


        sort release_dates.date desc;

        exclude genres.created_at, genres.checksum, genres.updated_at;

        where slug = "${id}";
      `,
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
