<template>
	<div class="index">
        <match-before 
            :definedStyle="beforeData"
        ></match-before>
        <lol-match-live
            :definedStyle="lolLiveData"
        ></lol-match-live>
        <dota-match-live
            :definedStyle="dotaLiveData"
        ></dota-match-live>
        <cs-matchBefore
            :definedStyle="csBeforeData"
        ></cs-matchBefore>
        <cs-match-live
            :definedStyle="csLiveData"
        ></cs-match-live>
	</div>
</template>

<script>
    import matchBefore from '@/components/game/lol/matchBefore'
    import lolMatchLive from '@/components/game/lol/matchLive'
    import dotaMatchLive from '@/components/game/dota/matchLive'
    import csMatchBefore from '@/components/game/csgo/matchBefore'
    import csMatchLive from '@/components/game/csgo/matchLive'
    import { getBattle } from "@/scripts/request.js"              // 请求方法
    import { getUrlParam } from '@/scripts/utils'
	export default {
		data() {
			return {
                beforeData: {
                    type: 0,          // 开启背景模式，0为浅色，1为深色
                    colorData: '#fff',
                    widthData: '826px',
                    heightData: '262px',
                },
                lolLiveData: {
                    type: 1,          // 开启背景模式，0为浅色，1为深色
                    colorData: '#1E1E27',
                    widthData: '360px',
                    heightData: '260px',
                },
                dotaLiveData: {
                    type: 0,          // 开启背景模式，0为浅色，1为深色
                    colorData: '#fff',
                    widthData: '360px',
                    heightData: '260px',
                },
                csBeforeData: {
                    type: 0,          // 开启背景模式，0为浅色，1为深色
                    colorData: '#fff',
                    widthData: '360px',
                    heightData: '260px',
                },
                csLiveData: {
                    type: 1,          // 开启背景模式，0为浅色，1为深色
                    colorData: '#1E1E27',
                    widthData: '360px',
                    heightData: '260px',
                },
                keys: '',     // 页面参数key
			}
        },
        mounted() {
            this.keys = getUrlParam('keys') || 
            'aWR0a2tpcXloMGVvY3R1ZGlMc29SOStTa2hLQkN2RUU='
            let params = {
                keys: this.keys
            }
            getBattle(params).then(res => {
                // console.log(res)
            })
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