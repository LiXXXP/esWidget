<template>
    <section>
        <div v-for="(item,index) in battleData" 
            :key="item.battle_id"
        >
            <div v-if="index === currentIndex"
                :class="[
                    'match-live',
                    {'night-mode': definedStyle.type}
                ]"
                :style="{
                    'width': definedStyle.widthData,
                    'height': definedStyle.heightData,
                    'background-color': definedStyle.colorData
                }"
            >
                <head-tab
                    :colorData="definedStyle.type"
                    :headData="item.score"
                    :bureauPage="pageNum"
                    @blockedOut="blockedOut"
                ></head-tab>
                <battle 
                    :battleData="item.score"
                    :winerId="item.battle_detail.winner.team_id">
                    <div slot="living" class="live">
                        <p>
                            <span>{{item.score[0].score}}</span>
                            <i></i>
                            <span>{{item.score[1].score}}</span>
                        </p>
                        <p class="num">
                            {{durationTime(item.battle_detail.duration)}}
                        </p>
                    </div>
                </battle>
                <div class="flex flex_between">
                    <role-list
                        :heroList="item.battle_detail.factions[0].players"
                        :roleData="roleData"
                    ></role-list>
                    <div>
                        <div class="flex flex_between">
                            <type-list 
                                :placeData="place.right" 
                                :colorData="definedStyle.type"
                                :typeList="item.battle_detail.first_events.typeList"
                                :sideData="item.battle_detail.factions[0].faction"
                            ></type-list>
                            <type-list 
                                :placeData="place.left"
                                :colorData="definedStyle.type"
                                :typeList="item.battle_detail.first_events.typeList"
                                :sideData="item.battle_detail.factions[1].faction"
                            ></type-list>
                        </div>
                        <output-list
                            :barColor="barColorData"
                            :colorData="definedStyle.type"
                            :outputList="item.battle_detail.outputList"
                        ></output-list>
                    </div>
                    <role-list 
                        :heroList="item.battle_detail.factions[1].players"
                        :roleData="roleData"
                    ></role-list>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")        // 头部切换
    const battle = ()=> import("@/components/game/modules/battle")          // 对局
    const typeList = ()=> import("@/components/game/modules/typeList")      // 标签列表
    const roleList = ()=> import("@/components/game/modules/roleList")      // 角色列表
    const outputList = ()=> import("@/components/game/modules/outputList")  // 输出占比
    
    import { formatSeconds } from '@/scripts/utils'

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
		data() {
			return {
                place: {
                    right: true, // 位置是否右对齐
                    left: false  // 位置是否左对齐
                },
                barColorData: {   // 进度条颜色
                    left: '#1167E8',
                    right: '#D43F2F',
                },
                roleData: {       // 角色头像宽高
                    width: '36px',
                    height: '36px',
                    type: 'lol'
                },
                currentIndex: 0,  // 当前显示页index
                pageNum: this.battleData.length,  // 当前第几局
			}
        },
        created() {
            this.getTypeList()
            this.getPutList()
        },
        methods: {
            // 展示页切换（子传父）
            blockedOut(type) {
                // 下一局
                if(type === 'next') {
                    this.pageNum -= 1
                    this.currentIndex += 1
                    if(this.currentIndex > (this.battleData.length - 1)) {
                        this.currentIndex = this.battleData.length -1
                        this.pageNum = 1
                        return false
                    }
                }
                // 上一局
                if(type === 'last') {
                    this.pageNum += 1
                    this.currentIndex -= 1
                    if(this.currentIndex < 0) {
                        this.currentIndex = 0
                        this.pageNum = this.battleData.length
                        return false
                    } 
                }
            },
            // 第一次特殊事件
            getTypeList() {
                for(let item of this.battleData) {
                    // 特殊事件列表
                    item.battle_detail.first_events.typeList = [
                        {
                            text: '一血',
                            type: 'first_blood',
                            side:item.battle_detail.first_events.first_blood.faction
                        },
                        {
                            text: '五杀',
                            type: 'first_to_5_kills',
                            side: item.battle_detail.first_events.first_to_5_kills.faction
                        },
                        {
                            text: '十杀',
                            type: 'first_to_10_kills',
                            side: item.battle_detail.first_events.first_to_10_kills.faction
                        },
                        {
                            text: '首塔',
                            type: 'first_turret',
                            side: item.battle_detail.first_events.first_turret.faction
                        },
                        {
                            text: '首水晶',
                            type: 'first_inhibitor',
                            side: item.battle_detail.first_events.first_inhibitor.faction
                        },
                        {
                            text: '首大龙',
                            type: 'first_baron_nasho',
                            side: item.battle_detail.first_events.first_baron_nashor.faction
                        },
                        {
                            text: '首小龙',
                            type: 'first_dragon',
                            side: item.battle_detail.first_events.first_dragon.faction
                        },
                    ]
                }
            },
            // 经济输出
            getPutList() {
                for (let item of this.battleData) {
                    // 经济输出
                    item.battle_detail.outputList = [
                        {
                            head: '经济',
                            type: 'gold',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '推塔',
                            type: 'turret_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '水晶',
                            type: 'inhibitor_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '小龙',
                            type: 'dragon_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '男爵',
                            type: 'baron_nashor_kills',
                            num1: 0,
                            num2: 0
                        }
                    ]
                    item.battle_detail.outputList.forEach( e => {
                        let field = e.type
                        e.num1 = item.battle_detail.factions[0][field]
                        e.num2 = item.battle_detail.factions[1][field]
                    })
                }
            }
        },
        watch: {
            battleData(old,val) {
                this.getTypeList()
                this.getPutList()
            }
        },
        computed: {
            durationTime(sec) {
                return function(sec) {
                    return formatSeconds(sec)
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