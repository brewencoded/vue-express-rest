// modules
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

// Vue's
import Root from './root';
import Index from './pages/index';
import About from './pages/about';
import Articles from './pages/articles';
import Article from './pages/article';
import Styleguide from './pages/style-guide';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/not-found';

Vue.config.debug = true;

// App code
Vue.use(Resource);
Vue.use(Router);

let router = new Router({
    hashbang: false,
    history: true,
    linkActiveClass: 'active'
});

router.mode = 'html5';

router.map({
        '/': {
            name: 'index',
            component: Index
        },
        '/about': {
            name: 'about',
            component: About
        },
        '/articles': {
            name: 'articles',
            component: Articles,
            auth: true
        },
        '/article/:slug': {
            name: 'article',
            component: Article,
            auth: true
        },
        '/login': {
                name: 'login',
                component: Login
        },
        '/register': {
            name: 'register',
            component: Register
        },
        '/404': {
            name: 'not-found',
            component: NotFound
        },
        '/profile': {
            name: 'profile',
            component: Profile,
            auth: true
        },
        '/style-guide': {
            name: 'style-guide',
            component: Styleguide
        }
    });
router.redirect({
    '*': '/404'
});

router.beforeEach(function (transition) {
    if (transition.to.auth || transition.to.path === '/') {
        // check if has token
        if (window.localStorage.webToken && window.localStorage.webUser) {
            // make sure token is still valid
            Vue.http.get('/api/v1/token', {
                email: window.localStorage.webUser
            },
            {
                headers: {
                    'Authorization': 'Token ' + window.localStorage.webToken
                }
            })
            .then(function (response) {
                if (response.data.token) {
                    if (!router.app.storage.userLoggedIn) {
                        router.app.storage.userLoggedIn = true;
                    }

                    if (transition.to.path === '/') {
                        transition.redirect('/profile');
                    } else {
                        transition.next();
                    }
                } else {
                    delete window.localStorage.webToken;
                    delete window.localStorage.webUser;
                    if (router.app.storage.userLoggedIn) {
                        router.app.storage.userLoggedIn = false;
                    }

                    transition.redirect('/login');
                }
            },
            function (error) {
                console.log(error);
                console.log('logged out')
            });
        } else {
            transition.next();
        }
    } else {
        transition.next()
    }
});

router.start(Root, '#app');
