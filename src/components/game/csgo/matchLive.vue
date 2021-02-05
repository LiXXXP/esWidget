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
                    <div class="blue">CT</div>
                </div>
                <div class="vs"> VS </div>
                <div class="team flex">
                    <div class="red">T</div>
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
                    :class="['cs-live',{'night-mode':definedStyle.type}]"
                    :style="{'background-color':definedStyle.colorData}"
                >
                    <head-tab 
                        :colorData="definedStyle.type"
                        :headData="item.score"
                        :factionsData="item.battle_detail.teams"
                        :bureauPage="pageNum"
                        :gamesNum="parseInt(matchData.number_of_games)"
                        :currentLast="currentLast"
                        :currentNext="currentNext"
                        @blockedOut="blockedOut"
                    ></head-tab>
                    <battle
                        :factionsData="item.battle_detail.teams"
                        :winerId="item.battle_detail.winner?item.battle_detail.winner.team_id : 0"
                    >
                        <div slot="left-info" class="left-info flex flex_start">
                            <div class="flex flex_column flex_center num">
                                <p>{{item.battle_detail.teams[0].first_half_score || 0}}</p>
                                <p>{{item.battle_detail.teams[0].second_half_score || 0}}</p>
                            </div>
                            <div class="circle flex flex_column flex_center">
                                <p class="ct">CT</p>
                                <p class="t">T</p>
                            </div>
                        </div>
                        <div slot="living" class="live">
                            <p>{{item.battle_detail.teams[0].score || 0}}:{{item.battle_detail.teams[1].score || 0}}</p>
                            <p class="num">{{item.battle_detail.winner?item.battle_detail.winner.team_snapshot.short_name : ''}}</p>
                        </div>
                        <div slot="right-info" class="right-info flex flex_start">
                            <div class="circle flex flex_column flex_center">
                                <p class="t">T</p>
                                <p class="ct">CT</p>
                            </div>
                            <div class="flex flex_column flex_center num">
                                <p>{{item.battle_detail.teams[1].first_half_score || 0}}</p>
                                <p>{{item.battle_detail.teams[1].second_half_score || 0}}</p>
                            </div>
                        </div>
                    </battle>
                    <div class="type flex flex_between">
                        <type-list 
                            :placeData="place.right" 
                            :colorData="definedStyle.type"
                            :battleStatus="item.battle_status"
                            :typeList="item.battle_detail.special_events.typeList"
                            :sideData="item.battle_detail.teams[0].team_id"
                        ></type-list>
                        <type-list 
                            :placeData="place.left"
                            :colorData="definedStyle.type"
                            :battleStatus="item.battle_status"
                            :typeList="item.battle_detail.special_events.typeList"
                            :sideData="item.battle_detail.teams[1].team_id"
                        ></type-list>
                    </div>
                    <level-block
                        :colorData="definedStyle.type"
                        :levelData="item.battle_detail.rounds_detail"
                    ></level-block>
                </div>
            </div>
        </div>
	</section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")            // 头部切换
    const battle = ()=> import("@/components/game/modules/battle")              // 对局
    const typeList = ()=> import("@/components/game/modules/typeList")          // 标签列表
    const levelBlock = ()=> import("@/components/game/modules/csgo/levelBlock") // 场次

    import { UTCDateToLocalDate } from '@/scripts/utils'

	export default {
        props: {
            definedStyle: {  // 定义样式
                type: Object,
                default: null
            },
            battleData: {     // 对局数据
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
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,        // 当前第几局
                currentLast: 0,
                currentNext: 1
			}
        },
        created() {
            this.sortTeam()
            this.getTypeList()
            if ( localStorage.getItem('ongoing') ) {
                this.pageNum = this.battleData.length
                this.currentIndex = this.battleData.length -1
                if( this.pageNum > 1 && this.pageNum <= parseInt(this.matchData.number_of_games) ) {
                    this.currentLast = 1
                    this.currentNext = 0
                }
            } else {
                this.currentNext = 1
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
                    }
                    this.currentNext = 1
                    if(this.pageNum > 1 ) {
                        this.currentLast = 1
                    }
                    if(
                        parseInt(this.matchData.number_of_games) === this.pageNum || 
                        (localStorage.getItem('ongoing') && this.pageNum <= parseInt(this.matchData.number_of_games))
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
                    }
                    this.currentLast = 1
                    if(parseInt(this.matchData.number_of_games) > this.pageNum) {
                        this.currentNext = 1
                    }
                    if( this.pageNum === 1) {
                        this.currentLast = 0
                    }
                }
            },
            getTypeList() {
                for(let item of this.battleData) {
                    // 特殊事件列表
                    item.battle_detail.special_events.typeList = [
                        {
                            text: '先5',
                            textEn: 'F5RW',
                            type: 'first_to_5_rounds_wins',
                            teamId: item.battle_detail.special_events.first_to_5_rounds_wins?item.battle_detail.special_events.first_to_5_rounds_wins.team_id:0
                        },
                        {
                            text: '1回合胜',
                            textEn: 'WinR1',
                            type: 'win_round_1',
                            teamId: item.battle_detail.special_events.win_round_1?item.battle_detail.special_events.win_round_1.team_id:0
                        },
                        {
                            text: '16回合胜',
                            textEn: 'WinR16',
                            type: 'win_round_16',
                            teamId: item.battle_detail.special_events.win_round_16?item.battle_detail.special_events.win_round_16.team_id:0
                        }
                    ]
                }
            },
            sortTeam() {
                for(let item of this.battleData) {
                    item.battle_detail.teams.forEach(e => {
                        item.score.forEach(i => {
                            if(e.team_id === i.team_id) {
                                e.team_snapshot = i.team_snapshot
                            }
                        })
                    })
                    if(item.battle_detail.teams[0].starting_side !== 'ct') {
                        item.battle_detail.teams.reverse()
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
            }
        },
        computed: {
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
            levelBlock
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
                background-color: #008CD4;
            }
            .red {
                width: 18px;
                height: 18px;
                color: #fff;
                line-height: 18px;
                text-align: center;
                border-radius: 100%;
                background-color: #F7B600;
            }
        }
        .vs {
            color: #FF7600;
            font-size: 28px;
        }
    }
    .cs-live {
        width: 100%;
        height: 260px;
        .live {
            padding: 0 5px;
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
            .num {
                font-size: 12px;
            }
        }
        .left-info {
            margin-right: 20px;
            .circle {
                color: #fff;
                margin-left: 5px;
                p {
                    &.ct {
                        background-color: #008CD4;
                    }
                    &.t {
                        background-color: #F7B600;
                    }
                }
            }
        }
        .right-info {
            margin-left: 20px;
            .circle {
                color: #fff;
                margin-right: 5px;
                p {
                    &.ct {
                        background-color: #008CD4;
                    }
                    &.t {
                        background-color: #F7B600;
                    }
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