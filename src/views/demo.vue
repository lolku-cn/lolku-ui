<template>
    <div>
        <div class="box">djjjjjjjjjjjjjjjjjjjjjjjjjjjjj</div>
        <div class="box-w">
            <div class="box-list"></div>
            <div class="box-list" style="background:#eaeaea"></div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        alert(document.body.offsetWidth);
    }
}
</script>

<style lang="less" scoped>
    .box {
// 10rem
        width: 10rem;
        height: 40px;
        background-color: aqua;
    }
    .box-w {
        display: flex;
        flex-wrap: wrap;
        .box-list {
            // width: ;
            height: 3rem;
            // width: 50%;
            width: 4rem;
            margin: 0 .5rem;
            background-color: teal;
        }
    }
</style>

