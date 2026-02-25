const express = require('express');
const router = express.Router(); 

// middleware to validation data
const validateConversionData = require('../middlewares/validateConversion');

router.post('/', validateConversionData, (req, res) => {
    const { from, to, amount } = req.body;
    const { rateFrom, rateTo } = req.validRates;

    const amountInPLN = amount * rateFrom;
    const finalResult = amountInPLN / rateTo;

    res.json({
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        originalAmount: amount,
        rateUsed: (rateFrom / rateTo).toFixed(4),
        result: parseFloat(finalResult.toFixed(2))
    });
});

module.exports = router;