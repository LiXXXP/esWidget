 <template>
	<section>
         <div v-for="(item,index) in battleData" 
            :key="item.battle_id">
            <div v-if="index === currentIndex"
                :class="[
                    'cs-live',
                    {'night-mode':definedStyle.type}]"
                :style="{
                    'width':definedStyle.widthData,
                    'height': definedStyle.heightData,
                    'background-color':definedStyle.colorData}"
            >
                <head-tab 
                    :colorData="definedStyle.type"
                    :headData="item.score"
                    :factionsData="item.battle_detail.teams"
                    :bureauPage="pageNum"
                    @blockedOut="blockedOut"
                ></head-tab>
                <battle
                    :battleData="item.score"
                    :factionsData="item.battle_detail.teams"
                    :winerId="item.battle_detail.winner.team_id"
                >
                    <div slot="left-info" class="left-info flex flex_start">
                        <div class="flex flex_column flex_center">
                            <p>{{item.battle_detail.teams[0].first_half_score || 0}}</p>
                            <p>{{item.battle_detail.teams[0].second_half_score || 0}}</p>
                        </div>
                        <div class="circle flex flex_column flex_center">
                            <p :class="[item.battle_detail.teams[0].starting_side === 'ct' ? 'ct':'t']">
                                {{item.battle_detail.teams[0].starting_side === 'ct' ? 'CT':'T'}}
                            </p>
                            <p :class="[item.battle_detail.teams[0].starting_side === 'ct' ? 't':'ct']">
                                {{item.battle_detail.teams[0].starting_side === 'ct' ? 'T':'CT'}}
                            </p>
                        </div>
                    </div>
                    <div slot="living" class="live">
                        <p>{{item.battle_detail.teams[0].score || 0}}:{{item.battle_detail.teams[1].score || 0}}</p>
                        <p class="num">{{item.battle_detail.winner.team_snapshot.short_name}}</p>
                    </div>
                    <div slot="right-info" class="right-info flex flex_start">
                        <div class="circle flex flex_column flex_center">
                            <p :class="[item.battle_detail.teams[1].starting_side === 'ct' ? 'ct':'t']">
                                {{item.battle_detail.teams[1].starting_side === 'ct' ? 'CT':'T'}}
                            </p>
                            <p :class="[item.battle_detail.teams[1].starting_side === 'ct' ? 't':'ct']">
                                {{item.battle_detail.teams[1].starting_side === 'ct' ? 'T':'CT'}}
                            </p>
                        </div>
                        <div class="flex flex_column flex_center">
                            <p>{{item.battle_detail.teams[1].first_half_score || 0}}</p>
                            <p>{{item.battle_detail.teams[1].second_half_score || 0}}</p>
                        </div>
                    </div>
                </battle>
                <div class="type flex flex_between">
                    <type-list 
                        :placeData="place.right" 
                        :colorData="definedStyle.type"
                        :typeList="item.battle_detail.special_events.typeList"
                        :sideData="item.battle_detail.teams[0].starting_side"
                    ></type-list>
                    <type-list 
                        :placeData="place.left"
                        :colorData="definedStyle.type"
                        :typeList="item.battle_detail.special_events.typeList"
                        :sideData="item.battle_detail.teams[1].starting_side"
                    ></type-list>
                </div>
                <level-block
                    :colorData="definedStyle.type"
                    :levelData="item.battle_detail.rounds_detail"
                ></level-block>
            </div>
         </div>
	</section>
</template>

<script>
    const headTab = ()=> import("@/components/game/modules/headTab")            // 头部切换
    const battle = ()=> import("@/components/game/modules/battle")              // 对局
    const typeList = ()=> import("@/components/game/modules/typeList")          // 标签列表
    const levelBlock = ()=> import("@/components/game/modules/csgo/levelBlock") // 场次

	export default {
        props: {
            definedStyle: {  // 定义样式
                type: Object,
                default: null
            },
            battleData: {     // 对局数据
                type: Array,
                default: []
            }
        },
		data() {
			return {
                place: {
                    right: true, // 位置是否右对齐
                    left: false  // 位置是否左对齐
                },
                currentIndex: 0,  // 当前显示页index
                pageNum: this.battleData.length  // 当前第几局
			}
        },
        created() {
            this.getTypeList()
        },
        methods: {
            // 展示页切换（子传父）
            blockedOut(type) {
                // 下一局
                if(type === 'next') {
                    this.pageNum -= 1
                    this.currentIndex += 1
                    if(this.currentIndex > (this.battleData.length - 1)) {
                        this.currentIndex = this.battleData.length -1
                        this.pageNum = 1
                        return false
                    }
                }
                // 上一局
                if(type === 'last') {
                    this.pageNum += 1
                    this.currentIndex -= 1
                    if(this.currentIndex < 0) {
                        this.currentIndex = 0
                        this.pageNum = this.battleData.length
                        return false
                    } 
                }
            },
            getTypeList() {
                for(let item of this.battleData) {
                    // 特殊事件列表
                    item.battle_detail.special_events.typeList = [
                        {
                            text: '先5',
                            type: 'first_to_5_rounds_wins',
                            side: item.battle_detail.special_events.first_to_5_rounds_wins.side
                        },
                        {
                            text: '1回合胜',
                            type: 'win_round_1',
                            side: item.battle_detail.special_events.win_round_1.side
                        },
                        {
                            text: '16回合胜',
                            type: 'win_round_16',
                            side: item.battle_detail.special_events.win_round_16.side
                        }
                    ]
                }
            }
        },
        watch: {
            battleData(old,val) {
                this.getTypeList()
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
    .cs-live {
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