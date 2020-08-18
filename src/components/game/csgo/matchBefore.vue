<template>
	<section class="cs-before"
        :style="{'width':definedStyle.widthData,
                 'height': definedStyle.heightData,
                 'background-color':definedStyle.colorData
                }">
        <head-tab :colorData="definedStyle.type"></head-tab>
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