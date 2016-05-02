<style></style>

<template>
    <div class="article-list page-wrapper">
        <ul class="article-link">
            <li v-for="article in storage.user.articles"><a v-link="{name: 'article', params: {id: article.id, test: 't'}}">{{article.title}}</a></li>
        </ul>
        <form @submit="addArticle">
            <input type="text" placeholder="title" v-model="title">
            <textarea placeholder="Article body" v-model="body"></textarea>
            <input type="submit" value="Add">
        </form>
    </div>
</template>

<script>
    export default {
        props: ['storage'],
        data: function () {
            return {
                title: '',
                body: ''
            };
        },
        methods: {
            addArticle: function (e) {
                e.preventDefault();
                var component = this;
                this.$http.post('/api/v1/articles', {
                    email: window.localStorage.webUser,
                    title: component.title,
                    body: component.body
                },
                {
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.webToken
                    }
                })
                .then(function(response) {
                    if (response.data.id) {
                        component.storage.user.articles.push(
                            {
                                id: response.data.id,
                                title: response.data.title,
                                body: response.data.body,
                                created_at: response.data.created_at
                            }
                        );
                    component.title = '';
                    component.body = '';
                    }
                },
                function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
