<style></style>

<template>
    <div class="article page-wrapper">
        <h1 class="center">{{article.title}}</h1>
        <p>{{article.body}}</p>
        <p>Created: {{article.created_at}}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>
</template>

<script>
    export default {
        name: 'article',
        props: ['storage'],
        computed: {
            article: function () {
                var articles = this.storage.user.articles;
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].slug === this.$route.params.slug) {
                        return this.storage.user.articles[i];
                    }
                }
            }
        }
    }
</script>
