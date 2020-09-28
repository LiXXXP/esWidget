<template>
    <section>
        <div v-if="battleData.length === 0" 
            class="match-before"
            :style="{
                'width': definedStyle.widthData,
                'height': definedStyle.heightData,
                'background-color': definedStyle.colorData
        }">
            <p class="name">{{matchData.tournament_name}}</p>
            <p class="time">{{durationDate(matchData.begin_at)}}</p>
            <p class="bo">BO{{matchData.number_of_games}}</p>
            <div class="flex flex_around">
                <div class="team flex">
                    <div>
                        <img :src="matchData.blue_team_image">
                        <p>{{matchData.blue_teams}}</p>
                    </div>
                    <div class="blue">B</div>
                </div>
                <div class="vs"> VS </div>
                <div class="team flex">
                    <div class="red">R</div>
                    <div>
                        <img :src="matchData.red_team_image">
                        <p>{{matchData.red_teams}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="(item,index) in battleData" 
                :key="item.battle_id">
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
                        :factionsData="item.battle_detail.factions"
                        :bureauPage="pageNum"
                        @blockedOut="blockedOut"
                    ></head-tab>
                    <battle 
                        :battleData="item.score"
                        :factionsData="item.battle_detail.factions"
                        :winerId="item.battle_detail.winner.team_id">
                        <div slot="living" class="live">
                            <p v-if="item.battle_detail.factions[0].faction === 'blue'">
                                <span>{{item.battle_detail.factions[0].kills || 0}}</span>
                                <i></i>
                                <span>{{item.battle_detail.factions[1].kills || 0}}</span>
                            </p>
                            <p v-else>
                                <span>{{item.battle_detail.factions[1].kills || 0}}</span>
                                <i></i>
                                <span>{{item.battle_detail.factions[0].kills || 0}}</span>
                            </p>
                            <p class="num">
                                {{durationTime(item.battle_detail.duration) || "00`00"}}
                            </p>
                        </div>
                    </battle>
                    <div class="flex flex_between">
                        <role-list
                            :heroList="item.battle_detail.factions[0].faction === 'blue'?
                                        item.battle_detail.factions[0].players:
                                        item.battle_detail.factions[1].players"
                            :roleData="roleData"
                        ></role-list>
                        <div>
                            <div class="flex flex_between">
                                <type-list 
                                    :placeData="place.right" 
                                    :colorData="definedStyle.type"
                                    :typeList="item.battle_detail.first_events.typeList"
                                    :sideData="item.battle_detail.factions[0].faction === 'blue'?
                                                item.battle_detail.factions[0].faction:
                                                item.battle_detail.factions[1].faction"
                                ></type-list>
                                <type-list 
                                    :placeData="place.left"
                                    :colorData="definedStyle.type"
                                    :typeList="item.battle_detail.first_events.typeList"
                                    :sideData="item.battle_detail.factions[1].faction === 'red'?
                                                item.battle_detail.factions[1].faction:
                                                item.battle_detail.factions[0].faction"
                                ></type-list>
                            </div>
                            <output-list
                                :barColor="barColorData"
                                :colorData="definedStyle.type"
                                :outputList="item.battle_detail.outputList"
                            ></output-list>
                        </div>
                        <role-list 
                            :heroList="item.battle_detail.factions[1].faction === 'red'?
                                        item.battle_detail.factions[1].players:
                                        item.battle_detail.factions[0].players"
                            :roleData="roleData"
                        ></role-list>
                    </div>
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
    
    import { formatSeconds, rTime } from '@/scripts/utils'

	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            },
            battleData: {
                type: Array,
                default: []
            },
            matchData: {
                type: Object,
                default: {}
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
                pageNum: this.battleData.length || 1,  // 当前第几局
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
                        e.num1 = item.battle_detail.factions[0][field] || 0
                        e.num2 = item.battle_detail.factions[1][field] || 0
                    })
                }
            }
        },
        watch: {
            battleData(old,val) {
                if(val.length > old.length) {
                    this.pageNum = this.battleData.length
                    this.currentIndex = 0
                }
                this.getTypeList()
                this.getPutList()
            }
        },
        computed: {
            durationTime(sec) {
                return function(sec) {
                    return formatSeconds(sec)
                }
            },
            durationDate(date) {
                return function(date) {
                    return rTime(date)
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
    .match-before {
        padding: 20px 10px;
        box-sizing: border-box;
        .name {
            font-size: 18px;
            color: #434343;
            text-align: center;
        }
        .time {
            font-size: 14px;
            color: #777777;
            padding-top: 10px;
            text-align: center;
        }
        .bo {
            color: #878787;
            font-size: 14px;
            text-align: center;
            padding: 10px 0 30px;
        }
        .team {
            img {
                width: 36px;
                height: 36px;
                display: block;
                margin: 0 auto;
            }
            p {
                font-size: 14px;
                color: #434343;
                padding-top: 5px;
            }
            .blue {
                width: 18px;
                height: 18px;
                color: #fff;
                line-height: 18px;
                text-align: center;
                border-radius: 100%;
                background-color: #1167E8;
            }
            .red {
                width: 18px;
                height: 18px;
                color: #fff;
                line-height: 18px;
                text-align: center;
                border-radius: 100%;
                background-color: #D43F2F;
            }
        }
        .vs {
            color: #FF7600;
            font-size: 28px;
        }
    }
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