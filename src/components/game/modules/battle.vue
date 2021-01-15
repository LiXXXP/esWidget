<template>
    <div>
        <div class="battle flex flex_center" v-if="factionsData.length!==0">
            <slot name="left-info"></slot>
            <div class="team flex flex_start flex_center">
                <img :src="factionsData[0].team_snapshot?factionsData[0].team_snapshot.image:''">
                <i class="team-win" v-if="winerId === factionsData[0].team_id"></i>
            </div>
            <div class="text">
                <slot name="before"></slot>
                <slot name="living"></slot>
            </div>
            <div class="team flex flex_start flex_center">
                <img :src="factionsData[1].team_snapshot?factionsData[1].team_snapshot.image:''">
                <i class="team-win" v-if="winerId === factionsData[1].team_id"></i>
            </div>
            <slot name="right-info"></slot>
        </div>
    </div>
</template>

<script>
	export default {
        props: {
            winerId: {        // 赢家id
                type: Number,
                default: 0
            },
            factionsData: {
                type: Array,
                default: () => []
            }
        },
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
    .battle {
        margin: 0 40px;
        .team {
            position: relative;
            img {
                width: 36px;
                height: 36px;
            }
            .team-win {
                width: 36px;
                height: 20px;
                display: block;
                overflow: hidden;
                background: url('../../../assets/imgs/win.png') no-repeat 0 0;
                background-size: 100%;
                position: absolute;
                left: -15px;
                bottom: 0;
                &::after {
                    content: '';
                    width: 10px;
                    z-index: 999;
                    animation: 2.2s loadingframe infinite;
                    -webkit-animation: 2.2s loadingframe infinite;
                    transform: translateX(-50%) skew(140deg);
                    background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, .7));
                    position: absolute;
                    left: 0;
                }
                @keyframes loadingframe{
                    from {
                        top: 0;
                        left: -30%;
                        height: 16px;
                    }
                    to {
                        left: 100%;
                        top: 70%;
                        height: 8px;
                    }
                }
            }
        }
        .text {
            margin: 0 20px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
        }
    }
</style>