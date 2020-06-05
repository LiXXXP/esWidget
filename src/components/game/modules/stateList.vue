<template>
	<div :class="['state-list',{'night-mode':colorData}]">
		<div class="state flex flex_between">
			<p :class="[{active:currentIndex===index},
                item.sign?'win':'lose']"
                v-for="(item,index) in stateData"
                :key="index"
                @click="getState(index)"
            >
                {{item.text}}
            </p>
		</div>
        <div class="date"
            v-for="(item,index) in stateData"
            :key="index">
			<p  v-if="index === currentIndex"
                :style="{'margin-left': `${leftFar}px`}">
                {{item.date}}
            </p>
		</div>
	</div>
</template>

<script>
	export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            }
        },
		data() {
			return {
                currentIndex: 0,  //当前索引
                leftFar: 0,       // 日期显示距离
				stateData: [
                    {
                        text: '胜',
                        sign: true,
                        date: '5月19日'
                    },
                    {
                        text: '负',
                        sign: false,
                        date: '5月20日'
                    },
                    {
                        text: '胜',
                        sign: true,
                        date: '5月22日'
                    },
                    {
                        text: '负',
                        sign: false,
                        date: '5月23日'
                    },
                    {
                        text: '负',
                        sign: false,
                        date: '5月30日'
                    }
                ]
			}
        },
        methods: {
            getState(index) {
                this.currentIndex = index
                this.leftFar = index * 20
            }
        }
	}
</script>

<style lang="less" scoped>
    @win: #3BB42A;
    @lose: #E10000;
    .state-list {
        width: 124px;
        .state {
            padding-bottom: 7px;
            border-bottom: 1px solid #CFCFCF;
            p {
                color: #fff;
                width: 20px;
                height: 20px;
                cursor: pointer;
                line-height: 20px;
                text-align: center;
                border-radius: 100%;
                background-color: @win;
                position: relative;
                &.active::before {
                    width: 0px;
                    height: 0px;
                    padding: 0;
                    content: '';
                    z-index: 12;
                    display: block;
                    box-sizing: content-box;
                    border-bottom: 4px solid #FFFFFF;
                    border-top: 4px solid transparent;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    position: absolute;
                    top: 20px;
                    left: 5px;
                }
                &.active::after {
                    width: 0px;
                    height: 0px;
                    padding: 0;
                    z-index: 10;
                    content: '';
                    display: block;
                    box-sizing: content-box;
                    border-bottom: 5px solid #CFCFCF;
                    border-top: 5px solid transparent;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    position: absolute;
                    top: 18px;
                    left: 4px;
                    
                }
            }
            .win {
                background-color: @win;
            }
            .lose {
                background-color: @lose;
            }
        }
        .date {
            margin-top: 3px;
            p {
                color: #CFCFCF;
                font-size: 10px;
                white-space:nowrap;
            }
        }
    }
    .night-mode {
        .state {
            border-bottom: 1px solid #5C5C79;
            p {
                &.active::before {
                    border-bottom: 4px solid #1E1E27;
                }
                &.active::after {
                    border-bottom: 5px solid #5C5C79;
                }
            }
        }
        .date {
            p {
                color: #5C5C79;
            }
        }
    }
</style>