<template>
	<div class="battle flex flex_center">
        <slot name="left-info"></slot>
        <div class="team flex flex_start flex_center"
            v-if="
                (factionsData[0].faction==='blue' || 
                factionsData[0].starting_side==='ct') &&
                factionsData[0].team_id===battleData[0].team_id"
        >
            <img :src="battleData[0].team_snapshot.image">
            <i class="team-win" v-if="winerId === battleData[0].team_id"></i>
        </div>
        <div class="team flex flex_start flex_center" v-else>
            <img :src="battleData[1].team_snapshot.image">
            <i class="team-win" v-if="winerId === battleData[1].team_id"></i>
        </div>
        <div class="text">
            <slot name="before"></slot>
            <slot name="living"></slot>
        </div>
        <div class="team flex flex_start flex_center"
            v-if="
                (factionsData[1].faction==='red' || 
                factionsData[1].starting_side==='terrorist') &&
                factionsData[1].team_id===battleData[1].team_id"
        >
            <img :src="battleData[1].team_snapshot.image">
            <i class="team-win" v-if="winerId === battleData[1].team_id"></i>
        </div>
        <div class="team flex flex_start flex_center" v-else>
            <img :src="battleData[0].team_snapshot.image">
            <i class="team-win" v-if="winerId === battleData[0].team_id"></i>
        </div>
        <slot name="right-info"></slot>
	</div>
</template>

<script>
	export default {
        props: {
            battleData: {     // 对局队伍头像
                type: Array,
                default: []
            },
            winerId: {        // 赢家id
                type: Number,
                default: 0
            },
            factionsData: {
                type: Array,
                default: []
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
                background: url('../../../assets/imgs/win.png') no-repeat 0 0;
                background-size: 100%;
                position: absolute;
                left: -15px;
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