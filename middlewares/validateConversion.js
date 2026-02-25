const getRate = async (currencyCode) => {
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`;
    const response = await fetch(url);

    if(!response.ok){
        return null;
    }

    const data = await response.json();
    const dataRates = data.rates[0].mid;
    return dataRates;
}

const validateConversionData = async (req, res, next) => {
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

    try{
        const rateFrom = await getRate(from);
        const rateTo = await getRate(to);

        if (!rateFrom) {
            return res.status(404).json({ error: `Currency not supported: ${from}` });
        }
        if (!rateTo) {
            return res.status(404).json({ error: `Currency not supported: ${to}` });
        }
  
        req.validRates = {
            rateFrom,
            rateTo
        };
        
        next();

    }catch(error){
        next(error);
    }

    }

module.exports = validateConversionData;