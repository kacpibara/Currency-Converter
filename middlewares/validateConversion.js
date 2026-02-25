const validateConversionData = async (req, res, next) => {
    const { from, amount } = req.body;

    if (!from || amount === undefined) {
        return res.status(400).json({ error: "Validation error: Currency (from) or amount is missing!" });
    }

    if (amount <= 0) {
        return res.status(400).json({ error: "Validation Error: The amount must be greater than zero!" });
    }

    try{
        const currencyCode = from.toLowerCase();
        const nbpUrl = `http://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`;

        const response = await fetch(nbpUrl);

        if (!response.ok) {
            next(error);
        }
        const data = await response.json();

        const currentRate = data.rates[0].mid;

        req.validRate = currentRate;
        next();

    }catch(error){
        next(error);
    }

    }

module.exports = validateConversionData;