<template>
    <div :class="['state-table',{'state-big':isBig}]">
        <div class="item flex flex_start">
            <div class="block flex flex_center"
                v-for="item in stateData"
                :key="item.round_ordinal"
            >
                <img src="../../../../assets/imgs/big/sign01.png" v-if="item.win_type === 'cts_win'">
                <img src="../../../../assets/imgs/big/sign02.png" v-if="item.win_type === 'target_saved'">
                <img src="../../../../assets/imgs/big/sign03.png" v-if="item.win_type === 'bomb_defused'">
            </div>
        </div>
        <div class="item flex flex_start">
            <div class="block flex flex_center"
                v-for="item in stateData"
                :key="item.round_ordinal"
            >
                <img src="../../../../assets/imgs/big/sign05.png" v-if="item.win_type === 'terrorists_win'">
                <img src="../../../../assets/imgs/big/sign04.png" v-if="item.win_type === 'target_bombed'">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isBig: {
                type: Boolean,
                default: false
            },
            stateData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {

            }
        },
        created() {
            
        }
    }
</script>

<style lang="less" scoped>
    .state-table {
        margin-top: 15px;
        .item {
            width: 170px;
            padding: 5px 0;
            padding-left: 2px;
            border-bottom: 1px solid #878787;
            .block {
                width: 9px;
                height: 9px;
                margin-left: 2px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
    .state-big {
        margin: auto 0;
        .item { 
            border: 0;
            padding: 0;
            width: 314px;
            padding-left: 10px;
            box-sizing: border-box;
            &:nth-child(1) {
                padding-bottom: 5px;
            }
            .block {
                width: 16px;
                height: 16px;
                margin-left: 4px;
                &:nth-child(1) {
                    margin-left: 0;
                }
            }
        }
    }
</style>