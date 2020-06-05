<template>
	<div :class="['role-list flex flex_column',roleData.type]">
        <div class="role"
            :style="{'width':roleData.width,
                     'height':roleData.height}"
            v-for="item in roleList"
            :key="item.id"
        >
            <img :src="item.url">
            <span>{{item.id}}</span>
            <i v-if="roleData.type==='dota'" :class="{'sign':item.sign}"></i>
        </div>
	</div>
</template>

<script>
	export default {
        props: {
            roleData: {
                type: Object,
                default: null
            }
        },
		data() {
			return {
				roleList: [
                    {
                        id: 11,
                        sign: true,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 12,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 23,
                        sign: true,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 34,
                        sign: true,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 43,
                        url: require('../../../assets/imgs/3.png')
                    }
                ]
			}
		}
	}
</script>

<style lang="less" scoped>
    @sign: #10CA10;
    .role-list {
        .role {
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            span {
                color: #fff;
                padding: 1px;
                display: block;
                line-height: 9px;
                background-color: rgba(0, 0, 0, .8);
                position: absolute;
                left: 0;
                bottom: 0;
            }
            i {
                width: 5px;
                height: 5px;
                z-index: 99;
                display: block;
                border: 1px solid #fff;
                background-color: #878787;
                transform: rotate(45deg);
                -moz-transform:rotate(45deg);
                -webkit-transform:rotate(45deg);
                -o-transform:rotate(45deg);
                position: absolute;
                left: 50%;
                bottom: -3.5px;
                margin-left: -2.5px;
            }
            i.sign {
                background-color: @sign;
            }
        }
    }
    .lol {
        margin-top: -15px;
        .role {
            margin: 2px;
            margin-top: 0;
        }
    }
    .dota {
        margin-top: 6px;
        .role {
            margin: 6px 2px;
            margin-top: 0;
        }
    }
</style>