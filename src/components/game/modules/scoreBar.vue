<template>
    <div class="time-bar flex flex_between flex_center">
        <p>R:2-mir</p>
        <p class="score">
            <span>14</span>
            :
            <span>12</span>
        </p>
        <p>
            1:26
            <i></i>
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .time-bar {
        color: #CFCFCF;
        p {
            width: 100px;
            text-align: right;
            &:nth-child(1) {
                text-align: left;
            }
        }
        .score {
            text-align: center;
            span {
                font-size: 16px;
                font-weight: bold;
                &:nth-child(1) {
                    color: #0091EC;
                }
                &:nth-child(2) {
                    color: #CDB200;
                }
            }
        }
        i {
            width: 14px;
            height: 15px;
            vertical-align: top;
            display: inline-block;
            background: url('../../../assets/imgs/icon02.png') no-repeat 0 0;
            background-size: 100%;
        }
    }
</style>