<template>
    <div class="process">
        <div class="block" :style="{'background-color': mode ? '#4F4F4F' : '#fff'}">
            <div class="day flex flex_nowrap">
                <div v-for="(item,index) in processList" :key="index"
                    :class="{active: index === currentIndex}"
                    @click="getDay(index)"
                >第{{index+1}}天</div>
            </div>
            <div class="tournament" v-for="(item,index) in processList" :key="index">
                <div class="list" v-if="index === currentIndex">
                    <div class="item flex flex_around flex_only_center" 
                        v-for="s in item" :key="s.match_id">
                        <div class="time">
                            <p>{{s.scheduled_begin_time.slice(0,5)}}</p>
                            <p>{{s.scheduled_begin_day}}</p>
                        </div>
                        <div class="team flex flex_center">
                            <div class="flex flex_only_center">
                                <img :src="s.master_team_image">
                                <p class="beyond-ellipsis">{{s.master_team_name}}</p>
                            </div>
                            <div class="score flex flex_only_center">
                                <p>{{s.master_team_score}}</p>
                                <p>{{s.guests_team_score}}</p>
                            </div>
                            <div class="flex flex_only_center">
                                <p class="beyond-ellipsis" style="text-align:right;">{{s.guests_team_name}}</p>
                                <img :src="s.guests_team_image">
                            </div>
                        </div>
                        <div class="statu">{{s.status}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { tournamentProduct, tournamentProcess } from "@/scripts/request"
    import { getUrlParam } from '@/scripts/utils'

    export default {
        name: 'process',
        data() {
            return {
                mode: 0,
                currentIndex: 0,
                processList: []
            }
        },
        mounted () {
            this.mode = parseInt(getUrlParam('c')) === 2 ? 1 : 0
            this.getProduct()
        },
        methods: {
            getProduct() {
                let _this = this
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                tournamentProduct(params).then(res => {
                    if(res.code === 200) {
                        _this.getProcess(res.data.game_id, res.data.tournament_id)
                    }
                })
            },
            getProcess(gameId,tournamentId) {
                let _this = this
                let params = {
                    game_id: gameId,
                    tournament_id: tournamentId
                }
                tournamentProcess(params).then(res => {
                    if(res.code === 200) {
                        _this.processList = res.data
                    }
                })
            },
            getDay(index) {
                this.currentIndex = index
            }
        }
    }
</script>

<style lang="less" scoped>
    .process {
        .block {
            padding: 5px;
            min-height: 270px;
            box-sizing: border-box;
            .day {
                width: 100%;
                height: 30px;
                overflow-x: scroll;
                overflow-y: hidden;
                white-space: nowrap;
                div {
                    height: 25px;
                    color: #333;
                    padding: 0 10px;
                    font-size: 14px;
                    line-height: 25px;
                    text-align: center;
                    box-sizing: border-box;
                    border: 1px solid #333;
                    border-left: 0;
                    &:first-child {
                        border-left: 1px solid #333;
                        border-radius: 5px 0 0 5px;
                    }
                    &:last-child {
                        border-radius: 0 5px 5px 0;
                    }
                    &.active {
                        color: #999;
                        background-color: #333;
                    }
                }
            }
            .tournament {
                color: #fff;
                .list {
                    .item {
                        width: 100%;
                        height: 40px;
                        margin-top: 5px;
                        border-radius: 5px;
                        background-color: #333;
                        .time {
                            color: #CECECE;
                            font-size: 12px;
                            text-align: center;
                            p:nth-child(1) {
                                color: #fff;
                                font-size: 16px;
                            }
                        }
                        .team {
                            font-size: 14px;
                            img {
                                width: 20px;
                                height: 20px;
                                margin: 0 5px;
                            }
                            p {
                                width: 40px;
                            }
                            .score {
                                p {
                                    width: 18px;
                                    height: 23px;
                                    margin: 0 3px;
                                    font-size: 22px;
                                    font-weight: 600;
                                    line-height: 23px;
                                    border-radius: 2px;
                                    text-align: center;
                                    background: linear-gradient(0deg, #1A52CC 0%, #467CF3 100%);
                                }
                            }
                        }
                        .statu {
                            width: 68px;
                            height: 22px;
                            color: #B29873;
                            line-height: 22px;
                            border-radius: 3px;
                            text-align: center;
                            border: 1px solid #B29873;
                        }
                    }
                }
            }
        }
    }
</style>