const express = require('express');
const app = express();
const PORT = 3000;

//json middleware
app.use(express.json());

// myLogger
const myRequestLogger = function(req, res, next) {
    console.log(`Logged ${req.method} ${req.url}`);
    next();
}

app.use(myRequestLogger);

// hardcoded rates
const exchangeRates = {
    USD: 4.02,
    EUR: 4.35,
    GBP: 5.08
};

// validate middleware
const validateConversionData = (req, res, next) => {
    const { from, amount } = req.body;

    if (!from || amount === undefined) {
        return res.status(400).json({ error: "Validation error: Currency (from) or amount is missing!" });
    }

    if (amount <= 0) {
        return res.status(400).json({ error: "Validation Error: The amount must be greater than zero!" });
    }

    const rate = exchangeRates[from.toUpperCase()];

    if (!rate) {
        return res.status(404).json({ error: "We do not support this currency." });
    }

    next();
};


app.get('/', (req, res) => {
    res.send('Hello please sent request on /convert url')
})

// endpoint /convert
app.post('/convert', validateConversionData, (req, res) => {
    const { from, amount } = req.body;
    const rate = exchangeRates[from.toUpperCase()];
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

// errors logger
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('stupid Flanders!');
});

app.listen(PORT, () => {
    console.log(`Server Working on http://localhost:${PORT}`);
});