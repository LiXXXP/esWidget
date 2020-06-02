<template>
	<section class="match-before">
        <p class="point">(数据为最近3个月)</p>
        <div class="bar flex flex_center flex_only_start">
            <state-list></state-list>
            <battle>
                <div slot="before" class="time">
                    23:50
                </div>
            </battle>
            <state-list></state-list>
        </div>
        <rate-list></rate-list>
	</section>
</template>

<script>
    import stateList from '@/components/game/modules/stateList'  // 胜负标记
    import battle from '@/components/game/modules/battle'        // 对局
    import rateList from '@/components/game/modules/rateList'    // 对战率占比
	export default {
		data() {
			return {
				
			}
        },
        components: {
            stateList,
            battle,
            rateList
        }
	}
</script>

<style lang="less" scoped>
    .match-before {
        width: 826px;
        height: 262px;
        margin: 20px auto;
        padding: 15px 75px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        .point {
            color: #CFCFCF;
            font-weight: 500;
            position: absolute;
            top: 15px;
            right: 12px;
        }
        .bar {
            .time {
                color: #434343;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>