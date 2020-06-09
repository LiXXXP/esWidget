<template>
    <div :class="['level-block',{'night-mode':colorData}]">
        <div class="block flex flex_start">
            <p>上半场</p>
            <state-table :isBig="isBig"></state-table>
        </div>
        <div class="block flex flex_start">
            <p>下半场</p>
            <state-table :isBig="isBig"></state-table>
        </div>
    </div>
</template>

<script>
    import stateTable from '@/components/game/modules/csgo/stateTable' // 面板
    export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                isBig: true,     // 是否显示大图标
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
                padding-top: 5px;
                text-align: center;
                word-break:break-all;
                box-sizing: border-box;
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