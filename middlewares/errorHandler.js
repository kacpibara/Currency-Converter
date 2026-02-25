const errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('stupid Flanders!');
};

module.exports = errorHandler;