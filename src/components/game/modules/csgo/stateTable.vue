<template>
    <div :class="['state-table',isBig?'state-big':'']">
        <div class="item flex flex_start">
            <div class="block flex flex_center"
                v-for="item in list"
                :key="item.id"
            >
                <img :src="item.url" v-if="item.url">
            </div>
        </div>
        <div class="item flex flex_start">
            <div class="block flex flex_center"
                v-for="item in list"
                :key="item.id"
            >
                <img :src="item.url" v-if="item.url">
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
            }
        },
        data() {
            return {
                list: [
                    {
                        id: 0,
                        url: require('../../../../assets/imgs/sign01.png')
                    },
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3,
                        url: require('../../../../assets/imgs/sign02.png')
                    },
                    {
                        id: 4
                    },
                    {
                        id: 5
                    },
                    {
                        id: 6,
                        url: require('../../../../assets/imgs/sign03.png')
                    },
                    {
                        id: 7
                    },
                    {
                        id: 8,
                        url: require('../../../../assets/imgs/sign05.png')
                    },
                    {
                        id: 9
                    },
                    {
                        id: 10
                    },
                    {
                        id: 11
                    },
                    {
                        id: 12
                    },
                    {
                        id: 13
                    },
                    {
                        id: 14
                    },
                ]
            }
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
            }
        }
    }
</style>