<template>
    <div class="output-list">
        <div class="list flex flex_around"
            v-for="item in outputList"
            :key="item.head">
            <div class="left flex flex_only_center">
                <p>{{item.num1}}</p>
                <progress-data
                    class="bar"
                    :colorData="'#1167E8'"
                    :progressData="parseInt(item.num1/(item.num1+item.num2)*100)"
                ></progress-data>
            </div>
            <p class="head">{{item.head}}</p>
            <div class="right flex flex_only_center">
                <progress-data
                    class="bar"
                    :colorData="'#D43F2F'"
                    :progressData="parseInt(item.num2/(item.num1+item.num2)*100)"
                ></progress-data>
                <p>{{item.num2}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import progressData from '@/components/common/progress'
    export default {
        data() {
            return {
                outputList: [
                    {
                        head: '经济',
                        num1: 32,
                        num2: 28
                    },
                    {
                        head: '推塔',
                        num1: 8,
                        num2: 5
                    },
                    {
                        head: '水晶',
                        num1: 32,
                        num2: 28
                    },
                    {
                        head: '小龙',
                        num1: 8,
                        num2: 5
                    },
                    {
                        head: '男爵',
                        num1: 8,
                        num2: 5
                    }
                ]
            }
        },
        components: {
            progressData
        }
    }
</script>

<style lang="less" scoped>
    .output-list {
        .list {
            margin-bottom: 8px;
            .left {
                .bar {
                    width: 100px;
                    margin-left: 2px;
                    transform:rotate(180deg);
                }
                p {
                    width: 15px;
                    color: #1167E8;
                    text-align: right;
                }
            }
            .head {
                color: #101010;
            }
            .right {
                .bar {
                    width: 100px;
                    margin-right: 2px;
                }
                p {
                    width: 15px;
                    color: #D43F2F;
                }
            }
        }
    }
</style>