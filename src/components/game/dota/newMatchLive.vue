<template>
    <section>
        <div v-if="battleData.length === 0" 
            class="match-before"
            :style="{'background-color': definedStyle.colorData}">
            <p class="name">{{matchData.tournament_name}}</p>
            <p class="time">{{durationDate(matchData.begin_at)}}</p>
            <p class="bo">BO{{matchData.number_of_games}}</p>
            <div class="flex flex_around">
                <div class="team flex">
                    <div class="flex flex_column flex_only_center">
                        <img :src="matchData.blue_team_image">
                        <p>{{matchData.blue_teams}}</p>
                    </div>
                    <div class="blue">R</div>
                </div>
                <div class="vs"> VS </div>
                <div class="team flex">
                    <div class="red">D</div>
                    <div class="flex flex_column flex_only_center">
                        <img :src="matchData.red_team_image">
                        <p>{{matchData.red_teams}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="battleItem != null">
            <div v-for="(item,index) in battleData" 
                :key="item.battle_id">
                <div v-if="index === currentIndex"
                    :class="['match-live',{'night-mode': definedStyle.type}]"
                    :style="{'background-color': definedStyle.colorData}"
                >
                    <head-tab
                        :colorData="definedStyle.type"
                        :headData="battleItem.score"
                        :factionsData="battleItem.battle_detail.factions"
                        :bureauPage="pageNum"
                        :gamesNum="parseInt(matchData.number_of_games)"
                        :currentLast="currentLast"
                        :currentNext="currentNext"
                        @blockedOut="blockedOut"
                    ></head-tab>

                    <battle
                        :factionsData="battleItem.battle_detail.factions"
                        :winerId="battleItem.battle_detail.winner?battleItem.battle_detail.winner.team_id:0">
                        <div slot="living" class="live">
                            <p>
                                <span>{{battleItem.battle_detail.factions[0]?battleItem.battle_detail.factions[0].kills : 0}}</span>
                                <i></i>
                                <span>{{battleItem.battle_detail.factions[1]?battleItem.battle_detail.factions[1].kills : 0}}</span>
                            </p>
                            <p class="num">
                                {{durationTime(battleItem.battle_detail.duration) || "00`00"}}
                            </p>
                        </div>
                    </battle>
                    <div class="flex flex_between">
                        <role-list
                            :heroList="battleItem.battle_detail.factions[0].players"
                            :roleData="roleData"
                        ></role-list>
                        <div>
                            <div class="flex flex_between">
                                <type-list 
                                    :placeData="place.right" 
                                    :colorData="definedStyle.type"
                                    :typeList="battleItem.battle_detail.first_events.typeList"
                                    :sideData="battleItem.battle_detail.factions[0].team_id"
                                ></type-list>
                                <type-list 
                                    :placeData="place.left"
                                    :colorData="definedStyle.type"
                                    :typeList="battleItem.battle_detail.first_events.typeList"
                                    :sideData="battleItem.battle_detail.factions[1].team_id"
                                ></type-list>
                            </div>
                            <output-list
                                :barColor="barColorData"
                                :colorData="definedStyle.type"
                                :outputList="battleItem.battle_detail.outputList"
                            ></output-list>
                        </div>
                        <role-list 
                            :heroList="battleItem.battle_detail.factions[1].players"
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
    
    import { newBattle } from "@/scripts/request.js"        // 请求方法
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
                place: {
                    right: true, // 位置是否右对齐
                    left: false  // 位置是否左对齐
                },
                barColorData: {   // 进度条颜色
                    left: '#3CAB3C',
                    right: '#D43F2F',
                },
                roleData: {       // 角色头像宽高
                    type: 'lol'
                },
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,       // 当前第几局
                battleItem: null,
                currentLast: 0,
                currentNext: 1
			}
        },
        created() {
            if ( localStorage.getItem('ongoing') ) {
                this.pageNum = this.battleData.length
                this.currentIndex = this.battleData.length -1
                this.getBattle(this.battleData[this.currentIndex].battle_id)
            }
            else {
                this.getBattle(this.battleData[0].battle_id)
            }
        },
        methods: {
            // 展示页切换（子传父）
            blockedOut(type) {
                // 下一局
                if(type === 'next') {
                    this.pageNum += 1
                    this.currentIndex += 1
                    if(this.currentIndex > (this.battleData.length - 1)) {
                        this.currentIndex = this.battleData.length -1
                        this.pageNum = this.battleData.length
                    } else {
                        this.getBattle(this.battleData[this.currentIndex].battle_id)
                    }
                    this.currentNext = 1
                    if(this.pageNum > 1 ) {
                        this.currentLast = 1
                    }
                    if(
                        this.pageNum === this.battleData.length || 
                        (localStorage.getItem('ongoing') && this.pageNum <= parseInt(this.battleData.length))
                    ) {
                        this.currentNext = 0
                    }
                }
                // 上一局
                if(type === 'last') {
                    this.pageNum -= 1
                    this.currentIndex -= 1
                    if(this.currentIndex < 0) {
                        this.currentIndex = 0
                        this.pageNum = 1
                    } else {
                        this.getBattle(this.battleData[this.currentIndex].battle_id)
                    }
                    this.currentLast = 1
                    if(parseInt(this.battleData.length) > this.pageNum) {
                        this.currentNext = 1
                    }
                    if( this.pageNum === 1) {
                        this.currentLast = 0
                    }
                }
            },
            getBattle(battleId) {
                let _this = this
                let params = {
                    battle_id: battleId
                }
                newBattle(params).then(res => {
                    if(res.code === 200) {
                        _this.battleItem = res.data
                        _this.sortTeam()
                        _this.getTypeList()
                        _this.getPutList()
                    }
                })
            },
            // 第一次特殊事件
            getTypeList() {
                // 特殊事件列表
                this.battleItem.battle_detail.first_events.typeList = [
                    {
                            text: '一血',
                            textEn: 'FB',
                            type: 'first_blood',
                            teamId:this.battleItem.battle_detail.first_events.first_blood?this.battleItem.battle_detail.first_events.first_blood.team_id:0
                        },
                        {
                            text: '五杀',
                            textEn: 'F5K',
                            type: 'first_to_5_kills',
                            teamId: this.battleItem.battle_detail.first_events.first_to_5_kills?this.battleItem.battle_detail.first_events.first_to_5_kills.team_id:0
                        },
                        {
                            text: '十杀',
                            textEn: 'F10K',
                            type: 'first_to_10_kills',
                            teamId: this.battleItem.battle_detail.first_events.first_to_10_kills?this.battleItem.battle_detail.first_events.first_to_10_kills.team_id:0
                        },
                        {
                            text: '首塔',
                            textEn: 'FT',
                            type: 'first_tower',
                            teamId: this.battleItem.battle_detail.first_events.first_tower?this.battleItem.battle_detail.first_events.first_tower.team_id:0
                        },
                        {
                            text: '首肉山',
                            textEn: 'FR',
                            type: 'first_roshan',
                            teamId: this.battleItem.battle_detail.first_events.first_roshan?this.battleItem.battle_detail.first_events.first_roshan.team_id:0
                        },
                        {
                            text: '首兵营',
                            textEn: 'FB',
                            type: 'first_barracks',
                            teamId: this.battleItem.battle_detail.first_events.first_barracks?this.battleItem.battle_detail.first_events.first_barracks.team_id:0
                        }
                ]
            },
            // 经济输出
            getPutList() {
                // 经济输出
                this.battleItem.battle_detail.outputList = [
                    {
                        head: '经济',
                        textEn: 'Gold',
                        type: 'net_worth',
                        num1: 0,
                        num2: 0
                    },
                    {
                        head: '推塔',
                        textEn: 'Towers',
                        type: 'tower_kills',
                        num1: 0,
                        num2: 0
                    },
                    {
                        head: '肉山',
                        textEn: 'Roshan',
                        type: 'roshan_kills',
                        num1: 0,
                        num2: 0
                    },
                    {
                        head: '近战营',
                        textEn: 'Melee',
                        type: 'melee_barrack_kills',
                        num1: 0,
                        num2: 0
                    },
                    {
                        head: '远程营',
                        textEn: 'Ranged',
                        type: 'ranged_barrack_kills',
                        num1: 0,
                        num2: 0
                    }
                ]
                this.battleItem.battle_detail.outputList.forEach( e => {
                    let field = e.type
                    e.num1 = this.battleItem.battle_detail.factions[0][field] || 0
                    e.num2 = this.battleItem.battle_detail.factions[1][field] || 0
                })
            },
            sortTeam() {
                this.battleItem.battle_detail.factions.forEach(e => {
                    this.battleItem.score.forEach(i => {
                        if(e.team_id === i.team_id) {
                            e.team_snapshot = i.team_snapshot
                        }
                    })
                })
                if(this.battleItem.battle_detail.factions[0].faction !== 'radiant') {
                    this.battleItem.battle_detail.factions.reverse()
                }
            }
        },
        watch: {
            battleData(old,val) {
                if(val.length > old.length) {
                    this.pageNum = this.battleData.length
                    this.currentIndex = this.battleData.length -1
                }
                this.getBattle(this.battleData[this.currentIndex].battle_id)
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
        width: 100%;
        height: 260px;
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
        width: 100%;
        height: 270px;
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