<template>
    <div :class="['team flex flex_between',
        {flex_row_reverse: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'}]">
        <div :class="['flex flex_only_center',
            {flex_row_reverse: sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct'}]">
            <!-- 警匪选图的时候，双方要对着射；换边要换套对射的图 -->
            <img src="../../../../assets/imgs/csgo/02.png" class="head"
                v-if="sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct'">
            <img src="../../../../assets/imgs/csgo/03.png" class="head" v-else>
            <!--  -->
            <div class="flex flex_only_center">
                <img src="../../../../assets/imgs/big/sign01.png" class="icon">
                <p>{{events.cts_win}}</p>
            </div>
            <div class="flex flex_only_center">
                <img src="../../../../assets/imgs/big/sign02.png" class="icon">
                <p>{{events.target_saved}}</p>
            </div>
            <div class="flex flex_only_center">
                <img src="../../../../assets/imgs/big/sign03.png" class="icon">
                <p>{{events.bomb_defused}}</p>
            </div>
        </div>
        <div :class="['flex flex_only_center flex',
            {flex_row_reverse: sideData[1].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'}]">
            <!-- 警匪选图的时候，双方要对着射；换边要换套对射的图 -->
            <img src="../../../../assets/imgs/csgo/01.png" class="head" 
                v-if="sideData[1].team_id === teamsData[0].team_id && sideData[0].side === 'ct'">
            <img src="../../../../assets/imgs/csgo/04.png" class="head" v-else>
            <!--  -->
            <div class="flex flex_only_center">
                <img src="../../../../assets/imgs/big/sign05.png" class="icon">
                <p>{{events.terrorists_win}}</p>
            </div>
            <div class="flex flex_only_center">
                <img src="../../../../assets/imgs/big/sign04.png" class="icon">
                <p>{{events.target_bombed}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            roundData: {
                type: Array,
                default: () => []
            },
            teamsData: {
                type: Array,
                default: () => []
            },
            sideData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                events: {}
            }
        },
        created() {
            this.getReduce()
        },
        methods: {
            getReduce() {
                if(this.teamsData[0].team_id === this.sideData[0].team_id) {
                    this.count(this.roundData)
                } else {
                    this.count(this.roundData)
                }
            },
            count(arr) {
                this.events = {
                    'cts_win': 0,
                    'target_saved': 0,
                    'bomb_defused': 0,
                    'terrorists_win': 0,
                    'target_bombed': 0
                }
                for(let i = 0; i < arr.length; i++ ) {
                    for(let key in this.events) {
                        if(arr[i].win_type === key) {
                            this.events[key]++
                        }
                    }
                }
            }
        },
        watch: {
            roundData() {
                this.getReduce()
            }
        }
    }
</script>

<style lang="less" scoped>
    .team {
        color: #CFCFCF;
        p {
            padding-left: 2px;
            padding-right: 4px;
        }
        .head {
            width: 54px;
            height: 54px;
        }
        .icon {
            width: auto;
            height: 16px;
            padding-left: 5px;
        }
    }
</style>