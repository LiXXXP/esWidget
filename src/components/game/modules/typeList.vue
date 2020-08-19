<template>
	<div :class="['type-list', 'flex', 'flex_wrap', 
        placeData?'flex_end':'flex_start',
        {'night-mode':colorData}]"
    >
        <span :class="['block',
            {'come': sideData === item.side}]"
            v-for="item in typeList"
            :key="item.text"
        >
            {{item.text}}
        </span>
	</div>
</template>

<script>
	export default {
        props: {
            placeData: {     // 显示左右对齐方式
                type: Boolean,
                default: true
            },
            colorData: {     // 背景模式
                type: Number,
                default: 0,
            },
            typeList: {      // 特殊事件列表
                type: Array,
                default: ()=>[]
            },
            sideData: {      // 特殊事件显示队伍方
                type: String,
                default: ''
            },
        },
		data() {
			return {

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
            &.come {
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
    .night-mode {
        .block {
            color: #454558;
            background-color: @night;
            &.come {
                color: #fff;
                background-color: @orange;
            }
        }
    }
</style>