<template>
	<div class="index">
        <!-- lol dota2 赛前 -->
        <match-before 
            v-if="(showType.gameId === '2'
            || showType.gameId === '3')
            && showType.matchStatu === 'Upcoming'"
            :definedStyle="beforeData"
            :battleData="showType.battleList"
        ></match-before>
        <!-- lol赛事 -->
        <lol-match-live
            v-if="showType.gameId === '2'
            && showType.matchStatu !== 'Upcoming'"
            :definedStyle="lolLiveData"
            :battleData="showType.battleList"
        ></lol-match-live>
        <!-- dota2赛事 -->
        <dota-match-live
            v-if="showType.gameId === '3'
            && showType.matchStatu !== 'Upcoming'"
            :definedStyle="dotaLiveData"
            :battleData="showType.battleList"
        ></dota-match-live>
        <!-- csgo赛前 -->
        <cs-matchBefore
            v-if="showType.gameId === '1'
            && showType.matchStatu === 'Upcoming'"
            :definedStyle="csBeforeData"
            :battleData="showType.battleList"
        ></cs-matchBefore>
        <!-- csgo赛事 -->
        <cs-match-live
            v-if="showType.gameId === '1'
            && showType.matchStatu !== 'Upcoming'"
            :definedStyle="csLiveData"
            :battleData="showType.battleList"
        ></cs-match-live>
	</div>
</template>

<script>
    const matchBefore = ()=> import("@/components/game/lol/matchBefore")    // 赛事前
    const lolMatchLive = ()=> import("@/components/game/lol/matchLive")     // lol赛事
    const dotaMatchLive = ()=> import("@/components/game/dota/matchLive")   // dota2赛事
    const csMatchBefore = ()=> import("@/components/game/csgo/matchBefore") // csgo赛前
    const csMatchLive = ()=> import("@/components/game/csgo/matchLive")     // csgo赛事

    import { getBattle, getBattleT } from "@/scripts/request.js"  // 请求方法
    import { getUrlParam } from '@/scripts/utils'                 // 获取页面参数方法
	export default {
		data() {
			return {
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
                },
                showType: {         // 页面显示条件
                    gameId: 0,      // 1:csgo, 2:lol, 3:dota2
                    matchStatu: '', // 赛事状态: 赛前 赛后
                    battleList: []  // 对局列表
                }
			}
        },
        mounted() {
            let _this = this
            let keys = getUrlParam('keys')
            let t = getUrlParam('t')
            let params = {
                keys: keys
            }
            if(parseInt(t) === 1) {
                getBattleT(params).then(res => {
                    if(res.code === 200) {
                        _this.showType.gameId = res.data.game_id
                        _this.showType.matchStatu = res.data.match_status
                        _this.showType.battleList = res.data.battle_list
                    }
                })
            } else {
                getBattle(params).then(res => {
                    if(res.code === 200) {
                        _this.showType.gameId = res.data.game_id
                        _this.showType.matchStatu = res.data.match_status
                        _this.showType.battleList = res.data.battle_list
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