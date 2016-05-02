// var auth = require('./auth');
// var db = require('../config');
module.exports = {
    addTo: function (router) {
        router.route('/user')
            .get(function (request, response) {
                response.json({
                    name: 'test testerson',
                    email: 'test5@test.com',
                    created_at: '01-04-2016'
                })
            })
            .post(function (request, response) {

            })
            .put(function (request, response) {

            })
            .delete(function (request, response) {

            });

        router.route('/users/token')
            .get(function (request, response) {
                response.json({
                    token: 'some-token'
                });
            });

        router.route('/articles')
            .get(function (request, response) {
                response.json([
                    {
                        id: 1,
                        title: 'article 1',
                        body: 'This is an article',
                        created_at: 'date'
                    },
                    {
                        id: 2,
                        title: 'article 2',
                        body: 'This is an article2',
                        created_at: 'date2'
                    },
                    {
                        id: 3,
                        title: 'article 3',
                        body: 'This is an article3',
                        created_at: 'date3'
                    }
                ]);
            })
            .post(function (request, response) {
                //
            });

        router.route('/article')
            .get(function (request, response) {
                //
            })
            .put(function (request, response) {
                //
            })
            .delete(function (request, response) {
                //
            });
    }
}
