<style></style>

<template>
    <div class="article page-wrapper center">
        <p class="success" v-show="saved" transition="fade-in-out">Saved</p>
        <h1 v-if="!editing">{{article.title}}</h1>
        <p v-if="!editing">{{article.body}}</p>
        <input v-if="editing" type="text" v-model="title">
        <textarea v-if="editing" cols="30" rows="10" v-model="body">{{article.body}}</textarea>
        <p>Created: {{dateCreated}}</p>
        <button v-if="!editing" @click="editing = !editing" class="edit">Edit</button>
        <button v-if="editing" @click="save" class="done">Done</button>
        <button v-if="!editing" @click="remove" class="delete">Delete</button>
    </div>
</template>

<script>
    export default {
        name: 'article',
        props: ['storage'],
        data: function () {
            return {
                editing: false,
                title: '',
                body: '',
                saved: false
            };
        },
        computed: {
            article: function () {
                var articles = this.storage.user.articles;
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].slug === this.$route.params.slug) {
                        this.title = this.storage.user.articles[i].title;
                        return this.storage.user.articles[i];
                    }
                }
                return {};
            },
            dateCreated: function () {
                if (!this.article) {
                    return '';
                }
                console.log(this.article.createdAt);
                return new Date(this.article.createdAt).toUTCString();
            }
        },
        methods: {
            save: function () {
                this.editing = false;
                var component = this;
                this.$http.put('/api/v1/article',
                {
                    email: component.storage.user.info.email || window.localStorage.webUser,
                    slug: component.$route.params.slug,
                    title: component.title,
                    body: component.body
                },
                {
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.webToken
                    },
                    emulateJSON: true
                })
                .then(function (response) {
                    console.log(response);
                    component.saved = true;
                    setTimeout(function() {
                        component.article.title = response.data.updates.title;
                        component.article.body = response.data.updates.body;
                        component.article.slug = response.data.updates.slug;

                        component.$route.router.go('/article/' + response.data.updates.slug);
                        component.saved = false;
                    }, 2000);
                },
                function (error) {
                    console.log(error);
                });
            },
            remove: function () {
                var component = this;
                this.$http.delete('/api/v1/article',
                {
                    email: component.storage.user.info.email || window.localStorage.webUser,
                    slug: component.$route.params.slug
                },
                {
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.webToken
                    },
                    emulateJSON: true
                })
                .then(function (response) {
                    console.log(response);
                    this.storage.user.articles.splice(this.storage.user.articles.indexOf(this.article), 1);
                },
                function (error) {
                    console.log(error);
                });
                this.$route.router.go('/articles');
            }
        }
    }
</script>
