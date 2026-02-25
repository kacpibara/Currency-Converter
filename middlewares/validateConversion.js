// harcoded rates
const exchangeRates = {
    USD: 4.02,
    EUR: 4.35,
    GBP: 5.08
};

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

    req.validRate = rate; // attach rate to req object

    next();
};

module.exports = validateConversionData;