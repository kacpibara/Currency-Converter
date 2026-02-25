# 💱 Fullstack Express Currency Converter API & UI

This project is a fully functional Fullstack application (Backend + Frontend), built to consolidate knowledge of the **Node.js** environment and the **Express.js** framework.

The application utilizes the external, public API of the National Bank of Poland (NBP) to retrieve dynamic exchange rates and calculate cross-currency rates.

## Live Demo

The application is deployed and ready for testing:

* **Frontend (UI):** [View Live Application](https://kacpibara.github.io/Currency-Converter/)
* **Backend (API):** Hosted on Render.com

> **⚠️ Important Note (Cold Start):**
> The API server is hosted on a free plan. If the application has not been used for the last 15 minutes, the server goes into a "spin down" state to save resources. **The first request may take about 30-50 seconds** to wake up the server. Subsequent conversions will be near-instant!

## Architecture (Monorepo)

The project is structured as a Monorepo, divided into two independent parts (Separation of Concerns):

* **`Currency-Converter-API/`** - Backend Server (Node.js / Express.js)
* **`Currency-Converter-UI/`** - User Interface (Vanilla JS / HTML / CSS)

Using the `cors` library, the frontend communicates with the API via asynchronous `fetch()` requests. Continuous Deployment (CD) for the frontend is handled by **GitHub Actions**.

## Development Path (Project History)

The project was developed iteratively. You can track its evolution through the following Tags (Releases):

1.  **`v1.0.0`** - Basic Express server with hardcoded exchange rates.
2.  **`v1.1.0`** - Introduction of Middleware (global Logger and local Validator).
3.  **`v1.2.0`** - Refactoring, routing separation (`express.Router()`), CORS addition, and environment variables (`.env`).
4.  **`v1.3.0`** - Asynchronous real-time data fetching from the NBP API.
5.  **`v1.4.0`** - Implementation of cross-currency conversion logic.
6.  **`v1.5.0`** - Introduction of Monorepo architecture and dedicated UI.
7.  **`v1.6.0-deployed`** - API deployment on Render and UI on GitHub Pages via GitHub Actions.

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js, CORS, dotenv
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (async/await, Fetch API)
* **DevOps / Hosting:** GitHub Pages, GitHub Actions, Render.com
* **External API:** [NBP API](http://api.nbp.pl/)

## ⚙️ How to Run Locally?

### 1. Starting the Server (API)

```bash
cd Currency-Converter-API
npm install
```

Create an .env file in the Currency-Converter-API folder and add the port:

```bash
PORT=3000
```

Run the Server:

```bash
    node app.js
```

### Launching the Frontend (UI)

Simply open the index.html file (located in the Currency-Converter-UI folder) in any web browser.

Note: Before running locally, ensure the fetch URL in the frontend code is pointed to http://localhost:3000/convert and the API server is running!