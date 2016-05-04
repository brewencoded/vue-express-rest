var db = require('../config').db;
var models = require('../models/all');
var Article = models.Article;
var User = models.User;
var SECRET = require('../config').SECRET;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../auth');
var basicAuth = require('basic-auth');


module.exports = function (router) {
    router.route('/user')
        .all(function (request, response, next) {
            if (request.method === 'DELETE' || request.method === 'PUT' || request.method === 'GET') {
                auth.validateJWT(request, response, next);
            } else {
                next();
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
            console.log(request.body.headers);
            console.log(request.body.name);
            var user = basicAuth(request);
            console.log(user);
            if (request.body.name && user && user.pass && user.name) {
                var name = request.body.name;
                var email = user.name;
                var password = user.pass;
                db.sync()
                .then(function() {
                    return User.create({
                        name: name,
                        email: email,
                        password: password
                    });
                })
                .then(function(user) {
                    jwt.sign({
                        email: user.email
                    },
                    SECRET,
                    {
                        expiresIn: '7d' // expires in a week
                    },
                    function (err, token) {
                        if (err) {
                            response.json({
                                error: err
                            });
                        } else {
                            response.json({
                                created: true,
                                token: token
                            });
                        }
                    });
                })
                .catch(function(error) {
                    response.json(error);
                });
            } else {
                response.json({
                    success: false,
                    message: 'All fields are required'
                });
            }
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

    router.route('/articles')
        .all(auth.validateJWT)
        .get(function (request, response) {
            var email = request.query.email;
            Article.findAll({
                where: {
                    email: email
                }
            })
            .then(function (articles) {
                response.json(articles);
            })
            .catch(function (error) {
                response.json(error);
            });
        });

    router.route('/article')
        .all(function (request, response, next) {
            console.log(request.body);
            if (request.method === 'DELETE' || request.method === 'PUT') {
                auth.validateJWT(request, response, next);
            } else {
                next();
            }
        })
        .get(function (request, response) {
            //
        })
        .put(function (request, response) {
            //
        })
        .delete(function (request, response) {
            var title = request.body.title;
            if (title) {
                db.sync()
                .then(function () {
                    Article.destroy({
                        where: {
                            title: title
                        }
                    })
                })
                .then(function (article) {
                    response.json(article);
                })
                .catch(function (error) {
                    response.json(error);
                });
            } else {
                response.json({
                    success: false,
                    message: 'All fields are required'
                });
            }
        })
        .post(function (request, response) {
            var title = request.body.title;
            var body = request.body.body;
            var email = request.body.email;

            if (title && email && body) {
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
            } else {
                response.json({
                    success: false,
                    message: 'All fields are required'
                });
            }
        });

    router.route('/login')
        .get(function (request, response) {
            var user = basicAuth(request);
            if (request.body.name && user && user.pass && user.name) {
                var email = user.name;
                var password = user.pass;
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
                                jwt.sign({
                                    email: user.email
                                },
                                SECRET,
                                {
                                    expiresIn: '7d' // expires in a week
                                },
                                function (err, token) {
                                    if (err) {
                                        response.json({
                                            error: err
                                        });
                                    } else {
                                        response.json({
                                            created: true,
                                            token: token
                                        });
                                    }
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
            } else {
                response.json({
                    success: false,
                    message: 'All fields are required'
                });
            }
        });

    router.route('/token')
        .all(auth.validateJWT)
        .get(function (request, response) {
            response.json({
                token: request.headers.authorization.split(' ')[1]
            });
        });

    return router;
};
