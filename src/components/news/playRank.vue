<template>
    <div class="play-rank">
        <div :class="['rank',{'night-mode': mode}]"
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
            <el-dropdown trigger="click" @command="changeCompany" style="margin-left:10px;">
                <p class="el-dropdown-link flex flex_between flex_only_center">
                    <span>{{selectType}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="item in dropDownList"
                        :key="item.val"
                        :command="item.name_cn + '-' + item.val"
                    >{{item.name_cn}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="player flex flex_between" v-for="item in rankingList" :key="item.player_id">
                <div class="img" :title="item.player_nick_name">
                    <img :src="item.champion_image">
                    <span>{{item.level}}</span>
                </div>
                <div class="num flex flex_column flex_between">
                    <div :class="['flex flex_between',{
                        blue: item.faction === 'blue',
                        red: item.faction === 'red'
                    }]">
                        <p>{{item.champion_name}}</p>
                        <p>{{parseInt(item.count) || 0}}</p>
                    </div>
                    <progress-data
                        :isRevolve="false"
                        :colorData="0"
                        :progressColor="item.faction === 'blue'?'#457CF4':'#FF4645'"
                        :progressData="parseInt(item.count)>5000?parseInt(item.count)/300:parseInt(item.count)<20?parseInt(item.count)*5:parseInt(item.count)/20 || 0"
                    ></progress-data>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    const headTab = ()=> import("@/components/game/modules/headTab")
    const progressData = ()=> import("@/components/common/progress")
    import { newMatch, newBattle, lolDataRank } from "@/scripts/request"
    import { getUrlParam } from '@/scripts/utils'

    export default {
        name: 'rank',
        data() {
            return {
                mode: 0,
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,       // 当前第几局
                battleItem: null,
                currentLast: 0,
                currentNext: 1,
                gameId: 0,
                rankingList: [],
                selectType: '当前经济',
                rankingInfo: 1,
                dropDownList: [
                    {
                        val: 1,
                        name_cn: '当前经济'
                    },
                    {
                        val: 2,
                        name_cn: '补刀'
                    },
                    {
                        val: 3,
                        name_cn: '分均补刀'
                    },
                    {
                        val: 4,
                        name_cn: '分均金钱'
                    },
                    {
                        val: 5,
                        name_cn: '分均经验'
                    },
                    {
                        val: 6,
                        name_cn: '分均伤害'
                    },
                    {
                        val: 7,
                        name_cn: '分均承伤'
                    },
                    {
                        val: 8,
                        name_cn: '插眼/排眼'
                    }
                ]
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
                            _this.getLolDataRank(_this.battleData[_this.currentIndex].battle_id,res.data.game_id)
                        }
                        else {
                            _this.getBattle(_this.battleData[0].battle_id)
                            _this.getLolDataRank(_this.battleData[0].battle_id,res.data.game_id)
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
            getLolDataRank(battleId,gameId)  {
                let _this = this
                let params = {
                    game_id: gameId,
                    battle_id: battleId,
                    ranking_info: _this.rankingInfo
                }
                lolDataRank(params).then( res => {
                    if(res.code === 200) {
                        _this.rankingList = res.data
                    }
                })
            },
            changeCompany(data) {
                this.selectType = data.split("-")[0]
                this.rankingInfo = data.split("-")[1]
                this.getLolDataRank(this.battleData[this.currentIndex].battle_id,this.gameId)
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
                        this.getLolDataRank(this.battleData[this.currentIndex].battle_id,this.gameId)
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
                        this.getLolDataRank(this.battleData[this.currentIndex].battle_id,this.gameId)
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
            progressData
        }
    }
</script>

<style lang="less" scoped>
    .play-rank {
        .rank {
            width: 100%;
            padding-bottom: 10px;
            .player {
                padding: 0 55px;
                margin-top: 5px;
                .img {
                    width: 25px;
                    height: 25px;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    span {
                        color: #fff;
                        padding: 0 2px;
                        font-size: 12px;
                        transform: scale(0.7);
                        background-color: rgba(0,0,0,.7);
                        position: absolute;
                        right: -3px;
                        bottom: -3px;
                    }
                }
                .num {
                    width: 230px;
                    height: 27px;
                    .blue {
                        color: #457CF4;
                    }
                    .red {
                        color: #FF4645;
                    }
                }
            }
        }
    }
</style>