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
            login: function (e) {
                e.preventDefault();
                var component = this;
                this.$http.get('/api/v1/login', {}, {
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(component.email + ':' + component.password)
                    }
                })
                .then(function(response) {
                    if (response.data.token) {
                        window.localStorage.webToken = response.data.token;
                        window.localStorage.webUser = component.email;
                        component.error = false;
                        this.$http.get('/api/v1/articles', {
                            email: window.localStorage.webUser
                        })
                        .then(function(response) {
                            if (response.data && response.data.length > 0) {
                                component.storage.user.articles = response.data;
                                component.$route.router.go('/profile');
                            }
                        },
                        function(error) {
                            console.log(error);
                        });
                    } else {
                        component.error = true;
                    }
                },
                function (error) {
                    console.log('token retrieval failed', error);
                });
            }
        }
    }
</script>
