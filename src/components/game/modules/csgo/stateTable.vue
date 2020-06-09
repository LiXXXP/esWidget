<template>
    <div class="state-table">
        <div class="item flex flex_start">
            <div class="block"
                v-for="item in list"
                :key="item.id"></div>
        </div>
        <div class="item flex flex_start">
            <div class="block"
                v-for="item in list"
                :key="item.id"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        id: 0
                    },
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    },
                    {
                        id: 4
                    },
                    {
                        id: 5
                    },
                    {
                        id: 6
                    },
                    {
                        id: 7
                    },
                    {
                        id: 8
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
            border-right: 1px solid #878787;
            border-bottom: 1px solid #878787;
            .block {
                width: 9px;
                height: 9px;
                margin-right: 2px;
                background-color: #000;
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
</style>