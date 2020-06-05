<template>
	<div :class="['type-list', 'flex', 'flex_wrap', 
        placeData?'flex_end':'flex_start',
        {'night-mode':colorData}]"
    >
        <span :class="['block',item.flag?'flag':'']"
            v-for="item in typeList"
            :key="item.type">
            {{item.type}}
        </span>
	</div>
</template>

<script>
	export default {
        props: {
            placeData: {
                type: Boolean,
                default: true
            },
            colorData: {
                type: Number,
                default: 0,
            }
        },
		data() {
			return {
				typeList: [
                    {
                        type: '首大龙',
                        flag: true
                    },
                    {
                        type: '十杀',
                        flag: false
                    },
                    {
                        type: '五杀',
                        flag: false
                    },
                    {
                        type: '一血',
                        flag: true
                    },
                    {
                        type: '首龙long',
                        flag: true
                    },
                    {
                        type: '首小龙',
                        flag: true
                    },
                    {
                        type: '首塔',
                        flag: false
                    }
                ]
			}
		}
	}
</script>

<style lang="less" scoped>
    @orange: #FF664D;
    @blue: #4D62FF;
    @purple: #CF4DFF;
    @night: #2D2D3A;
    .type-list {
        margin: 10px 0;
        .block {
            color: #fff;
            font-size: 10px;
            font-weight: 500;
            padding: 1px 2px;
            border-radius: 2px;
            background-color: #E7E7E7;
            transform: scale(0.833333);
        }
        .flag {
            &:nth-child(n) {
                color: #fff;
                background-color: @orange;
            }
            &:nth-child(2n) {
                color: #fff;
                background-color: @blue;
            }
            &:nth-child(3n) {
                color: #fff;
                background-color: @purple;
            }
        }
    }
    .flex_end {
        margin-right: 8px;
    }
    .flex_start {
        margin-left: 8px;
    }
    .night-mode {
        .block {
            color: #454558;
            background-color: @night;
        }
    }
</style>