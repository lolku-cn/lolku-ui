<template>
    <div class="nav-bar">
        <div class="back lolku-dont-wrap" @click="back()">
            <slot name="back">
                <icon type="back"></icon>
            </slot>
        </div>
        <div class="main" @click="$emit('on-main')">
            <slot></slot>
        </div>
        <div class="more lolku-dont-wrap" @click="$emit('on-more')">
            <slot name="more" class="lol"></slot>
        </div>
    </div>
</template>

<script>
    import icon from '../icon/icon'
    import Index from '@/utils/index'
    export default {
        components:{
            icon
        },
        data(){
            return {
                utils:''
            }
        },
        created(){
            this.utils = new Index();
        },
        methods: {
            back() {
                // console.log()
                if(!this.$slots.back) {
                    this.utils.back(this);
                    return;
                }
                this.$emit('on-back');
            }
        }
    }
</script>

<style lang="less" scoped>
    .nav-bar {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        padding: 6px;
        .more {
            text-align: right;
        }
        .back,.more {
            flex:1;
            width: fit-content;
        }
        .main {
            flex: 2;
            overflow: hidden;
            text-align: center;
            margin: 0 8px;
            // width: min-content;
            // flex-grow: 1;
        }
    }
</style>

