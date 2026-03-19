const validateConversionData = (req, res, next) => {
    const { from, to, amount } = req.body;

    if (!from || !to || amount === undefined) {
        return res.status(400).json({ 
            error: "Validation error: Missing 'from', 'to' or 'amount'!" 
        });    
    }
    
    if (amount <= 0) {
        return res.status(400).json({ 
            error: "Validation Error: The amount must be greater than zero!" 
        });
    }
    next();
};

module.exports = validateConversionData;