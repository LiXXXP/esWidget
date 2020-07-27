<template>
    <div class="war-list">
        <table>
            <thead :class="isColor?'left':'right'">
                <th style="font-weight:0;">
                    <img src="../../../../assets/imgs/2.png" class="team-icon">
                    <span class="beyond-ellipsis">Cloud9</span>
                </th>
                <th>
                    <i class="icon-buy"></i>
                </th>
                <th>
                    <i class="icon-add"></i>
                </th>
                <th>
                    <i class="icon-head"></i>
                </th>
                <th>$</th>
            </thead>
            <tbody :class="isColor?'left':'right'">
                <tr v-for="item in warData"
                    :key="item.name"
                    :class="item.add>0?'':'gray'">
                    <td>
                        <p class="beyond-ellipsis">
                            {{item.name}}
                        </p>
                    </td>
                    <td>
                        <img class="icon-q"
                            :src="item.buy"
                            v-if="item.buy"
                        >
                    </td>
                    <td class="add-block">
                        <progress-data
                            :progressData="parseInt(item.add)"
                            :progressColor="parseInt(item.add)>20?
                                            parseInt(item.add)>60?
                                            '#008D2B':'#DC8616':'#ED2011'"
                        ></progress-data>
                        <p>{{item.add}}</p>
                    </td>
                    <td>
                        <i class="icon-head" 
                            v-if="item.isHead"
                        ></i>
                    </td>
                    <td>{{item.coin}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import progressData from '@/components/common/progress'
    export default {
        props: {
            isColor: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                warData: [
                    {
                        name: 'jksjksjksjksjksjksjksjks',
                        buy: require('../../../../assets/imgs/q01.png'),
                        add: 100,
                        isHead: true,
                        coin: 4700
                    },
                    {
                        name: 'jks',
                        buy: require('../../../../assets/imgs/q02.png'),
                        add: 60,
                        isHead: true,
                        coin: 4700
                    },
                    {
                        name: 'jkaem',
                        buy: require('../../../../assets/imgs/q03.png'),
                        add: 20,
                        isHead: true,
                        coin: 380
                    },
                    {
                        name: 'lias',
                        buy: require('../../../../assets/imgs/q04.png'),
                        add: 100,
                        isHead: false,
                        coin: 990
                    },
                    {
                        name: 'AZR',
                        add: 0,
                        isHead: false,
                        coin: 2500
                    }
                ]
            }
        },
        components: {
            progressData
        }
    }
</script>

<style lang="less" scoped>
    @bluethead: rgba(0,93,151,.85);
    @bluetbody: rgba(0,87,142,.5);
    @yellowthead: rgba(151,131,0,.85);
    @yellowtbody: rgba(151,131,0,.35);
    .war-list {
        color: #fff;
        margin-top: 10px;
        .team-icon {
            width: 12px;
            height: 14px;
            vertical-align: middle;
        }
        .icon-buy {
            width: 12px;
            height: 11px;
            display: inline-block;
            vertical-align: middle;
            background: url('../../../../assets/imgs/thead01.png') no-repeat 0 0;
            background-size: 100%;
        }
        .icon-add {
            width: 10px;
            height: 10px;
            display: inline-block;
            vertical-align: middle;
            background: url('../../../../assets/imgs/thead02.png') no-repeat 0 0;
            background-size: 100%;
        }
        .icon-head {
            width: 9px;
            height: 10px;
            display: inline-block;
            vertical-align: middle;
            background: url('../../../../assets/imgs/thead03.png') no-repeat 0 0;
            background-size: 100%;
        }
        .icon-q {
            width: 17px;
            height: 9px;
            display: inline-block;
            vertical-align: middle;
        }
        .add-block {
            width: 24px;
            position: relative;
            p { 
                font-size: 12px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        table {
            width: 170px;
            text-align: center;
            border-spacing: 0px 2px;
            border-collapse:separate;
            thead {
                height: 18px;
                font-size: 10px;
                line-height: 18px;
                th {
                    &:nth-child(1) {
                        width: 60px;
                        text-align: left;
                        padding-left: 3px;
                        span {
                            width: 48px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                }
            }
            tbody {
                tr {
                    height: 18px;
                    color: #fcfcfc;
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 18px;
                    td {
                        &:nth-child(1) {
                            p {
                                width: 60px;
                                text-align: left;
                                padding-left: 3px;
                            }
                            
                        }
                    }
                }
            }
            thead.left {
                background-color: @bluethead;
            }
            tbody.left {
                tr {
                    background-color: @bluetbody;
                    &.gray {
                        background-color: rgba(135,135,135, .5);
                    }
                }
            }
            thead.right {
                background-color: @yellowthead;
            }
            tbody.right {
                tr {
                    background-color: @yellowtbody;
                    &.gray {
                        background-color: rgba(135,135,135, .5);
                    }
                }
            }
        }
    }
</style>

<style lang="less">
.war-list {
    .el-progress-bar__outer {
        border-radius: 2px;
        background-color: #878787;
        .el-progress-bar__inner {
            border-radius: 2px;
        }
    }
}
</style>