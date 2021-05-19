<template>
	<div class="index">
        <!-- lol dota2 赛前 -->
        <match-before 
            v-if="(parseInt(showType.gameId) === 2
            || parseInt(showType.gameId) === 3)
            && parseInt(showType.matchStatu) === 2"
            :definedStyle="defined.backGround"
            :battleData="showType.battleList"
        ></match-before>
        <!-- lol赛事 -->
        <lol-match-live
            v-if="parseInt(showType.gameId) === 2
            && parseInt(showType.matchStatu) === 1"
            :definedStyle="defined.backGround"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></lol-match-live>
        <!-- dota2赛事 -->
        <dota-match-live
            v-if="parseInt(showType.gameId) === 3
            && parseInt(showType.matchStatu) === 1"
            :definedStyle="defined.backGround"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></dota-match-live>
        <!-- csgo赛前 -->
        <cs-matchBefore
            v-if="parseInt(showType.gameId) === 1
            && parseInt(showType.matchStatu) === 2"
            :definedStyle="defined.backGround"
            :battleData="showType.battleList"
        ></cs-matchBefore>
        <!-- csgo赛事 -->
        <cs-match-live
            v-if="parseInt(showType.gameId) === 1
            && parseInt(showType.matchStatu) === 1"
            :definedStyle="defined.backGround"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></cs-match-live>
	</div>
</template>

<script>
    const matchBefore = ()=> import("@/components/game/lol/matchBefore")        // 赛事前
    const lolMatchLive = ()=> import("@/components/game/lol/newMatchLive")      // lol赛事
    const dotaMatchLive = ()=> import("@/components/game/dota/newMatchLive")    // dota2赛事
    const csMatchBefore = ()=> import("@/components/game/csgo/matchBefore")     // csgo赛前
    const csMatchLive = ()=> import("@/components/game/csgo/newMatchLive")      // csgo赛事

    import { newMatch } from "@/scripts/request.js"  // 请求方法
    import { getUrlParam } from '@/scripts/utils'    // 获取页面参数方法
	export default {
        name: 'indexnew',
		data() {
			return {
                defined: {},        // 背景模式
                showType: {         // 页面显示条件
                    gameId: 0,      // 1:csgo, 2:lol, 3:dota2
                    matchStatu: '', // 赛事状态: 赛前 赛后
                    battleList: [], // 对局列表
                    matchInfo: {}   // 显示比赛
                },
                timer: null,        // 定义的轮询
			}
        },
        mounted() {
            this.getMatch()
            let _this = this
            this.timer = setInterval( () => {
                _this.getMatch()
            }, 5000)
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            getMatch() {
                let _this = this
                _this.showType.matchStatu = getUrlParam('m')
                let c = getUrlParam('c')
                if ( parseInt(c) === 2) {
                    _this.defined = {
                        backGround: {
                            type: 1,           // 深色
                            colorData: '#181818',
                        }
                    }
                } else {
                    _this.defined = {
                        backGround: {
                            type: 0,           // 浅色
                            colorData: '#fff',
                        }
                    }
                }
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                let t = getUrlParam('t')
                newMatch(params).then(res => {
                    if(res.code === 200) {
                        _this.showType.gameId = res.data.game_id
                        _this.showType.matchInfo = res.data.match_info
                        if(res.data.battle_list.length > 0) {
                            _this.showType.battleList = res.data.battle_list.reverse()
                            if( res.data.match_status === 'completed' && res.data.battle_list[0].battle_status === 'completed') {
                                clearInterval(_this.timer)
                                localStorage.clear()
                            } else {
                                localStorage.setItem('ongoing',true)
                            }
                        }
                    }
                    else {
                        clearInterval(_this.timer)
                    }
                })
            }
        },
        components: {
            matchBefore,
            lolMatchLive,
            dotaMatchLive,
            csMatchBefore,
            csMatchLive
        }
	}
</script>

<style lang="less" scoped>
    
</style>