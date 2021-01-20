<template>
	<div class="index">
        <!-- csgo赛前 -->
        <cs-matchBefore
            v-if="parseInt(showType.gameId) === 1
            && parseInt(showType.matchStatu) === 2"
            :definedStyle="defined.csBeforeData"
            :battleData="showType.battleList"
        ></cs-matchBefore>
        <!-- csgo赛事 -->
        <cs-match-live
            v-if="parseInt(showType.gameId) === 1
            && parseInt(showType.matchStatu) === 1
            && parseInt(n) === 2"
            :definedStyle="defined.csLiveData"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></cs-match-live>
        <!-- csgo 迪拜样式 -->
        <db-match-live
            v-if="parseInt(showType.gameId) === 1
            && parseInt(showType.matchStatu) === 1
            && parseInt(n) === 1"
            :definedStyle="defined.csLiveData"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></db-match-live>
        <!-- lol dota2 赛前 -->
        <match-before 
            v-if="(parseInt(showType.gameId) === 2
            || parseInt(showType.gameId) === 3)
            && parseInt(showType.matchStatu) === 2"
            :definedStyle="defined.beforeData"
            :battleData="showType.battleList"
        ></match-before>
        <!-- lol赛事 -->
        <lol-match-live
            v-if="parseInt(showType.gameId) === 2
            && parseInt(showType.matchStatu) === 1"
            :definedStyle="defined.lolLiveData"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></lol-match-live>
        <!-- dota2赛事 -->
        <dota-match-live
            v-if="parseInt(showType.gameId) === 3
            && parseInt(showType.matchStatu) === 1"
            :definedStyle="defined.dotaLiveData"
            :battleData="showType.battleList"
            :matchData="showType.matchInfo"
        ></dota-match-live>
	</div>
</template>

<script>
    const matchBefore = ()=> import("@/components/game/lol/matchBefore")    // 赛事前
    const lolMatchLive = ()=> import("@/components/game/lol/matchLive")     // lol赛事
    const dotaMatchLive = ()=> import("@/components/game/dota/matchLive")   // dota2赛事
    const csMatchBefore = ()=> import("@/components/game/csgo/matchBefore") // csgo赛前
    const csMatchLive = ()=> import("@/components/game/csgo/matchLive")     // csgo赛事
    const dbMatchLive = ()=> import("@/components/game/csgo/matchLiveDB")   // csgo赛事 迪拜样式

    import { getBattle, getBattleT } from "@/scripts/request.js"  // 请求方法
    import { getUrlParam } from '@/scripts/utils'                 // 获取页面参数方法
	export default {
        name: 'index',
		data() {
			return {
                defined: {},        // 背景模式
                showType: {         // 页面显示条件
                    gameId: 0,      // 1:csgo, 2:lol, 3:dota2
                    matchStatu: '', // 赛事状态: 赛前 赛后
                    battleList: [], // 对局列表
                    matchInfo: {}   // 显示比赛
                },
                n: getUrlParam('n'),
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
                        beforeData: {
                            type: 1,           // 开启背景模式，0为浅色，1为深色
                            colorData: '#181818', // 深色背景：1E1E27
                            widthData: '826px',
                            heightData: '262px',
                        },
                        lolLiveData: {
                            type: 1,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#181818',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        dotaLiveData: {
                            type: 1,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#181818',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        csBeforeData: {
                            type: 1,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#181818',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        csLiveData: {
                            type: 1,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#181818',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        }
                    }
                } else {
                    _this.defined = {
                        beforeData: {
                            type: 0,           // 开启背景模式，0为浅色，1为深色
                            colorData: '#fff', // 深色背景：1E1E27
                            widthData: '826px',
                            heightData: '262px',
                        },
                        lolLiveData: {
                            type: 0,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#fff',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        dotaLiveData: {
                            type: 0,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#fff',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        csBeforeData: {
                            type: 0,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#fff',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        },
                        csLiveData: {
                            type: 0,          // 开启背景模式，0为浅色，1为深色
                            colorData: '#fff',// 深色背景：1E1E27
                            widthData: '360px',
                            heightData: '260px',
                        }
                    }
                }
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                let t = getUrlParam('t')
                if(parseInt(t) === 1) {
                    getBattleT(params).then(res => {
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
                } else {
                    getBattle(params).then(res => {
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
            }
        },
        components: {
            matchBefore,
            lolMatchLive,
            dotaMatchLive,
            csMatchBefore,
            csMatchLive,
            dbMatchLive
        }
	}
</script>

<style lang="less" scoped>
    
</style>