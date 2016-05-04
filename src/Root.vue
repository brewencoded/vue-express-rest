<style>

html,
body {
    margin: 0;
    padding: 0;
    color: #444;
    font-family: arial, helvetica;
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover,
a:visited {
    color: inherit;
}

.header {
    background-color: #666;
    overflow: hidden;
}

ul {
    list-style-type: none;
    margin: 0;
}

.header li {
    color: white;
    border-left: .1em solid #888;
    float: right;
    margin-top: .25em;
    margin-bottom: .25em;
}

.header li a {
    height: 100%;
    padding: .75em;
    display: block;
}

.v-link-active {
    background-color: #444;
}

.page-wrapper {
    width: 50%;
    margin: 0 25%;
}

input {
    display: block;
}

*[type="text"],
*[type="email"],
*[type="password"],
textarea {
    width: 100%;
    line-height: 2.5em;
    border: .2em solid #bbb;
    border-radius: .25em;
    margin: .5em;
    padding-left: 1em;
}

*[type="submit"] {
    border: none;
    border-radius: .25em;
    padding: .75em 2em;
    margin: .5em;
    font-weight: bold;
}

.center {
    text-align: center;
}

.article-link {
    margin: 1em;
}

.article-link a {
    background-color: #eee;
    border-radius: 1em;
    padding: 2em 4em;
    margin: 1em;
    text-align: center;
    font-weight: bold;
    display: block;
}

.article-link a:hover {
    background-color: #888;
    color: white;
}

.error {
    background-color: red;
    color: white;
    padding: .5em 1em;
}

</style>

<template>

<navigation :storage.sync="storage"></navigation>
<router-view :storage.sync="storage"></router-view>

</template>

<script>

var Navigation = require('./components/navigation');
// var router = require('./main').router;

export default {
    created: function() {
        var component = this;
        // make sure token is still valid and if it is, get user data
        this.$http.get('/api/v1/token', {}, {
                headers: {
                    'Authorization': 'Token ' + window.localStorage.webToken
                }
            })
            .then(function(response) {
                    if (response.data.token) {
                        component.storage.userLoggedIn = true;
                        this.$http.get('/api/v1/articles', {
                                email: window.localStorage.webUser
                            })
                            .then(function(response) {
                                    if (response.data && response.data.length > 0) {
                                        component.$set('storage.user.articles', response.data);
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                });
                    }
                },
                function(error) {
                    console.log(error);
                    console.log('logged out')
                });
    },
    data: function() {
        return {
            storage: {
                user: {
                    info: {
                        name: 'test testerson'
                    },
                    articles: []
                },
                userLoggedIn: false
            }
        };
    },
    components: {
        navigation: Navigation
    }
}

</script>
