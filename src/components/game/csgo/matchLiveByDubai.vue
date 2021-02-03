 <template>
	<section>
        <div v-if="battleData.length === 0 || !battleItem" 
            class="match-before"
            :style="{'background-color': definedStyle.colorData}"
        >
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
        <div v-else-if="battleItem">
            <div v-for="(item,index) in battleData" 
                :key="item.battle_id">
                <div v-if="index === currentIndex"
                    :class="['cs-live',{'night-mode':definedStyle.type}]"
                    :style="{'background-color':definedStyle.colorData}"
                >
                    <head-tab 
                        :colorData="definedStyle.type"
                        :headData="battleItem.score"
                        :factionsData="battleItem.teams"
                        :bureauPage="pageNum"
                        :gamesNum="parseInt(matchData.number_of_games)"
                        :currentLast="currentLast"
                        :currentNext="currentNext"
                        @blockedOut="blockedOut"
                    ></head-tab>
                    <div class="cont">
                        <score-view
                            :teamsData="battleItem.teams"
                            :roundTime="battleItem.round_time"
                            :sideData="battleItem.round_detail[battleItem.round_detail.length-1].side"
                        ></score-view>
                        <player-view
                            :teamsData="battleItem.teams"
                            :battleStatus="item.battle_status"
                            :roundData="battleItem.round_detail"
                            :sideData="battleItem.round_detail[battleItem.round_detail.length-1].side"
                        ></player-view>
                        <team-view
                            :roundData="battleItem.round_detail"
                            :teamsData="battleItem.teams"
                            :sideData="battleItem.round_detail[battleItem.round_detail.length-1].side"
                            :overTime="battleItem.round_detail.length>30"
                        ></team-view>
                    </div>
                </div>
            </div>
        </div>
	</section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")            // 头部切换
    const scoreView = ()=> import("@/components/game/modules/csgo/score")       // 比分
    const playerView = ()=> import("@/components/game/modules/csgo/player")     // 队伍经济
    const teamView = ()=> import("@/components/game/modules/csgo/team")         // 战队

    import { getBattleByDubai } from "@/scripts/request.js"
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
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,       // 当前第几局
                currentLast: 0,
                currentNext: 0,
                battleItem: null,
			}
        },
        created() {
            if(this.battleData.length>0) {
                if ( localStorage.getItem('ongoing') ) {
                    this.pageNum = this.battleData.length
                    this.currentIndex = this.battleData.length - 1
                    this.getBattle(this.battleData[this.currentIndex].battle_id)
                    if( this.pageNum > 1 && this.pageNum <= parseInt(this.matchData.number_of_games) ) {
                        this.currentLast = 1
                        this.currentNext = 0
                    }
                } else {
                    this.getBattle(this.battleData[0].battle_id)
                    this.currentNext = 1
                }
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
                    } else {
                        this.getBattle(this.battleData[this.currentIndex].battle_id)
                    }
                    if( parseInt(this.matchData.number_of_games) >= this.pageNum) {
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
                    } else {
                        this.getBattle(this.battleData[this.currentIndex].battle_id)
                    }
                    if( this.pageNum === 1) {
                        this.currentLast = 0
                        this.currentNext = 1
                    }
                }
            },
            getBattle(battleId) {
                let _this = this
                let params = {
                    battle_id: battleId
                }
                getBattleByDubai(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            _this.battleItem = res.data
                            _this.sortTeam()
                        }
                    }
                })
            },
            sortTeam() {
                this.battleItem.teams.forEach(e => {
                    this.battleItem.score.forEach(i => {
                        if(e.team_id === i.team_id) {
                            e.team_snapshot = i.team_snapshot
                        }
                    })
                })
                if(this.battleItem.teams[0].starting_side !== 'ct') {
                    this.battleItem.teams.reverse()
                }
            }
        },
        watch: {
            battleData(old,val) {
                this.getBattle(this.battleData[this.currentIndex].battle_id)
                if(val.length > old.length) {
                    this.pageNum = this.battleData.length
                    this.currentIndex = this.battleData.length -1
                }
                if ( localStorage.getItem('ongoing') ) {
                    if( this.pageNum > 1 && this.pageNum <= parseInt(this.matchData.number_of_games) ) {
                        this.currentLast = 1
                        this.currentNext = 0
                    }
                }
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
            scoreView,
            playerView,
            teamView
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
        .cont {
            padding: 0 8px;
        }
    }
</style>