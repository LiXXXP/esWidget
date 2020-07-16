<template>
	<div :class="[
            'match-live',
            {'night-mode':definedStyle.type}
        ]"
        :style="{
            'width':definedStyle.widthData,
            'height': definedStyle.heightData,
            'background-color':definedStyle.colorData
        }"
    >
        <head-tab 
            :colorData="definedStyle.type"
        ></head-tab>
        <battle>
            <div slot="living" class="live">
                <p>
                    <span>23</span>
                    <i></i>
                    <span>27</span>
                </p>
                <p class="num">35'24''</p>
            </div>
        </battle>
        <div class="flex flex_between">
            <role-list 
                :roleData="roleData"
            ></role-list>
            <div>
                <div class="flex flex_between">
                    <type-list 
                        :placeData="placeRight" 
                        :colorData="definedStyle.type"
                    ></type-list>
                    <type-list 
                        :placeData="placeLeft"
                        :colorData="definedStyle.type"
                    ></type-list>
                </div>
                <output-list
                    :barColor="barColorData"
                    :colorData="definedStyle.type"
                ></output-list>
            </div>
            <role-list 
                :roleData="roleData"
            ></role-list>
        </div>
	</div>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")        // 头部切换
    const battle = ()=> import("@/components/game/modules/battle")          // 对局
    const typeList = ()=> import("@/components/game/modules/typeList")      // 标签列表
    const roleList = ()=> import("@/components/game/modules/roleList")      // 角色列表
    const outputList = ()=> import("@/components/game/modules/outputList")  // 输出占比
    
	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            },
            battleData: {
                type: Array,
                default: []
            }
        },
        created() {
            // console.log(this.battleData)
        },
		data() {
			return {
                placeRight: true, // 位置是否右对齐
                placeLeft: false, // 位置是否左对齐
                barColorData: {   // 进度条颜色
                    left: '#1167E8',
                    right: '#D43F2F',
                },
                roleData: {       // 角色头像宽高
                    width: '36px',
                    height: '36px',
                    type: 'lol'
                }
			}
        },
        components: {
            headTab,
            battle,
            typeList,
            roleList,
            outputList
        }
	}
</script>

<style lang="less" scoped>
    .match-live {
        box-sizing: border-box;
        .live {
            span {
                color: #FF7600;
                font-size: 18px;
                font-weight: 500;
            }
            i {
                width: 14px;
                height: 13px;
                margin: 0 5px;
                display: inline-block;
                background: url('../../../assets/imgs/icon01.png') no-repeat 0 0;
                background-size: 100%;
            }
        }
    }
    .night-mode {
        .live {
            .num {
                color: #737397;
            }
        }
    }
</style>