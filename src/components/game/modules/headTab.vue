<template>
	<div class="head-tab flex flex_between flex_center">
        <p class="left"> < </p>
        <p>第三局</p>
        <p class="right"> > </p>
	</div>
</template>

<script>
	export default {
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
        font-size: 14px;
        line-height: 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E7E7E7;
        .left,
        .right {
            font-size: 20px;
            cursor: pointer;
        }
    }
</style>