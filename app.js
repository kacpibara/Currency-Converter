const express = require('express');
const app = express();
const PORT = 3000;

//json middleware
app.use(express.json());


// hardcoded rates
const exchangeRates = {
    USD: 4.02,
    EUR: 4.35,
    GBP: 5.08
};

app.get('/', (req, res) => {
    res.send('Hello please sent request on /convert url')
})
// endpoint /convert
app.post('/convert', (req, res) => {
    const { from, amount } = req.body;

    //validation from whitespaces
    if (!from || !amount) {
        return res.status(400).json({ error: "Brakuje waluty (from) lub kwoty (amount)!" });
    }

    const rate = exchangeRates[from.toUpperCase()];

    // validation invalid rate
    if (!rate) {
        return res.status(404).json({ error: "Nie obsługujemy tej waluty." });
    }

    const result = (amount * rate).toFixed(2);

    // JSON response
    res.json({
        from: from.toUpperCase(),
        to: "PLN",
        amount: amount,
        rate: rate,
        resultInPLN: parseFloat(result)
    });
});

app.listen(PORT, () => {
    console.log(`Server Working on http://localhost:${PORT}`);
});