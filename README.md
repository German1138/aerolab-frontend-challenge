# Aerolab Coding Challenge

[Demo »](https://gaming-haven-z-gman.vercel.app/)

![image](https://github.com/user-attachments/assets/7a8c6020-c744-4542-8e72-68b0b928614b)

## About this challenge

The objective was to develop a web application enabling users to search for and digitally organize video games by leveraging the IGDB API and browser/device storage. The project is required to use the Next.js App Router, with flexible styling options. The final deliverable should be fully functional, visually appealing, and offer an excellent user experience, with an emphasis on responsive and mobile-friendly design.

- [Challenge information »](https://github.com/Aerolab/frontend-developer-coding-challenge)
- [IGDB API information »](https://api-docs.igdb.com/#getting-started)

## Tech Stack

- **Next.js:** Used for routing and overall application development (TypeScript).
- **Material UI:** Implemented for visual design and styled components.
- **lucide-react:** Integrated to include modern and customizable icons.
- **Axios:** Used to perform HTTP requests and fetch API data.
- **Vercel:** Platform used for deployment and hosting of the application.

## Postman collection

This project uses a Postman collection to interact with the IGDB API. The collection includes predefined requests for key functionalities, such as:

1. **Get Games:** Fetches a list of games filtered by specific criteria, such as rating and themes.
2. **Get Game:** Retrieves detailed information about a specific game using its slug.
3. **Search:** Finds games matching a partial name query.

You can find the full Postman collection [here](public/aerolab-frontend-challenge.postman_collection.json).

#### How to Use:

1. **Download the collection:**

- Click the link above to download the `aerolab-frontend-challenge.postman_collection.json` file.

2. **Import into Postman:**

- Open Postman and click on **Import**.
- Select the downloaded JSON file.

3. **Configure Authentication:**

- Add your `authorization-token` and `client-ID` in Postman's environment variables.

#### Example API Endpoints:

- **Base URL:** `https://api.igdb.com/v4/games`
- **Authentication Headers:**
  - `Authorization: Bearer {{authorization-token}}`
  - `Client-ID: {{client-ID}}`

This setup ensures you can test the API endpoints seamlessly. If you need further details about the API, refer to the IGDB API documentation.

## Extra features

- **Enhanced the user experience (UX):** by adding the app logo on the game detail page, which redirects users to the home page.
- **Implemented a modal:** to showcase various game screenshots.
- **Introduced a confirmation dialog:** before removing a game from the collection on the home page. This improvement enhances UX by asking users to confirm their action, ensuring they are certain about the deletion.
