<template>
	<div class="battle flex flex_center">
        <div class="flex flex_start flex_center">
            <img :src="row1.head">
            <p class="score" v-if="row1.score">{{row1.score}}</p>
        </div>
        <div class="text">
            <slot name="before"></slot>
            <slot name="living"></slot>
            <p>35'24''</p>
        </div>
        <div class="flex flex_start flex_center">
            <p class="score" v-if="row2.score">{{row2.score}}</p>
            <img :src="row2.head">
        </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				row1: {
                    head: require('../../../assets/imgs/1.png'),
                    score: '1'
                },
                row2: {
                    head: require('../../../assets/imgs/2.png'),
                    score: '2'
                }
			}
		}
	}
</script>

<style lang="less" scoped>
    .battle {
        margin: 0 40px;
        img {
            width: 36px;
            height: 36px;
        }
        .score {
            color: #434343;
            margin: 0 7px;
            font-size: 18px;
            font-weight: bold;
        }
        .text {
            color: #434343;
            margin: 0 20px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
        }
    }
</style>