
module.exports = async function handler(req, res) {
    const apiKey = process.env.CURRENCYFREAKS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: "Currency API key is not configured"
        });
    }

    try {
        const response = await fetch(
            `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch currency rates"
            });
        }

        const data = await response.json();

        const allowedCurrencies = ["EUR", "USD", "GBP", "EGP"];
        const filteredRates = {};

        allowedCurrencies.forEach((currency) => {
            if (data.rates && data.rates[currency]) {
                filteredRates[currency] = data.rates[currency];
            }
        });

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

        return res.status(200).json({
            base: data.base,
            rates: filteredRates
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};