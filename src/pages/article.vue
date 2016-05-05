<style></style>

<template>
    <div class="article page-wrapper center">
        <p class="success" v-show="saved" transition="fade-in-out">Saved</p>
        <h1 v-if="!editing">{{article.title}}</h1>
        <p v-if="!editing">{{article.body}}</p>
        <input v-if="editing"type="text" value="{{article.title}}" v-model="title">
        <textarea v-if="editing" cols="30" rows="10" v-model="body">{{article.body}}</textarea>
        <p>Created: {{article.created_at}}</p>
        <button v-if="!editing" @click="editing = !editing" class="edit">Edit</button>
        <button v-if="editing" @click="save" class="done">Done</button>
        <button v-if="!editing" @click="delete" class="delete">Delete</button>
    </div>
</template>

<script>
    export default {
        name: 'article',
        props: ['storage'],
        data: function () {
            return {
                editing: false,
                saved: false,
                slug: '',
                title: '',
                body: ''
            };
        },
        computed: {
            article: function () {
                this.slug = this.$route.params.slug;
                var articles = this.storage.user.articles;
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].slug === this.$route.params.slug) {
                        return this.storage.user.articles[i];
                    }
                }
            }
        },
        methods: {
            save: function () {
                this.editing = false;
                var component = this;
                this.$http.put('/api/v1/article', {
                    slug: component.slug,
                    title: component.title,
                    body: component.body
                },
                {
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.webToken
                    }
                })
                .then(function (response) {
                    console.log(response);
                    console.log(component.article);
                    component.saved = true;
                    setTimeout(function() {
                        component.saved = false;
                    }, 2000);
                },
                function (error) {
                    console.log(error);
                });
            },
            delete: function () {
                this.$route.router.go('/articles');
            }
        }
    }
</script>
