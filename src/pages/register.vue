<style></style>

<template>
    <div class="page-wrapper">
        <h1 class="center">Register</h1>
        <p v-if="error" class="error">
            Registration failed
        </p>
        <form @submit="register">
            <input type="text" placeholder="name" v-model="name" required>
            <input type="email" placeholder="email" v-model="email" required>
            <input type="password" placeholder="password" v-model="password" required>
            <input type="submit" value="Register">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data: function () {
            return {
                name: '',
                email: '',
                password: '',
                error: false
            };
        },
        methods: {
            register: function (e) {
                e.preventDefault();
                var component = this;
                this.$http.post('/api/v1/user', {
                    name: component.name
                },
                {
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(component.email + ':' + component.password)
                    }
                })
                .then(function (response) {
                    if (response.data.created) {
                        if (response.data.name) {
                            window.localStorage.webToken = response.data.token;
                            window.localStorage.webUser = component.email;
                            component.error = false;
                            component.$route.router.go('/profile');
                        } else {
                            component.error = true;
                        }
                    } else {
                        console.log('the api may have changed');
                    }
                },
                function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
