const jwt = require('jsonwebtoken');
const config = require("../config");



module.exports = async (req, res, next) => {
    if (!req.headers.Authorization || !req.headers.Authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const jwtToken = req.headers.authorization.split('Bearer ')[1];

    try {
        let decoded = jwt.verify(jwtToken, config.jwt.key);
        if (decoded) {
            next();
        } else {
            res.status(403).json({
                status: false,
                error: true,
                message: 'Invalid Token',
                original: user
            });
        }

    } catch (e) {
        res.status(403).json({
            status: false,
            error: true,
            message: 'Invalid Token',
            original: e
        });
    }
};