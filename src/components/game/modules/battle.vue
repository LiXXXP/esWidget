<template>
	<div class="battle flex flex_center">
        <slot name="left-info"></slot>
        <div class="team flex flex_start flex_center">
            <img :src="row1.head">
            <i class="team-win" v-if="row1.win"></i>
        </div>
        <div class="text">
            <slot name="before"></slot>
            <slot name="living"></slot>
        </div>
        <div class="team flex flex_start flex_center">
            <img :src="row2.head">
            <i class="team-win" v-if="row2.win"></i>
        </div>
        <slot name="right-info"></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				row1: {
                    win: true,
                    head: require('../../../assets/imgs/1.png'),
                },
                row2: {
                    win: false,
                    head: require('../../../assets/imgs/2.png'),
                }
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
                background: url('../../../assets/imgs/win.png') no-repeat 0 0;
                background-size: 100%;
                position: absolute;
                left: -18px;
                bottom: 0;
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