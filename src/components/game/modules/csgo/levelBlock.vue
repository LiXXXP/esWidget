<template>
    <div :class="['level-block',{'night-mode':colorData}]">
        <div class="block flex flex_start"
            v-for="item in levelList"
            :key="item.text">
            <p>{{lang === 'en'?item.textEn:item.text}}</p>
            <state-table 
                :isBig="item.isBig"
                :stateData="item.stateData"
            ></state-table>
        </div>
    </div>
</template>

<script>
    const stateTable = ()=> import("@/components/game/modules/csgo/stateTable") // 击杀面板

    import { getUrlParam } from '@/scripts/utils'    // 获取页面参数方法

    export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            },
            levelData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                levelList: [
                    {
                        text: '上半场',
                        textEn: 'UP',
                        isBig: true, // 显示大图标
                        stateData: []
                    },
                    {
                        text: '下半场',
                        textEn: 'DN',
                        isBig: true, // 显示大图标
                        stateData: []
                    }
                ],
                lang: 'cn'
            }
        },
        created() {
            this.lang = getUrlParam('l')
            this.levelList[0].stateData = this.levelData.slice(0,15)
            this.levelList[1].stateData = this.levelData.slice(15,30)
        },
        watch: {
            levelData(old,val) {
                this.levelList[0].stateData = this.levelData.slice(0,15)
                this.levelList[1].stateData = this.levelData.slice(15,30)
            }
        },
        components: {
            stateTable
        }
    }
</script>

<style lang="less" scoped>
    .level-block {
        padding: 0 12px;
        .block {
            width: 336px;
            height: 60px;
            margin-bottom: 3px;
            border: 1px solid #CFCFCF;
            p {
                color: #fff;
                width: 22px;
                height: 60px;
                padding-left: 2px;
                text-align: center;
                letter-spacing: 2px;
                writing-mode: vertical-lr;
                background-color: #B5B5B5;
            }
        }
        &.night-mode {
            .block {
                border: 1px solid #454558;
                p {
                    color: #737397;
                    background-color: #454558;
                }
            }
        }
    }
</style>