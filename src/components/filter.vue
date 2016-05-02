<style lang="scss">
@import "../scss/_logic.scss";
    a.filter {
        padding: .5em;
          &:hover{
            cursor:pointer;
          }
    }
</style>
<template>
    <a class="filter" @click="filterBy('email')">
        <svg height="10" width="10">
          <polygon v-if="direction === 'up'" points="5,0 10,10 0,10" style="fill:white;" />
          <polygon v-if="direction === 'down'" points="0,0 10,0 5,10" style="fill:white;" />
        </svg>
    </a>
</template>

<script>
    export default {
        name: 'filter',
        props: ['sort', 'filterName'],
        data: function () {
            return {
                direction: 'down'
            };
        },
        methods: {
            filterBy: function (by) {
                if (this.direction === 'up') {
                    this.direction = 'down';
                    this.sort.sortBy = this.filterName;
                } else {
                    this.direction = 'up';
                }

                if (this.sort.sortOrder === '-1') {
                    this.sort.sortOrder = '1';
                } else {
                    this.sort.sortOrder = '-1';
                }
            }
        }
    }
</script>
