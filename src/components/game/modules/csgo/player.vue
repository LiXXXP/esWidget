<template>
    <div class="player">
        <div class="bar flex flex_between flex_only_center">

            <div 
                :class="['list flex flex_between',{
                    blue: sideData[0].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    yellow: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist',
                    reverse: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
                :style="{'width': `${344/(teamsData[0].totalMoney + teamsData[1].totalMoney)*teamsData[0].totalMoney}%`}"
            >
                <p 
                    v-if="teamsData[0].totalMoney/(teamsData[0].totalMoney + teamsData[1].totalMoney)>.2"
                >{{teamsData[0].team_snapshot.name}}</p>

                <p 
                    v-if="teamsData[0].totalMoney/(teamsData[0].totalMoney + teamsData[1].totalMoney)>.2"
                >${{teamsData[0].totalMoney}}</p>
            </div>

            <div 
                :class="['list flex flex_between flex_row_reverse',{
                    yellow: sideData[1].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist',
                    blue: sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    reverse: sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct'
                }]"
                :style="{'width': `${344/(teamsData[0].totalMoney + teamsData[1].totalMoney)*teamsData[1].totalMoney}%`}"
            >
                <p 
                    v-if="teamsData[1].totalMoney/(teamsData[0].totalMoney + teamsData[1].totalMoney)>.2"
                >{{teamsData[1].team_snapshot.name}}</p>

                <p 
                    v-if="teamsData[1].totalMoney/(teamsData[0].totalMoney + teamsData[1].totalMoney)>.2"
                >${{teamsData[1].totalMoney}}</p>
            </div>
        </div>
        <div class="bar flex flex_between flex_only_center" 
            v-for="item in playerList" :key="item.name1"
        >
            <div :class="['list flex flex_between',{
                    blue: sideData[0].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    yellow: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist',
                    reverse: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
                :style="{'width':item.money1 + item.money2 === 0 ?'50%': `${344/(item.money1 + item.money2)*item.money1}%`}"
            >
                <div class="flex flex_only_center">
                    <p 
                        v-if="item.money1/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0"
                    >{{item.name1}}</p>
                    <i 
                        class="h l" 
                        v-if="(item.money1/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0) &&
                                item.isMulti1 && !item.isDied1 && battleStatus !== 'completed'"
                    ></i>
                </div>
                
                <p 
                    v-if="item.money1/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0"
                >${{item.money1}}</p>

                <i 
                    class="x l" 
                    v-if="(item.money1/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0) && item.isDied1"
                ></i>

                
            </div>

            <div :class="['list flex flex_between flex_row_reverse',{
                    blue: sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    yellow: sideData[1].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist',
                    reverse: sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct'
                }]"
                :style="{'width': item.money1 + item.money2 === 0 ?'50%': `${344/(item.money1 + item.money2)*item.money2}%`}"
            >
                <div class="flex flex_only_center">
                    <i 
                        class="h r" 
                        v-if="(item.money2/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0) && 
                            item.isMulti2 && !item.isDied2 && battleStatus !== 'completed'"
                    ></i>
                    <p 
                        v-if="item.money2/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0"
                    >{{item.name2}}</p>
                </div>
                
                <p 
                    v-if="item.money2/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0"
                >${{item.money2}}</p>

                <i 
                    class="x r" 
                    v-if="(item.money2/(item.money1 + item.money2)>.2 || item.money1 + item.money2 === 0) && item.isDied2"
                ></i>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            teamsData: {
                type: Array,
                default: () => []
            },
            roundData: {
                type: Array,
                default: () => []
            },
            battleStatus: {
                type: String,
                default: ''
            },
            sideData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                playerList: [],
                side:[]
            }
        },
        created() {
            this.getTotal()
            this.roundDetail()
        },
        methods: {
            getTotal() {
                for(let item of this.teamsData) {
                    let arr = item.players
                    arr.sort((a, b) => {return b.money - a.money})
                    let total = arr.reduce((pre,item) => {
                        return pre + item.money
                    },0)
                    item.totalMoney = total
                }
                for(let i in this.teamsData[0].players) {
                    this.playerList[i] = {
                        name1: this.teamsData[0].players[i].player.nick_name,
                        player1id: this.teamsData[0].players[i].player.player_id,
                        money1: this.teamsData[0].players[i].money,
                        name2: this.teamsData[1].players[i].player.nick_name,
                        player2id: this.teamsData[1].players[i].player.player_id,
                        money2: this.teamsData[1].players[i].money,
                    }
                }
            },
            roundDetail() {
                this.playerList.map(e => {
                    let roundLength = this.roundData.length
                    for(let s of this.roundData[roundLength-1].side) {
                        s.players.filter(item => {
                            if(e.player1id === item.player.player_id) {
                                e.isDied1 = item.is_died
                                e.isMulti1 = item.headshot_kills || item.is_multi_kill
                            }
                            if(e.player2id === item.player.player_id) {
                                e.isDied2 = item.is_died
                                e.isMulti2 = item.headshot_kills || item.is_multi_kill
                            }
                        })
                    }
                })
            }
        },
        watch: {
            teamsData() {
                this.getTotal()
            },
            roundData() {
                this.roundDetail()
            }
        }
    }
</script>

<style lang="less" scoped>
    .player {
        color: #fff;
        overflow: hidden;
        margin-bottom: 8px;
        .bar {
            width: 100%;
            margin-bottom: 2px;
            .list {
                height: 18px;
                padding: 0 3px;
                line-height: 18px;
                box-sizing: border-box;
                transition: width .3s linear;
                position: relative;
                p {
                    font-size: 12px;
                }
                i {
                    position: absolute;
                    &.x {
                        width: 16px;
                        height: 16px;
                        display: block;
                        background: url('../../../../assets/imgs/csgo/x.png') no-repeat 0 0;
                        background-size: 100%;
                        top: 1px;
                        &.l {
                            left: 10px;
                        }
                        &.r {
                            right: 10px;
                        }
                    }
                    &.h {
                        width: 16px;
                        height: 16px;
                        display: block;
                        background: url('../../../../assets/imgs/csgo/hot.gif') no-repeat 0 0;
                        background-size: 100%;
                        position: static;
                        &.l {
                            margin-left: 10px;
                        }
                        &.r {
                            margin-right: 10px;
                        }
                    }
                }
                &.blue {
                    background: linear-gradient(90deg, #01448A, #005D97, #1F9CEA);
                    &.reverse {
                        background: linear-gradient(-90deg, #01448A, #005D97, #1F9CEA);
                    }
                }
                &.yellow {
                    background: linear-gradient(90deg, #D0B226, #C6A800, #B47F00);
                    &.reverse {
                        background: linear-gradient(-90deg, #D0B226, #C6A800, #B47F00);
                    }
                }
            }
        }
    }
</style>