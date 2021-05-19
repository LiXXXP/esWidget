<template>
    <div class="play-diff">
        <div :class="['chart',{'night-mode': mode}]"
            :style="{'background-color': mode ? '#181818' : '#fff'}" v-if="battleItem!==null">
            <head-tab
                :colorData="mode"
                :headData="battleItem.score"
                :factionsData="battleItem.battle_detail.factions"
                :bureauPage="pageNum"
                :gamesNum="battleData.length"
                :currentLast="currentLast"
                :currentNext="currentNext"
                @blockedOut="blockedOut"
            ></head-tab>
            <ve-line
                width="360px"
                height="300px"
                :data="chartData"
                :extend="chartExtend"
                :settings="chartSettings"
            ></ve-line>
        </div>
    </div>
</template>

<script>

    const headTab = ()=> import("@/components/game/modules/headTab")
    import VeLine from 'v-charts/lib/line.common'
    import { newMatch, newBattle, lolDiff } from "@/scripts/request"
    import { getUrlParam, formatLine } from '@/scripts/utils'

    export default {
        name: 'diff',
        data() {
            this.chartExtend = {
                series: {
                    label: {
                        show: false,
                        position: 'top'
                    }
                },
                color: [ '#468EF9', '#2F3959' ],
            }
            this.chartSettings = {
                metrics: ['经济差', '经验差'],
                dimension: ['time']
            }
            return {
                mode: 0,
                chartData: {
                    columns: ['日期', '经济差', '经验差'],
                    rows: []
                },
                battleData: [],
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,       // 当前第几局
                battleItem: null,
                currentLast: 0,
                currentNext: 1,
                gameId: 0 
            }
        },
        mounted () {
            this.mode = parseInt(getUrlParam('c')) === 2 ? 1 : 0
            this.getMatch()
        },
        methods: {
            getMatch() {
                let _this = this
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                newMatch(params).then(res => {
                    if(res.code === 200) {
                        _this.battleData = res.data.battle_list.reverse()
                        _this.gameId = res.data.game_id
                        if ( localStorage.getItem('ongoing') ) {
                            _this.pageNum = _this.battleData.length
                            _this.currentIndex = _this.battleData.length -1
                            _this.getBattle(_this.battleData[_this.currentIndex].battle_id)
                            _this.getLolGoldDiff(_this.battleData[_this.currentIndex].battle_id,res.data.game_id)
                        }
                        else {
                            _this.getBattle(_this.battleData[0].battle_id)
                            _this.getLolGoldDiff(_this.battleData[_this.currentIndex].battle_id,res.data.game_id)
                        }
                    }
                })
            },
            getBattle(battleId) {
                let _this = this
                let params = {
                    battle_id: battleId
                }
                newBattle(params).then(res => {
                    if(res.code === 200) {
                        _this.battleItem = res.data
                    }
                })
            },
            getLolGoldDiff(battleId,gameId) {
                let _this = this 
                let params = {
                    game_id: gameId,
                    battle_id: battleId
                }
                lolDiff(params).then( res => {
                    if(res.code === 200) {
                        _this.chartData.rows = []
                        res.data.gold_diff_timeline.forEach((e,i) => {
                            let rowItem = {
                                'time': formatLine(e.ingame_timestamp),
                                '经济差': parseInt(e.gold_diff) || 0,
                                '经验差': res.data.experience_diff_timeline.length>0?parseInt(res.data.experience_diff_timeline[i].experience_diff) : 0
                            }
                            _this.chartData.rows.push(rowItem)
                        })
                    }
                })
            },
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
                        this.getLolGoldDiff(this.battleData[this.currentIndex].battle_id,this.gameId)
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
                        this.getLolGoldDiff(this.battleData[this.currentIndex].battle_id,this.gameId)
                    }
                    this.currentLast = 1
                    if(parseInt(this.battleData.length) > this.pageNum) {
                        this.currentNext = 1
                    }
                    if( this.pageNum === 1) {
                        this.currentLast = 0
                    }
                }
            }
        },
        components: {
            headTab,
            VeLine
        }
    }
</script>

<style lang="less" scoped>
    .play-diff {

    }
</style>