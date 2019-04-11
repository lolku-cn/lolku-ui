<template>
    <div>
        <navbar>
            <template #slot="back">
                返回
            </template>
            <template>
                kdkkkd速度快我看插槽
            </template>
            <template slot="more">
                手机单击氨基
            </template>
        </navbar>
    </div>
</template>

<script>
    import navbar from '@/components/navBar/index.vue'
    export default {
        components:{
            navbar
        }
    }
</script>

<style lang="less" scoped>

</style>

