<template>
	<div :class="['head-tab', 'flex', 'flex_between',{'night-mode':colorData}]">
        <div class="flex flex_start flex_only_center">
            <p class="left"></p>
            <p>第三局</p>
        </div>
        <div class="flex flex_start flex_only_center">
            <div class="flex flex_start">
                <img src="../../../assets/imgs/1.png">
                <p>2:1</p>
                <img src="../../../assets/imgs/2.png">
            </div>
            <p class="right"></p>
        </div>
	</div>
</template>

<script>
	export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            }
        },
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
    .head-tab {
        height: 30px;
        color: #303030;
        padding: 0 20px;
        font-size: 12px;
        line-height: 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E7E7E7;
        .left,
        .right {
            width: 7px;
            height: 7px;
            cursor: pointer;
            border-top: 1px solid #101010;
            border-left: 1px solid #101010;
        }
        .left {
            margin-right: 20px;
            transform: rotate(-45deg);
        }
        .right {
            margin-left: 10px;
            transform: rotate(135deg);
        }
        img {
            width: 12px;
            height: 14px;
            margin: auto 10px;
        }
    }
    .night-mode {
        color: #CFCFCF;
        border-bottom: 1px solid #131313;
        .left,.right {
            border-top: 1px solid #CFCFCF;
            border-left: 1px solid #CFCFCF;
        }
    }
</style>