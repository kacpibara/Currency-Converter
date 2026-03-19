const express = require('express');
const router = express.Router(); 

// middleware to validation data
const validateConversionData = require('../middlewares/validateConversion');

// endpoint to get symbols from Fixer.io
router.get('/symbols', async (req, res, next) => {
    try {
        const apiKey = process.env.FIXER_API_KEY;
        
        const url = `https://api.apilayer.com/fixer/symbols`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': apiKey
            }
        });
        
        const data = await response.json();

        if (data.message || (data.success === false)) {
            return res.status(500).json({ error: "Błąd Fixer.io: " + (data.message || data.error?.info || "Nieznany błąd") });
        }

        // Zwracamy listę walut do frontendu
        res.json(data.symbols);

    } catch (error) {
        next(error);
    }
});

// Przeliczanie za pomocą APILayer
router.post('/', validateConversionData, async (req, res, next) => {
    try {
        const { from, to, amount } = req.body;
        const apiKey = process.env.FIXER_API_KEY;

        const url = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': apiKey
            }
        });

        const data = await response.json();

        if (data.message || data.success === false) {
            return res.status(500).json({ 
                error: "Błąd API: " + (data.message || data.error?.info || "Nieznany błąd") 
            });
        }

        res.json({
            from: data.query.from,
            to: data.query.to,
            originalAmount: data.query.amount,
            rateUsed: data.info.rate.toFixed(4),
            result: parseFloat(data.result.toFixed(2))
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;