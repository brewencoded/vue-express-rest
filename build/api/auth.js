var SECRET = require('./config').SECRET;
var jwt = require('jsonwebtoken');

module.exports = {
    validateJWT: function (request, response, next) {
        var authorization = request.headers.authorization;
        console.log(authorization);
        if (authorization) {
            var token = authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err) {
                    response.json({
                        success: false,
                        message: 'Failed to authenticate token',
                        error: err
                    });
                } else {
                    console.log(request.query.email, decoded.email);
                    if (request.query.email !== decoded.email) {
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
