<style></style>

<template>
    <div class="page-wrapper center">
        <h1>This is a protected page</h1>
        <h3>You can only view this page if you are logged in.</h3>
        <p>
            This page belongs to {{user.name}}
        </p>
    </div>
</template>

<script>
    export default {
        props: ['storage'],
        computed: {
            user: function () {
                if (this.storage.user.info.name) {
                    return this.storage.user.info;
                }
                return {};
            }
        }
    }
</script>
