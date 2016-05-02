<style lang="scss">
@import "../scss/_logic.scss";
.highlight {
    background-color: grey;
}

.drop-down {
    width: 100%;
    position:relative;
    & .dropdownMain{
      position: relative;
      &:after{
        content: "\25bc";
        position: absolute;
        top: 28%;
        right: 10px;
        background: color(secondary3, base);
        color: color(secondary5, base);
      }
    }
    & input {
        color: color(secondary5, base);
        margin-bottom: 5px;
        &:hover {
            cursor: pointer;
        }
    }
    & ul {
      position:absolute;
        box-sizing: border-box;
        margin-top: 0px;
        background-color: color(secondary3, dark);
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 7px;
        background: color(secondary3, base);
        color: color(secondary3, dark);
        min-width: 100%;
        width: auto;
        z-index: 1000;
        -webkit-box-shadow: 0px 0px 25px -2px rgba(0,0,0,0.31);
        -moz-box-shadow: 0px 0px 25px -2px rgba(0,0,0,0.31);
        box-shadow: 0px 0px 25px -2px rgba(0,0,0,0.31);
        & li {
            margin: 0;
            border-bottom: 1px solid color(secondary3, dark);
            padding: .6em 0;
            margin: 0 5px;
            text-align: center;
            color: color(secondary5, base);
            &:before {
                content: "";
            }
            &:last-child {
              border-bottom: none;
              margin-bottom: 5px;
            }
            &:first-child {
              margin-top: 5px;
            }
            &:hover{
              background: color(secondary3, dark);
              cursor: pointer;
            }
            &.highlight{
              background: color(primary5, base);
              color: color(secondary3, base);
            }
        }
    }
}

.expand-transition {
    transition: all .3s ease;
    height: 250px;
}

.expand-enter,
.expand-leave {
    //opacity: 0.4;
    height: 0;
}

</style>

<template>

<div class="drop-down">
  <div class="dropdownMain" @click="listVisible = !listVisible">
    <input type="text" readonly="true" value="{{currentValue}}" >
  </div>
    <ul class="options" v-show="listVisible" transition="expand">
        <li :class="{highlight: currentValue === option}" v-for="option in options" @click="setOption(option, $index)">
            {{option}}
        </li>
    </ul>
</div>

</template>

<script>

export default {
    name: 'drop-down',
    data: function() {
        return {
            currentIndex: 0,
            currentValue: '-- Select One --',
            listVisible: false
        }
    },
    props: ['options'],
    methods: {
        setOption: function(option, index) {
            this.currentIndex = index;
            this.currentValue = option;
            this.listVisible = false;
            var reference = this;
            var eventData = {
                reference: reference,
                value: reference.currentValue,
                index: reference.currentIndex
            };
            this.$dispatch('option-changed', eventData);
        }
    }
};

</script>
