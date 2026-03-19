# Fullstack Express Currency Converter API & UI

This project is a fully functional Fullstack application (Backend + Frontend), built to consolidate knowledge of the **Node.js** environment and the **Express.js** framework.

The application utilizes the external, public API of the National Bank of Poland (NBP) to retrieve dynamic exchange rates and calculate cross-currency rates.

## Live Demo

The application is deployed and ready for testing:

* **Frontend (UI):** [View Live Application](https://kacpibara.github.io/Currency-Converter/)
* **Backend (API):** Hosted on Render.com

> **Important Note (Cold Start):**
> The API server is hosted on a free plan. If the application has not been used for the last 15 minutes, the server goes into a "spin down" state to save resources. **The first request may take about 30-50 seconds** to wake up the server. Subsequent conversions will be near-instant!

## Architecture (Monorepo)

The project is structured as a Monorepo, divided into two independent parts (Separation of Concerns):

* **`Currency-Converter-API/`** - Backend Server (Node.js / Express.js)
* **`Currency-Converter-UI/`** - User Interface (Vanilla JS / HTML / CSS)

Using the `cors` library, the frontend communicates with the API via asynchronous `fetch()` requests. Continuous Deployment (CD) for the frontend is handled by **GitHub Actions**.

## Technologies Used

* **Backend:** Node.js, Express.js, CORS, dotenv
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (async/await, Fetch API)
* **DevOps / Hosting:** GitHub Pages, GitHub Actions, Render.com
* **External API:** [APILayer Fixer API](https://apilayer.com/marketplace/fixer-api)

## How to Run Locally?

### 1. Starting the Server (API)

```bash
cd Currency-Converter-API
npm install
```

Create an .env file in the Currency-Converter-API folder and add the port:

```bash
PORT=3000
FIXER_API_KEY=your_apilayer_api_key_here
```

Run the Server:

```bash
    npm start
    # or
    node app.js
```

### Launching the Frontend (UI)

Simply open the index.html file (located in the Currency-Converter-UI folder) in any web browser.

Note: Before running locally, ensure the fetch URL in the frontend code is pointed to http://localhost:3000/convert and the API server is running!