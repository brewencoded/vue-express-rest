<style></style>

<template>
    <div class="article-list page-wrapper">
        <ul class="article-link">
            <li v-for="article in storage.user.articles"><a v-link="{name: 'article', params: {slug: article.slug}}">{{article.title}}</a></li>
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
                console.log('creating');
                var component = this;
                this.$http.post('/api/v1/article', {
                    email: component.storage.user.info.email || window.localStorage.webUser,
                    title: component.title,
                    body: component.body
                },
                {
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(component.email + ':' + component.password)
                    },
                    emulateJSON: true
                })
                .then(function(response) {
                    console.log(response);
                    if (response.data.email) {
                        component.storage.user.articles.push(
                            {
                                slug: response.data.slug,
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
