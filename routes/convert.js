const express = require('express');
const router = express.Router(); 

// middleware to validation data
const validateConversionData = require('../middlewares/validateConversion');

router.post('/', validateConversionData, (req, res) => {
    const { from, amount } = req.body;

    const rate = req.validRate;

    const result = (amount * rate).toFixed(2);

    res.json({
        from: from.toUpperCase(),
        to: "PLN",
        amount: amount,
        rate: rate,
        resultInPLN: parseFloat(result)
    });
});

module.exports = router;