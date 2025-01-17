import { IGame } from "@/app/interfaces";
import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const slugs = req?.nextUrl?.searchParams?.get("slugs");
  const filter = req?.nextUrl?.searchParams?.get("filter");

  const slugsArray = slugs?.split(",");

  const slugConditions = slugsArray
    ?.map((slug) => `slug = "${slug}"`)
    .join(" | ");

  const BODY = `fields created_at,
                name,
                slug,
                cover.url,
                cover.image_id;
                sort first_release_date ${filter === "newest" ? "desc" : "asc"};
                where ${slugConditions};
                limit 50;`;

  try {
    const { data } = await axios.post("https://api.igdb.com/v4/games", BODY, {
      headers: {
        Accept: "application/json",
        Authorization: process.env.AUTHORIZATION,
        "Client-ID": process.env.CLIENT_ID,
      },
    });

    if (filter === "last-added" && slugsArray) {
      data.sort(
        (a: IGame, b: IGame) =>
          slugsArray.indexOf(b.slug) - slugsArray.indexOf(a.slug)
      );
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]));
  }
}
