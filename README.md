# Fullstack Express Currency Converter API & UI

This project is a fully functional Fullstack application (Backend + Frontend), built for learning and consolidating knowledge of the **Node.js** environment and the **Express.js** framework.

The application uses the external, public API of the National Bank of Poland (NBP) to retrieve dynamic exchange rates and calculate cross rates.

## Architecture (Monorepo)

The project has been divided into two independent parts (Separation of Concerns):

* **`Currency-Converter-API/`** - Backend Server (Node.js / Express.js)
* **`Currency-Converter-UI/`** - User Interface (Vanilla JS / HTML / CSS)

Thanks to the use of the `cors` library, the frontend communicates with its own API using asynchronous `fetch()` queries.

## Development path (Project history)

The project was developed iteratively. You can track the development of the code by checking the relevant Tags (Releases) in the repository:

1.  **`v1.0.0`** - Basic Express server with hardcoded exchange rates.
2.  **`v1.1.0`** - Introduction of Middleware (global Logger and local Query Validator).
3.  **`v1.2.0`** - Refactoring, separation of routing (`express.Router()`), addition of CORS and environment variables (`.env`).
5.  **`v1.3.0`** - Asynchronous retrieval of real exchange rates from the NBP API. Implementation of cross-currency conversion logic.
6.  **`v1.4.0`** - Introduction of Monorepo architecture and addition of a dedicated UI interface.

## Technologies used

* **Backend:** Node.js, Express.js, CORS, dotenv
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (async/await, Fetch API)
* **External API:** [NBP API](http://api.nbp.pl/)

## How to run the project locally?

### 1. Starting the Server (API)

```bash
    cd Currency-Converter-API
    npm install
```

Next, create an .env file in the Currency-Converter-API folder and add the port:

```
    PORT=3000
```

Run Server

```
    node app.js
```

### 2. Launching the Frontend (UI)

Since the interface is built in pure HTML/JS, simply open the index.html file (located in the Currency-Converter-UI folder) in any web browser. 
Make sure the API server is running in the background!
