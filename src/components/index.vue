<template>
	<div class="index">
        <match-before></match-before>
        <match-live></match-live>
	</div>
</template>

<script>
    import matchBefore from '@/components/game/lol/matchBefore'
    import matchLive from '@/components/game/lol/matchLive'
	export default {
		data() {
			return {
				
			}
        },
        components: {
            matchBefore,
            matchLive
        }
	}
</script>

<style lang="less" scoped>

</style>