<template>
	<div :class="['head-tab', 'flex', 'flex_between',{'night-mode':colorData}]">
        <div class="flex flex_start flex_only_center">
            <p class="left" @click="nextStep('last')"></p>
            <p>第{{bureauNum}}局</p>
        </div>
        <div class="flex flex_start flex_only_center">
            <div class="flex flex_start">
                <img :src="headData[0].team_snapshot.image">
                <p>{{headData[0].score || 0}} : {{headData[1].score || 0}}</p>
                <img :src="headData[1].team_snapshot.image">
            </div>
            <p class="right" @click="nextStep('next')"></p>
        </div>
	</div>
</template>

<script>
    import { toChinesNum } from '@/scripts/utils'
	export default {
        props: {
            colorData: {    // 背景色模式
                type: Number,
                default: 0,
            },
            headData: {     // 对局分数
                type: Array,
                default: []
            },
            bureauPage: {   // 对局数
                type: Number,
                default: 0
            },
            
        },
		data() {
			return {

			}
        },
        methods: {
            // 上一局 下一局
            nextStep(type) {
                this.$emit('blockedOut',type)
            }
        },
        computed: {
            bureauNum() {
                return toChinesNum((this.bureauPage))
            }
        }
	}
</script>

<style lang="less" scoped>
    .head-tab {
        height: 30px;
        color: #303030;
        padding: 0 20px;
        font-size: 12px;
        line-height: 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E7E7E7;
        .left,
        .right {
            width: 7px;
            height: 7px;
            cursor: pointer;
            border-top: 1px solid #101010;
            border-left: 1px solid #101010;
        }
        .left {
            margin-right: 20px;
            transform: rotate(-45deg);
        }
        .right {
            margin-left: 10px;
            transform: rotate(135deg);
        }
        img {
            width: 12px;
            height: 14px;
            margin: auto 10px;
        }
    }
    .night-mode {
        color: #CFCFCF;
        border-bottom: 1px solid #131313;
        .left,.right {
            border-top: 1px solid #CFCFCF;
            border-left: 1px solid #CFCFCF;
        }
    }
</style>