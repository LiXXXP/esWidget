<template>
    <div :class="['output-list',{'night-mode':colorData}]">
        <div class="list flex flex_around"
            v-for="item in outputList"
            :key="item.type">
            <div class="left flex flex_only_center">
                <p :style="{'color':barColor.left}">
                    {{thousands(parseInt(item.num1))}}
                </p>
                <progress-data
                    class="bar"
                    :progressColor="barColor.left"
                    :progressData="parseInt(item.num1/(item.num1+item.num2)*100) || 0"
                ></progress-data>
            </div>
            <p class="head">{{item.head}}</p>
            <div class="right flex flex_only_center">
                <progress-data
                    class="bar"
                    :progressColor="barColor.right"
                    :progressData="parseInt(item.num2/(item.num1+item.num2)*100) || 0"
                ></progress-data>
                <p :style="{'color':barColor.right}">
                    {{thousands(parseInt(item.num2))}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    const progressData = ()=> import("@/components/common/progress")   // 进度条

    import {formatNumber} from '@/scripts/utils'

    export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            },
            barColor: {
                type: Object,
                default: null
            },
            outputList: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        computed: {
            thousands(num) {
                return function (num) {
                    return formatNumber(num)
                }
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
                }
            }
        }
    }
    .night-mode {
        .list {
            .head {
                color: #737397;
            }
        }
    }
</style>