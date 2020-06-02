<template>
	<div :class="['type-list', 'flex', 'flex_wrap', 
        placeData?'flex_end':'flex_start']"
    >
        <span class="block"
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
            }
        },
		data() {
			return {
				typeList: [
                    {
                        type: '首水晶'
                    },
                    {
                        type: '十杀'
                    },
                    {
                        type: '五杀'
                    },
                    {
                        type: '一血'
                    },
                    {
                        type: '首大龙'
                    },
                    {
                        type: '首小龙'
                    },
                    {
                        type: '首塔'
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
    .type-list {
        margin: 10px 0;
        .block {
            color: #fff;
            font-size: 10px;
            font-weight: 500;
            padding: 1px 3px;
            border-radius: 2px;
            background-color: #E7E7E7;
            transform: scale(0.833333);
            &:nth-child(2n) {
                background-color: @orange;
            }
        }
    }
    .flex_end {
        margin-right: 8px;
    }
    .flex_start {
        margin-left: 8px;
    }
</style>