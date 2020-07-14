<template>
	<section :class="['cs-live',{'night-mode':definedStyle.type}]"
        :style="{'width':definedStyle.widthData,
                 'height': definedStyle.heightData,
                 'background-color':definedStyle.colorData
                }">
        <head-tab :colorData="definedStyle.type"></head-tab>
        <battle>
            <div slot="left-info" class="left-info flex flex_start">
                <div class="flex flex_column flex_center">
                    <p>10</p>
                    <p>4</p>
                </div>
                <div class="circle flex flex_column flex_center">
                    <p>CT</p>
                    <p>T</p>
                </div>
            </div>
            <div slot="living" class="live">
                <p>14:12</p>
                <p class="num">NUK</p>
            </div>
            <div slot="right-info" class="right-info flex flex_start">
                <div class="circle flex flex_column flex_center">
                    <p>T</p>
                    <p>CT</p>
                </div>
                <div class="flex flex_column flex_center">
                    <p>10</p>
                    <p>4</p>
                </div>
            </div>
        </battle>
        <div class="type flex flex_between">
            <type-list 
                :placeData="placeRight" 
                :colorData="definedStyle.type"
            ></type-list>
            <type-list 
                :placeData="placeLeft"
                :colorData="definedStyle.type"
            ></type-list>
        </div>
        <level-block
            :colorData="definedStyle.type"
        ></level-block>
	</section>
</template>

<script>
    import headTab from '@/components/game/modules/headTab'          // 头部切换
    import battle from '@/components/game/modules/battle'            // 对局
    import typeList from '@/components/game/modules/typeList'        // 标签列表
    import levelBlock from '@/components/game/modules/csgo/levelBlock' // 场次
	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            }
        },
		data() {
			return {
                placeRight: true, // 位置是否右对齐
                placeLeft: false, // 位置是否左对齐
			}
        },
        mounted() {

        },
        components: {
            headTab,
            battle,
            typeList,
            levelBlock
        }
	}
</script>

<style lang="less" scoped>
    .cs-live {
        .live {
            p {
                color: #FF7600;
                font-size: 18px;
                font-weight: bold;
            }
            .num {
                color: #434343;
                font-size: 14px;
                font-weight: 500;
            }
        }
        .left-info,
        .right-info {
            p {
                width: 17px;
                height: 17px;
                line-height: 17px;
                margin-bottom: 2px;
                text-align: center;
                border-radius: 100%;
            }
        }
        .left-info {
            margin-right: 20px;
            .circle {
                color: #fff;
                margin-left: 5px;
                p:nth-child(1) {
                    background-color: #008CD4;
                }
                p:nth-child(2) {
                    background-color: #F7B600;
                }
            }
        }
        .right-info {
            margin-left: 20px;
            .circle {
                color: #fff;
                margin-right: 5px;
                p:nth-child(2) {
                    background-color: #008CD4;
                }
                p:nth-child(1) {
                    background-color: #F7B600;
                }
            }
        }
        .type {
            padding: 0 30px;
        }
        &.night-mode {
            .live {
                .num {
                    color: #737397;
                }
            }
            .left-info,
            .right-info {
                p {
                    color: #737397;
                }
                .circle {
                    p {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>