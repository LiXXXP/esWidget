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
	</div>
</template>

<script>
    import matchBefore from '@/components/game/lol/matchBefore'
    import lolMatchLive from '@/components/game/lol/matchLive'
    import dotaMatchLive from '@/components/game/dota/matchLive'
    import csMatchBefore from '@/components/game/csgo/matchBefore'
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
			}
        },
        components: {
            matchBefore,
            lolMatchLive,
            dotaMatchLive,
            csMatchBefore
        }
	}
</script>

<style lang="less" scoped>
    
</style>