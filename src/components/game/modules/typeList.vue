<template>
	<div :class="['type-list', 'flex', 'flex_wrap', 
        placeData?'flex_end':'flex_start',
        {'night-mode':colorData}]"
    >
        <div :class="[
                'block',
                {'come': sideData === item.teamId,
                 'stuts': battleStatus !== 'completed'
                }
            ]"
            v-for="item in typeList"
            :key="item.text"
        >
            {{lang === 'en'?item.textEn:item.text}}
        </div>
	</div>
</template>

<script>
    import { getUrlParam } from '@/scripts/utils'    // 获取页面参数方法

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
                type: Number,
                default: 0
            },
            battleStatus: {  // 比赛状态
                type: String,
                default: ''
            }
        },
        data() {
            return {
                lang: 'cn'
            }
        },
        created() {
            this.lang = getUrlParam('l')
        }
	}
</script>

<style lang="less" scoped>
    @orange: #FF664D;
    @blue: #4D62FF;
    @purple: #CF4DFF;
    @night: #2D2D3A;
    @keyframes loadingframe{
        from {left: 0%;}
        to {left: 140%;}
    }
    .type-list {
        margin: 8px 0;
        position: relative;
        .block {
            color: #fff;
            font-size: 10px;
            font-weight: 500;
            padding: 1px 2px;
            overflow: hidden;
            border-radius: 2px;
            background-color: #E7E7E7;
            transform: scale(0.833333);
            &.come {
                background-color: @orange;
                &:nth-child(4) {
                    background-color: @blue;
                }
                &:nth-child(5) {
                    background-color: @purple;
                }
                &:nth-child(7) {
                    background-color: @blue;
                }
                &.stuts {
                    &::after {
                        content: '';
                        width: 15px;
                        height: 18px;
                        z-index: 999;
                        animation: 2s loadingframe infinite;
                        -webkit-animation: 2s loadingframe infinite;
                        transform: translateX(-50%) skew(160deg);
                        background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, .7));
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
        }
    }
    .flex_end {
        margin-right: 5px;
    }
    .flex_start {
        margin-left: 5px;
    }
    .night-mode {
        .block {
            color: #454558;
            background-color: @night;
            &.come {
                color: #fff;
                background-color: @orange;
                &:nth-child(4) {
                    background-color: @blue;
                }
                &:nth-child(5) {
                    background-color: @purple;
                }
                &:nth-child(7) {
                    background-color: @blue;
                }
            }
        }
    }
</style>