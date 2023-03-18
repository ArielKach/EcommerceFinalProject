module.exports = (req, res, next) => {
    try {
        // Add token handling here
        req.payload = [];
        next();
    } catch (err) {
        // Add token handling here
        res.status(400).send(err);
    }
};
