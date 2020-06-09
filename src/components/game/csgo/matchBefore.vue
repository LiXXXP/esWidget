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
            <state-table></state-table>
        </div>
	</section>
</template>

<script>
    import headTab from '@/components/game/modules/headTab'            // 头部切换
    import scoreBar from '@/components/game/modules/scoreBar'          // 时间条
    import warList from '@/components/game/modules/csgo/warList'       // 战绩
    import stateTable from '@/components/game/modules/csgo/stateTable' // 面板
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
        margin: 20px auto;
        .content {
            width: 360px;
            height: 230px;
            padding: 8px;
            margin-top: -10px;
            box-sizing: border-box;
            background: url('../../../assets/imgs/bg.png') no-repeat 0 0;
            background-size: 100%;
        }
    }
</style>