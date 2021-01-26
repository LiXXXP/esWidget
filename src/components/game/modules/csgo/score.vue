<template>
    <div class="score flex flex_between flex_only_center">
        <div class="vs flex flex_only_center" v-if="sideData.length!==0&&teamsData.length!==0">
            <p :class="[{
                    blue: sideData[0].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    yellow: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
            >{{teamsData[0].team_snapshot.name}}</p>
            <p>vs</p>
            <p :class="[{
                    blue: sideData[0].team_id === teamsData[1].team_id && sideData[0].side === 'ct',
                    yellow: sideData[1].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
            >{{teamsData[1].team_snapshot.name}}</p>
        </div>
        <div class="num" v-if="sideData.length!==0&&teamsData.length!==0">
            <span :class="[{
                    blue: sideData[0].team_id === teamsData[0].team_id && sideData[0].side === 'ct',
                    yellow: sideData[0].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
            >{{teamsData[0].score}}</span>
            <span>:</span>
            <span :class="[{
                    blue: sideData[0].team_id === teamsData[1].team_id && sideData[0].side === 'ct',
                    yellow: sideData[1].team_id === teamsData[1].team_id && sideData[1].side === 'terrorist'
                }]"
            >{{teamsData[1].score}}</span>
        </div>
        <div class="time flex flex_end flex_only_center">
            <p>{{durationTime(time)}}</p>
            <img src="../../../../assets/imgs/csgo/bomb.png">
        </div>
    </div>
</template>

<script>
    import { formatSecond } from '@/scripts/utils'

    export default {
        props: {
            teamsData: {
                type: Array,
                default: () => []
            },
            roundTime: {
                type: Object,
                default: () => {}
            },
            sideData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                time: 0,
            }
        },
        created() {
            this.getTime()
        },
        methods: {
            getTime() {
                if(this.roundTime.is_bomb_planted) {
                    this.time = this.roundTime.time_since_plant
                } else {
                    this.time = this.roundTime.round_time
                }
            }
        },
        computed: {
            durationTime(sec) {
                return function(sec) {
                    return formatSecond(sec)
                }
            },
        },
        watch: {
            roundTime() {
                this.getTime()
            }
        }
    }
</script>

<style lang="less" scoped>
    @blue: #0091EC;
    @yellow: #CDB200;
    .score {
        color: #CFCFCF;
        font-size: 12px;
        margin-bottom: 6px;
        .blue {
            color: @blue;
        }
        .yellow {
            color: @yellow;
        }
        .vs {
            width: 110px;
            p {
                padding: 0 2px;
                padding-left: 0;
            }
        }
        .num {
            font-size: 20px;
            font-weight: 600;
            span {
                padding: 0 3px;
            }
        }
        .time {
            width: 110px;
            img {
                width: 14px;
                height: 15px;
                margin-left: 5px;
            }
        }
    }
</style>