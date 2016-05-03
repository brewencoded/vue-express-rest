var db = require('../config').db;
var models = require('../models/all');
var Article = models.Article;
var User = models.User;
var SECRET = require('../config').SECRET;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../auth');


module.exports = function (router) {
    router.route('/user')
        .all(function (request, response, next) {
            if (request.method === 'delete' || request.method === 'put') {
                auth.validateJWT(request, response, next);
            }
        })
        .get(function (request, response) {
            var email = request.query.email;
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                response.json(user);
            })
            .catch(function (error) {
                response.json(error);
            });
        })
        .post(function (request, response) {
            var name = request.body.name;
            var email = request.body.email;
            var password = request.body.password;

            db.sync()
            .then(function() {
                return User.create({
                    name: name,
                    email: email,
                    password: password
                });
            })
            .then(function(user) {
                var token = jwt.sign(user.email, SECRET, {
                    expiresInMinutes: 1440 * 7 // expires in a week
                });
                response.json({
                    created: true,
                    token: token
                });
            })
            .catch(function(error) {
                response.json(error);
            });
        })
        .put(function (request, response) {

        })
        .delete(function (request, response) {
            var email = email;
            User.destroy({
                where: {
                    email: email
                }
            })
            .then(function (result) {
                response.json(result);
            })
            .catch(function(error) {
                response.json(error);
            });
        });

    router.route('/users/token')
        .get(function (request, response) {
            response.json({
                token: 'some-token'
            });
        });

    router.route('/articles')
        .all(auth.validateJWT)
        .get(function (request, response) {
            var email = request.query.email;
            Article.findAll({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                response.json(user);
            })
            .catch(function (error) {
                response.json(error);
            });
        });

    router.route('/article')
        .all(function (request, response, next) {
            if (request.method === 'delete' || request.method === 'put') {
                auth.validateJWT(request, response, next);
            }
        })
        .get(function (request, response) {
            //
        })
        .put(function (request, response) {
            //
        })
        .delete(function (request, response) {
            //
        })
        .post(function (request, response) {
            var title = request.body.title;
            var body = request.body.body;
            var email = request.body.email;

            db.sync()
            .then(function () {
                var slug = title.replace(/\s/g, '-');
                return Article.create({
                    slug: slug,
                    title: title,
                    body: body,
                    email: email
                });
            })
            .then(function (article) {
                response.json(article);
            })
            .catch(function (error) {
                response.json(error);
            });
        });

    router.route('/login')
        .post(function (request, response) {
            var email = request.body.email;
            var password = request.body.password;
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                bcrypt.compare(password, user.password, function (error, isMatch) {
                    if (error) {
                        response.json(error);
                    } else {
                        if (isMatch) {
                            var token = jwt.sign(user.email, SECRET, {
                                expiresInMinutes: 1440 * 7 // expires in a week
                            });
                            response.json({
                                validUser: true,
                                token: token
                            });
                        } else {
                            response.json({
                                validUser: false,
                                message: 'The supplied email and password combination does not match.'
                            })
                        }
                    }
                });
            })
            .catch(function (error) {
                response.json(error);
            });
        });

    return router;
};
