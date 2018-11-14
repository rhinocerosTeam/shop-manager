<template lang="html">
    <div>
        <div class="tabs-wrap">
            <span :class="[active == index ? activeClass : '', dClass]" v-for="(item, index) in source" @click="switchTab(index)">{{item.title}}</span>
        </div>
        <div>
            <component :is="componentId"></component>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            source: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                active: 0,
                dClass: 'nav_a_btn',
                activeClass: 'nav_on',
                componentId: ''
            }
        },
        methods: {
            switchTab (index) {
                if (this.active != index) {
                    this.active = index;
                }
                if(this.source[index].content){
                    this.componentId = this.source[index].content;
                }
                this.$emit('selectIndex', index);
            }
        },
        mounted () {
            this.componentId = this.source[0].content;
        }
    }
</script>
