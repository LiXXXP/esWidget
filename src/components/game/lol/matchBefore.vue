<template>
	<section :class="['match-before',{'night-mode':definedStyle.type}]"
            :style="{'background-color':definedStyle.colorData}"
    >
        <p class="point">
            (数据为最近3个月)
        </p>
        <div class="bar flex flex_center flex_only_start">
            <state-list 
                :colorData="definedStyle.type"
            ></state-list>
            <battle
                :winerId="0"
                :battleData="[]"
                :factionsData="[]"
            >
                <div slot="before" class="time">
                    <p>23 : 50</p>
                    <p class="date">5月20日</p>
                </div>
            </battle>
            <state-list
                :colorData="definedStyle.type"
            ></state-list>
        </div>
        <rate-list
            :barColor="barColorData"
            :colorData="definedStyle.type"
        ></rate-list>
	</section>
</template>

<script>
    const stateList = ()=> import("@/components/game/modules/stateList") // 胜负标记
    const battle = ()=> import("@/components/game/modules/battle")       // 对局
    const rateList = ()=> import("@/components/game/modules/rateList")   // 对战率占比
    
	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            }
        },
		data() {
			return {
				barColorData: {   // 进度条颜色
                    left: '#A5A5A5',
                    right: '#3BB42A',
                },
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
        padding: 15px 75px;
        box-sizing: border-box;
        position: relative;
        .point {
            color: #CFCFCF;
            position: absolute;
            top: 15px;
            right: 12px;
        }
        .bar {
            .time {
                color: #434343;
                font-size: 18px;
                font-weight: 600;
                .date {
                    font-size: 14px;
                    font-weight: 500;
                }
            }
        }
    }
    .night-mode {
        .point {
            color: #5C5C79;
        }
        .bar {
            .time {
                color: #CFCFCF;
            }
        }
    }
</style>