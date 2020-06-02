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
        <div class="flex flex_between">
            <role-list></role-list>
            <div>
                <div class="flex flex_between">
                    <type-list :placeData="placeRight"></type-list>
                    <type-list :placeData="placeLeft"></type-list>
                </div>
                <output-list></output-list>
            </div>
            <role-list></role-list>
        </div>
	</div>
</template>

<script>
    import headTab from '@/components/game/modules/headTab'       // 头部切换
    import battle from '@/components/game/modules/battle'         // 对局
    import typeList from '@/components/game/modules/typeList'     // 标签列表
    import roleList from '@/components/game/modules/roleList'     // 角色列表
    import outputList from '@/components/game/modules/outputList' // 输出占比
    // import { getBattle } from "@/scripts/request.js"           // 请求方法
	export default {
		data() {
			return {
                placeRight: true, // 位置是否右对齐
                placeLeft: false, // 位置是否左对齐
			}
        },
        mounted() {
            // getBattle().then(res => {
            //     console.log(res)
            // })
        },
        components: {
            headTab,
            battle,
            typeList,
            roleList,
            outputList
        }
	}
</script>

<style lang="less" scoped>
    .match-live {
        width: 360px;
        height: 260px;
        margin: 0 auto;
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