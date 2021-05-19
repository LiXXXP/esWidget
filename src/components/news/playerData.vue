<template>
    <div class="player">
        <div v-if="battleItem&&teamList.length>0"
            :class="['chart',{'night-mode': mode}]"
            :style="{'background-color': mode ? '#181818' : '#fff'}">
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
            <table v-for="item in teamList" :key="item.team_id">
                <thead :class="[item.faction]">
                    <th class="team">
                        <div class="flex flex_center" :title="item.team_name" @click="gotoLink(item.team_id)">
                            <img :src="item.team_image">
                        </div>
                    </th>
                    <th>
                        <p>K/D/A</p> 
                        <p>KDA</p> 
                    </th>
                    <th>补刀</th>
                    <th>经济</th>
                    <th>伤害占比</th>
                    <th>承伤占比</th>
                    <th>参团率</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="key in item.players" :key="key.seed">
                        <td>{{key.champion_name}}</td>
                        <td>
                            <p>{{key.kills}} / {{key.deaths}} / {{key.assists}}</p>
                            <p :class="[item.faction]">{{key.kda}}</p>
                        </td>
                        <td>{{key.cs}}</td>
                        <td>{{key.gold_earned}}</td>
                        <td>{{parseInt(key.damage_percent_to_champions*100)}}%</td>
                        <td>{{parseInt(key.damage_taken_percent*100)}}%</td>
                        <td>{{parseInt(key.participation*100)}}%</td>
                        <td>
                            <div class="skill flex flex_center">
                                <div class="flex flex_only_center">
                                    <div v-for="summoner in key.summoner_spell" :key="summoner.summoner_spell_id" class="imgs">
                                        <img :src="summoner.summoner_spell_image" :title="summoner.summoner_spell_name">
                                    </div>
                                </div>
                                <div class="item flex flex_only_center">
                                    <div v-for="img in key.item" :key="img.item_id" class="imgs">
                                        <img :src="img.item_image" :title="img.item_name" v-if="!img.is_trinket">
                                    </div>
                                </div>
                                <div v-for="img in key.item" :key="img.item_id" class="trinket">
                                    <img :src="img.item_image" :title="img.item_name" v-if="img.is_trinket">
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    const headTab = ()=> import("@/components/game/modules/headTab")
    import { newMatch, newBattle, lolPlayer } from "@/scripts/request"
    import { getUrlParam } from '@/scripts/utils'

    export default {
        name: 'player',
        data() {
            return {
                mode: 0,
                teamList: [],
                currentIndex: 0,  // 当前显示页index
                pageNum: 1,       // 当前第几局
                battleItem: null,
                currentLast: 0,
                currentNext: 1,
                gameId: 0 
            }
        },
        mounted() {
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
                            _this.getplayerData(_this.battleData[_this.currentIndex].battle_id,res.data.game_id)
                        }
                        else {
                            _this.getBattle(_this.battleData[0].battle_id)
                            _this.getplayerData(_this.battleData[0].battle_id,res.data.game_id)
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
            getplayerData(battleId,gameId) {
                let _this = this
                let params = {
                    game_id: gameId,
                    battle_id: battleId
                }
                lolPlayer(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            _this.teamList = res.data.factions
                        } else {
                            _this.teamList = []
                        }
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
                        this.getplayerData(this.battleData[this.currentIndex].battle_id,this.gameId)
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
                        this.getplayerData(this.battleData[this.currentIndex].battle_id,this.gameId)
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
            headTab
        }
    }
</script>

<style lang="less" scoped>
    .player {
        table {
            margin-bottom: 10px;
            th {
                color: #fff;
                font-weight: 400;
                &:nth-child(1) {
                    text-align: left;
                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 3px;
                    }
                }
            }
            td {
                color: #666;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        thead {
            &.blue {
                background-color: #457CF4;
            }
            &.red {
                background-color: #FF4645;
            }
        }
        td {
            .blue {
                color: #457CF4;
            }
            .red {
                color: #FF4645;
            }
        }
        .skill {
            height: 35px;
            .imgs {
                width: 15px;
                height: 15px;
                margin-left: 3px;
                img {
                    width: 15px;
                    height: 15px;
                }
            }
            .item {
                width: 110px;
                margin: 0 5px;
            }
            .trinket {
                img {
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
</style>
