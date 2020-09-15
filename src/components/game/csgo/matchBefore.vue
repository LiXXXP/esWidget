<template>
	<section>
        <div v-for="(item,index) in battleData" 
            :key="item.battle_id">
            <div v-if="index === currentIndex"
                class="cs-before"
                :style="{
                    'width':definedStyle.widthData,
                    'height': definedStyle.heightData,
                    'background-color':definedStyle.colorData
                }"
            >
            <head-tab 
                :colorData="definedStyle.type"
                :headData="item.score"
                :bureauIndex="index"
                @blockedOut="blockedOut"
            ></head-tab>
            <div class="content">
                <score-bar></score-bar>
                <div class="flex flex_between">
                    <war-list :isColor="colorData.left"></war-list>
                    <war-list :isColor="colorData.right"></war-list>
                </div>
                <div class="flex flex_between">
                    <state-table :isBig="isBig"></state-table>
                    <hr>
                    <state-table :isBig="isBig"></state-table>
                </div>
            </div>
        </div>
	</section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")             // 头部切换
    const scoreBar = ()=> import("@/components/game/modules/scoreBar")           // 时间条
    const warList = ()=> import("@/components/game/modules/csgo/warList")        // 战绩
    const stateTable = ()=> import("@/components/game/modules/csgo/stateTable")  // 面板
	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            }
        },
		data() {
			return {
				colorData: {
                    left: true,
                    right: false
                },
                isBig: false,    // 是否显示大图标
                currentIndex: 0,  // 当前显示页index
			}
        },
        methods: {
            // 展示页切换（子传父）
            blockedOut(type) {
                // 下一局
                if(type === 'next') {
                    this.currentIndex += 1
                    if(this.currentIndex > (this.battleData.length - 1)) return this.currentIndex = this.battleData.length -1
                }
                // 上一局
                if(type === 'last') {
                    this.currentIndex -= 1
                    if(this.currentIndex < 0) return this.currentIndex = 0
                }
            }
        },
        components: {
            headTab,
            scoreBar,
            warList,
            stateTable
        }
	}
</script>

<style lang="less" scoped>
    .cs-before {
        .content {
            width: 360px;
            height: 230px;
            padding: 8px;
            margin-top: -10px;
            box-sizing: border-box;
            background: url('../../../assets/imgs/bg.png') no-repeat 0 0;
            background-size: 100%;
        }
        hr {
            border: 0;
            margin: 0;
            padding: 0;
            margin: 15px auto 0;
            border-right: 1px solid #878787;
        }
    }
</style>