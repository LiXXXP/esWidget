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
                    <div class="flex flex_column flex_only_center">
                        <img :src="matchData.blue_team_image">
                        <p>{{matchData.blue_teams}}</p>
                    </div>
                    <div class="blue">B</div>
                </div>
                <div class="vs"> VS </div>
                <div class="team flex">
                    <div class="red">R</div>
                    <div class="flex flex_column flex_only_center">
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
                        :gamesNum="parseInt(matchData.number_of_games)"
                        :currentLast="currentLast"
                        :currentNext="currentNext"
                        @blockedOut="blockedOut"
                    ></head-tab>
                    <battle
                        :factionsData="item.battle_detail.factions"
                        :winerId="item.battle_detail.winner?item.battle_detail.winner.team_id:0">
                        <div slot="living" class="live">
                            <p>
                                <span>{{item.battle_detail.factions[0]?item.battle_detail.factions[0].kills : 0}}</span>
                                <i></i>
                                <span>{{item.battle_detail.factions[1]?item.battle_detail.factions[1].kills : 0}}</span>
                            </p>
                            <p class="num">
                                {{durationTime(item.battle_detail.duration) || "00`00"}}
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
                                    v-for="(key,index) in item.battle_detail.factions"
                                    :key="key.team_id"
                                    :placeData="place[index].right" 
                                    :colorData="definedStyle.type"
                                    :battleStatus="item.battle_status"
                                    :typeList="item.battle_detail.first_events.typeList"
                                    :sideData="key.team_id"
                                ></type-list>
                            </div>
                            <output-list
                                :barColor="barColorData"
                                :colorData="definedStyle.type"
                                :battleStatus="item.battle_status"
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
        </div>
    </section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")        // 头部切换
    const battle = ()=> import("@/components/game/modules/battle")          // 对局
    const typeList = ()=> import("@/components/game/modules/typeList")      // 标签列表
    const roleList = ()=> import("@/components/game/modules/roleList")      // 角色列表
    const outputList = ()=> import("@/components/game/modules/outputList")  // 输出占比
    
    import { formatSeconds, UTCDateToLocalDate } from '@/scripts/utils'

	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            },
            battleData: {
                type: Array,
                default: () => []
            },
            matchData: {
                type: Object,
                default: {}
            }
        },
		data() {
			return {
                place: [   // 位置是否右对齐
                    {
                        right: true,
                    },
                    {
                        right: false
                    }
                ],
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
                pageNum: 1,       // 当前第几局
                currentLast: 0,
                currentNext: 1
			}
        },
        created() {
            this.sortTeam()
            this.getTypeList()
            this.getPutList()
            if ( localStorage.getItem('ongoing') ) {
                this.pageNum = this.battleData.length
                this.currentIndex = this.battleData.length -1
            }
        },
        methods: {
            // 展示页切换（子传父）
            blockedOut(type) {
                // 下一局
                if(type === 'next') {
                    this.pageNum += 1
                    this.currentIndex += 1
                    this.currentLast = 0
                    this.currentNext = 1
                    if(this.currentIndex > (this.battleData.length - 1)) {
                        this.currentIndex = this.battleData.length -1
                        this.pageNum = this.battleData.length
                    }
                    if( parseInt(this.matchData.number_of_games) === this.pageNum) {
                        this.currentLast = 1
                        this.currentNext = 0
                    }
                }
                // 上一局
                if(type === 'last') {
                    this.pageNum -= 1
                    this.currentIndex -= 1
                    this.currentLast = 1
                    this.currentNext = 0
                    if(this.currentIndex < 0) {
                        this.currentIndex = 0
                        this.pageNum = 1
                    }
                    if( this.pageNum === 1) {
                        this.currentLast = 0
                        this.currentNext = 1
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
                            textEn: 'FB',
                            type: 'first_blood',
                            teamId:item.battle_detail.first_events.first_blood?item.battle_detail.first_events.first_blood.team_id:0
                        },
                        {
                            text: '五杀',
                            textEn: 'F5K',
                            type: 'first_to_5_kills',
                            teamId: item.battle_detail.first_events.first_to_5_kills?item.battle_detail.first_events.first_to_5_kills.team_id:0
                        },
                        {
                            text: '十杀',
                            textEn: 'F10K',
                            type: 'first_to_10_kills',
                            teamId: item.battle_detail.first_events.first_to_10_kills?item.battle_detail.first_events.first_to_10_kills.team_id:0
                        },
                        {
                            text: '首塔',
                            textEn: 'FT',
                            type: 'first_turret',
                            teamId: item.battle_detail.first_events.first_turret?item.battle_detail.first_events.first_turret.team_id:0
                        },
                        {
                            text: '首水晶',
                            textEn: 'FI',
                            type: 'first_inhibitor',
                            teamId: item.battle_detail.first_events.first_inhibitor?item.battle_detail.first_events.first_inhibitor.team_id:0
                        },
                        {
                            text: '首大龙',
                            textEn: 'FBN',
                            type: 'first_baron_nasho',
                            teamId: item.battle_detail.first_events.first_baron_nashor?item.battle_detail.first_events.first_baron_nashor.team_id:0
                        },
                        {
                            text: '首小龙',
                            textEn: 'FD',
                            type: 'first_dragon',
                            teamId: item.battle_detail.first_events.first_dragon?item.battle_detail.first_events.first_dragon.team_id:0
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
                            textEn: 'Gold',
                            type: 'gold',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '推塔',
                            textEn: 'Towers',
                            type: 'turret_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '水晶',
                            textEn: 'Inhibitor',
                            type: 'inhibitor_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '小龙',
                            textEn: 'Dragon',
                            type: 'dragon_kills',
                            num1: 0,
                            num2: 0
                        },
                        {
                            head: '男爵',
                            textEn: 'Baron',
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
            },
            sortTeam() {
                for(let item of this.battleData) {

                    item.battle_detail.factions.forEach(e => {
                        item.score.forEach(i => {
                            if(e.team_id === i.team_id) {
                                e.team_snapshot = i.team_snapshot
                            }
                        })
                    })
                    
                    if(item.battle_detail.factions[0].faction !== 'blue') {
                        item.battle_detail.factions.reverse()
                    }
                }
            }
        },
        watch: {
            battleData(old,val) {
                if(val.length > old.length) {
                    this.pageNum = this.battleData.length
                    this.currentIndex = this.battleData.length -1
                }
                this.sortTeam()
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
                    return UTCDateToLocalDate(date)
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