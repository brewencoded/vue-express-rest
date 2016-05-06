<style></style>

<template>
    <div class="header">
        <ul>
            <li v-if="storage.userLoggedIn" v-link-active><a v-link="{name: 'articles'}">Articles</a></li>
            <li v-if="!storage.userLoggedIn" v-link-active><a v-link="{name: 'about'}">About</a></li>
            <li v-link-active>
                <a v-if="!storage.userLoggedIn" v-link="{name: 'login'}">Login</a>
                <a v-if="storage.userLoggedIn" href="#" @click="logOut">Logout</a>
            </li>
            <li v-if="!storage.userLoggedIn" v-link-active><a v-link="{name: 'register'}">Register</a></li>
            <li v-link-active><a v-link="{name: 'index', exact: true}">Home</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['storage'],
        methods: {
            logOut: function (e) {
                e.preventDefault();
                this.storage.userLoggedIn = false;
                this.storage.user.articles = [];
                this.storage.user.info = {};
                delete window.localStorage.webToken;
                delete window.localStorage.webUser;

                this.$route.router.go('/');
            }
        }
    }
</script>
