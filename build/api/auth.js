var SECRET = require('./config');
var jwt = require('jsonwebtoken');

module.exports = {
    validateJWT: function (request, response, next) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.authorization;
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                response.json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                request.decoded = decoded;
                next();
            }
        });
    }
};
