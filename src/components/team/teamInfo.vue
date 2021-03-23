<template>
    <div class="team">
        <div class="info flex flex_start">
            <img :src="teamInfo.image">
            <div class="name">
                <p>
                    <span>{{teamInfo.name}}</span>
                    <span class="full">({{teamInfo.full_name}})</span>
                </p>
                <p class="intr" :title="teamInfo.introduction">{{teamInfo.introduction || '暂无'}}</p>
            </div>
        </div>
        <div class="list flex flex_wrap flex_only_center">
            <div class="player" v-for="item in teamInfo.players" :key="item.player_id">
                <img :src="item.player_image">
                <p class="role" v-if="item.player_role">
                    <span>{{item.player_role}}</span>
                </p>
                <p class="name" v-if="item.nick_name">
                    <span>{{item.nick_name}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { teamProduct } from "@/scripts/request.js"// 请求方法
    import { getUrlParam } from '@/scripts/utils'     // 获取页面参数方法

    export default {
        name: 'teamInfo',
        data() {
            return {
                teamInfo: {}
            }
        },
        created() {
            this.getTeamInfo()
        },
        methods: {
            getTeamInfo() {
                let _this = this
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                teamProduct(params).then( res => {
                    if(res.code === 200) { 
                        _this.teamInfo = res.data
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .team {
        width: 100%;
        height: 270px;
        padding: 6px 0;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #1E1E27;
        .info {
            width: 100%;
            height: 75px;
            padding: 0 15px;
            overflow: hidden;
            box-sizing: border-box;
            background: linear-gradient(270deg, #94949B 0%, #D3D3D3 100%);
            img {
                width: 68px;
                height: 40px;
                margin: auto 0;
            }
            .name {
                width: 245px;
                color: #333;
                font-size: 20px;
                font-weight: 600;
                transform: scale(0.8);
                .full {
                    font-size: 12px;
                    font-weight: 400;
                }
            }
            .intr {
                color: #333;
                font-size: 12px;
                font-weight: 400;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
        }
        .list {
            height: 150px;
            padding: 15px;
            overflow: hidden;
            .player {
                width: 60px;
                height: 75px;
                margin-right: 10px;
                margin-bottom: 10px;
                border-radius: 1px;
                background-color: #6D7779;
                position: relative;
                &:nth-child(5n) {
                    margin-right: 0;
                }
                img {
                    width: 50px;
                    height: 60px;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%, 0);
                }
                .role {
                    height: 12px;
                    color: #333;
                    line-height: 12px;
                    border-radius: 6px;
                    border: 1px solid #333;
                    position: absolute;
                    top: 3px;
                    right: 3px;
                    span {
                        display: block;
                        font-size: 12px;
                        transform: scale(0.8);
                    }
                }
                .name {
                    width: 100%;
                    height: 12px;
                    color: #fff;
                    text-align: center;
                    line-height: 12px;
                    border-radius: 0 0 1px 1px;
                    background-color: rgba(0,0,0,.6);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    span {
                        display: block;
                        font-size: 12px;
                        transform: scale(0.8);
                    }
                }
            }
        }
    }
</style>