var SECRET = require('./config').SECRET;
var jwt = require('jsonwebtoken');

module.exports = {
    validateJWT: function (request, response, next) {
        var authorization = request.headers.authorization;
        var userEmail = request.query.email || request.body.email;
        if (authorization && userEmail) {
            var token = authorization.split(' ')[1];
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err) {
                    response.json({
                        success: false,
                        message: 'Failed to authenticate token',
                        error: err
                    });
                } else {
                    if (userEmail.toString().trim() !== decoded.email.toString().trim()) {
                        response.json({
                            success: false,
                            message: 'You do not have access to this user.'
                        });
                    } else {
                        request.decoded = decoded;
                        next();
                    }
                }
            });
        } else {
            response.json({
                success: false,
                message: 'Failed to authenticate token'
            });
        }
    }
};
