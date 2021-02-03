<template>
	<div :class="['head-tab', 'flex', 'flex_between',{'night-mode':colorData}]">
        <div class="nums flex flex_only_center">
            <div :class="['arrow last flex flex_center',{active: currentLast}]" 
                @click="nextStep('last')">
                <p class="left"></p>
            </div>
            <p v-if="lang === 'en'">Round {{bureauPage}}</p>
            <p v-else>
                第<span class="current">{{bureauPage}}</span>/<span class="total">{{gamesNum}}</span>局
            </p>
        </div>
        <div class="flex flex_only_center">
            <div class="flex flex_only_center" 
                v-if="factionsData[0].team_id===headData[0].team_id">
                <img :src="headData[0].team_snapshot.image">
                <p>{{headData[0].score || 0}} : {{headData[1].score || 0}}</p>
                <img :src="headData[1].team_snapshot?headData[1].team_snapshot.image:''">
            </div>
            <div class="flex flex_only_center" v-else>
                <img :src="headData[1].team_snapshot.image">
                <p>{{headData[1].score || 0}} : {{headData[0].score || 0}}</p>
                <img :src="headData[0].team_snapshot?headData[0].team_snapshot.image:''">
            </div>
            <div :class="['arrow next flex flex_center',{active: currentNext}]" 
                @click="nextStep('next')">
                <p class="right"></p>
            </div>
        </div>
	</div>
</template>

<script>
    import { toChinesNum,getUrlParam } from '@/scripts/utils'
	export default {
        props: {
            colorData: {    // 背景色模式
                type: Number,
                default: 0,
            },
            headData: {     // 对局分数
                type: Array,
                default: () => []
            },
            bureauPage: {   // 对局数
                type: Number,
                default: 0
            },
            gamesNum: {    // 总局数
                type: Number,
                default: 0
            },
            currentLast: {
                type: Number,
                default: 0
            },
            currentNext: {
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
                lang: 'cn',
            }
        },
        created() {
            this.lang = getUrlParam('l')
        },
        methods: {
            // 上一局 下一局
            nextStep(type) {
                this.$emit('blockedOut',type)
            }
        },
        computed: {
            bureauNum() {
                return toChinesNum((this.bureauPage))
            }
        }
	}
</script>

<style lang="less" scoped>
    .head-tab {
        height: 30px;
        color: #303030;
        padding: 0 8px;
        font-size: 12px;
        line-height: 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E7E7E7;
        .current {
            color: #FF7600;
            font-weight: 600;
        }
        .total {
            font-weight: 600;
        }
        .arrow {
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 100%;
            background-color: rgba(135,135,135,.5);
            &.active {
                background-color: #3CAB3C;
            }
            &.last {
                margin-right: 20px;
            }
            &.next {
                margin-left: 20px;
            }
            .left,
            .right {
                width: 5px;
                height: 5px;
                border-top: 1px solid #101010;
                border-left: 1px solid #101010;
                &::after {
                    content: '';
                    display: block;
                    width: 5px;
                    height: 5px;
                    margin-top: 1px;
                    margin-left: 1px;
                    border-top: 1px solid #101010;
                    border-left: 1px solid #101010;
                }
            }
            .left {
                transform: rotate(-45deg);
            }
            .right {
                transform: rotate(135deg);
            }
        }
        img {
            width: 12px;
            height: 14px;
            margin: auto 10px;
        }
    }
    .night-mode {
        color: #cfcfcf;
        border-bottom: 2px solid #363636;
        .nums {
            color: #878787;
        }
        .total {
            color: #CFCFCF;
        }
    }
</style>