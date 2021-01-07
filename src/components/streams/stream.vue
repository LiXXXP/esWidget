<template>
    <div class="video-content">
        <div v-if="streamsData && streamsData.is_supported">
            <div class="flex flex_start flex_wrap flex_wrap_reverse">
                <div :class="['item flex flex_start',{active:index===currentIndex}]"
                    v-for="(item,index) in streamsData.streams"
                    :key="item.stream_id"
                    @click="cutTab(index,item.embed_url)">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div class="video">
                <iframe :src="streamUrl"></iframe>
            </div>
        </div>
        <div class="none" v-else>
            <div>暂无直播内容...</div>
        </div>
    </div>
</template>

<script>
    import { newMatch } from "@/scripts/request.js"  // 请求方法
    import { getUrlParam } from '@/scripts/utils'    // 获取页面参数方法
    export default {
        data() {
            return {
                currentIndex: 0,    // 当前标题索引
                streamUrl: '',
                streamsData: null
            }
        },
        created() {
            this.getStream()
        },
        methods: {
            getStream() {
                let _this = this
                let keys = getUrlParam('keys')
                let params = {
                    keys: keys
                }
                newMatch(params).then(res => {
                    if(res.code === 200) {
                        _this.streamsData = res.data.live_video
                        _this.streamUrl = this.streamsData.streams[0].embed_url
                    }
                })
            },
            cutTab(index, url) {
                this.currentIndex = index
                this.streamUrl = url
            }
        }
    }
</script>

<style lang="less" scoped>
    .video-content {
        width: 960px;
        margin-top: 15px;
        margin-bottom: 18px;
        .item {
            cursor: pointer;
            padding: 12px 20px;
            border-radius: 4px 4px 0 0;
            background-color: #F2F2F2;
            border: 1px solid #CFCFCF;
            &.active {
                background-color: #fff;
                border-bottom: 1px solid #fff;
            }
            p {
                color: #2F3A5A;
                font-size: 12px;
            }
        }
        .video {
            padding: 5px;
            width: 960px;
            height: 544px;
            margin-top: -1px;
            box-sizing: border-box;
            background-color: #fff;
            border: 1px solid #CFCFCF;
            iframe {
                border: 0;
                width: 950px;
                height: 534px;
                display: block;
            }
        }
        .none {
            width: 100%;
            height: 544px;
            font-size: 24px;
            color: #D94629;
            font-weight: 600;
            line-height: 544px;
            text-align: center;
            background-color: rgba(0,0,0,.75);
        }
    }
</style>
