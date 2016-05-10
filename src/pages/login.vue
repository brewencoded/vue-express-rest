<style></style>

<template>
    <div class="page-wrapper">
        <h1 class="center">Login</h1>
        <p v-if="error" class="error">
            Invalid email and password combination
        </p>
        <form @submit="login">
            <input type="email" placeholder="email" v-model="email" required>
            <input type="password" placeholder="password" v-model="password" required>
            <input type="submit" value="Login">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        props: ['storage'],
        data: function () {
            return {
                email: '',
                password: '',
                error: false
            };
        },
        methods: {
            // Uses Basic Access Authentication to send credentials
            login: function (e) {
                e.preventDefault();
                var component = this;
                this.$http.get('/api/v1/login', {},
                {
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(component.email + ':' + component.password)
                    }
                })
                .then(function(response) { // Set recieved in localStorage if valid
                    console.log(response);
                    if (response.data.token) {
                        component.storage.userLoggedIn = true;
                        component.$route.router.go('/profile');
                        window.localStorage.webToken = response.data.token;
                        window.localStorage.webUser = component.email;
                        component.error = false;
                        return this.$http.get('/api/v1/articles', {
                            email: window.localStorage.webUser
                        },
                        {
                            headers: {
                                'Authorization': 'Token ' + window.localStorage.webToken
                            }
                        });
                    } else { // show errors if authentication fails
                        component.error = true;
                    }
                })
                .then(function(response) {
                    console.log(response);
                    if (response.data && response.data.length > 0) { // if there are articles, set them in the global storage
                        component.$set('storage.user.articles', response.data);
                    }
                    return this.$http.get('/api/v1/user', { // get information on logged in user
                        email: window.localStorage.webUser
                    },
                    {
                        headers: {
                            'Authorization': 'Token ' + window.localStorage.webToken
                        }
                    });
                })
                .then(function(response) {
                    console.log(response);
                    if (response.data.email) {
                        component.$set('storage.user.info.name', response.data.name);
                        component.$set('storage.user.info.email', response.data.email);
                    }
                })
                .catch(function (error) { // catch errors
                    console.log('token retrieval failed', error);
                });
            }
        }
    }
</script>
