<template>
	<div :class="['rate-list flex flex_wrap flex_between',
                {'night-mode':colorData}]"
    >
        <div class="item"
            v-for="item in rateData"
            :key="item.title">
            <p class="title">
                {{item.title}}
            </p>
            <div class="flex flex_between">
                <div class="twig"
                    v-for="key in item.list"
                    :key="key.num">
                    <p :class="parseInt(key.num)>50?'high':'low'">
                        {{key.num}}%
                    </p>
                    <progress-data 
                        :progressData="parseInt(key.num)"
                        :progressColor="parseInt(key.num)>50?barColor.right:colorData?nightColor:barColor.left"
                    ></progress-data>
                </div>
            </div>
        </div>
        
	</div>
</template>

<script>
    import progressData from '@/components/common/progress'
	export default {
        props: {
            barColor: {
                type: Object,
                default: null
            },
            colorData: {
                type: Number,
                default: 0,
            }
        },
		data() {
			return {
                nightColor: '#737397',     // 深色模式进度条小于50%颜色
				rateData: [
                    {
                        title: '交手胜率',
                        list: [
                            {
                                num: '68.9'
                            },
                            {
                                num: '39.8'
                            }
                        ]
                    },
                    {
                        title: '首塔率',
                        list: [
                            {
                                num: '38.9'
                            },
                            {
                                num: '59.8'
                            }
                        ]
                    },
                    {
                        title: '一血率',
                        list: [
                            {
                                num: '38.9'
                            },
                            {
                                num: '59.8'
                            }
                        ]
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
    @high: #3BB42A;
    @low: #A5A5A5;
    @night: #737397;
    .rate-list {
        margin-top: 15px;
        .item {
            width: 306px;
            margin-bottom: 15px;
            .title {
                color: #878787;
                text-align: center;
            }
            .twig {
                width: 150px;
                margin-top: -15px;
                p {
                    margin-bottom: 5px;
                }
                .high {
                    color: @high;
                }
                .low {
                    color: @low;
                }
                &:nth-child(2n) {
                    p {
                        text-align: right;
                    }
                }
            }
        }
    }
    .night-mode {
        .item {
            .title {
                color: #CFCFCF;
            }
            .twig {
                .low {
                    color: @night;
                }
            }
        }
    }
</style>