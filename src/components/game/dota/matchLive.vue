<template>
    <section>
        <div v-if="battleData.length === 0" 
            class="match-before"
            :style="{
                'width': definedStyle.widthData,
                'height': definedStyle.heightData,
                'background-color': definedStyle.colorData
        }">
            <p class="name">{{matchData.tournament_name}}</p>
            <p class="time">{{durationDate(matchData.begin_at)}}</p>
            <p class="bo">BO{{matchData.number_of_games}}</p>
            <div class="flex flex_around">
                <div class="team flex">
                    <div class="flex flex_column flex_only_center">
                        <img :src="matchData.blue_team_image">
                        <p>{{matchData.blue_teams}}</p>
                    </div>
                    <div class="blue">B</div>
                </div>
                <div class="vs"> VS </div>
                <div class="team flex">
                    <div class="red">R</div>
                    <div class="flex flex_column flex_only_center">
                        <img :src="matchData.red_team_image">
                        <p>{{matchData.red_teams}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div :class="['match-live',{'night-mode':definedStyle.type}]"
                :style="{'width':definedStyle.widthData,
                        'height': definedStyle.heightData,
                        'background-color':definedStyle.colorData
                        }"
            >
                <head-tab :colorData="definedStyle.type"></head-tab>
                <battle>
                    <div slot="living" class="live">
                        <p>
                            <span>23</span>
                            <i></i>
                            <span>27</span>
                        </p>
                        <p class="num">35'24''</p>
                    </div>
                </battle>
                <div class="flex flex_between">
                    <role-list :roleData="roleData"></role-list>
                    <div>
                        <div class="flex flex_between">
                            <type-list 
                                :placeData="placeRight" 
                                :colorData="definedStyle.type"
                            ></type-list>
                            <type-list 
                                :placeData="placeLeft"
                                :colorData="definedStyle.type"
                            ></type-list>
                        </div>
                        <output-list
                            :barColor="barColorData"
                            :colorData="definedStyle.type"
                        ></output-list>
                    </div>
                    <role-list :roleData="roleData"></role-list>
                </div>
            </div>
        </div>
    </section>
	
</template>

<script>
    import headTab from '@/components/game/modules/headTab'       // 头部切换
    import battle from '@/components/game/modules/battle'         // 对局
    import typeList from '@/components/game/modules/typeList'     // 标签列表
    import roleList from '@/components/game/modules/roleList'     // 角色列表
    import outputList from '@/components/game/modules/outputList' // 输出占比

    import { rTime } from '@/scripts/utils'

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
                placeRight: true, // 位置是否右对齐
                placeLeft: false, // 位置是否左对齐
                barColorData: {   // 进度条颜色
                    left: '#3CAB3C',
                    right: '#D43F2F',
                },
                roleData: {       // 角色头像宽高
                    width: '40px',
                    height: '28px',
                    type: 'dota'
                }
			}
        },
        computed: {
            durationDate(date) {
                return function(date) {
                    return rTime(date)
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
                background-color: #3CAB3C;
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
            .num {
                color: #434343;
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