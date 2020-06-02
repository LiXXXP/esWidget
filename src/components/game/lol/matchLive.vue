<template>
	<div class="match-live">
        <head-tab></head-tab>
        <battle>
            <div slot="living" class="live">
                <span>23</span>
                <i></i>
                <span>27</span>
            </div>
        </battle>
	</div>
</template>

<script>
    import headTab from '@/components/game/modules/headTab'
    import battle from '@/components/game/modules/battle'
	export default {
		data() {
			return {
				
			}
        },
        components: {
            headTab,
            battle
        }
	}
</script>

<style lang="less" scoped>
    .match-live {
        width: 360px;
        height: 260px;
        margin-top: 50px;
        box-sizing: border-box;
        background-color: #fff;
        .live {
            span {
                color: #FF7600;
                font-size: 18px;
                font-weight: 500;
            }
            i {
                width: 14px;
                height: 13px;
                margin: 0 5px;
                display: inline-block;
                background: url('../../../assets/imgs/icon01.png') no-repeat 0 0;
                background-size: 100%;
            }
        }
    }
</style>