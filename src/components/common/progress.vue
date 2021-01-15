<template>
	<div :class="['progress',{'night-mode':colorData}]">
        <el-progress 
            :stroke-width="8"
            :show-text="false"
            :percentage="progressData" 
            :color="progressColor"
        ></el-progress>
	</div>
</template>

<script>
	export default {
        props: {
            colorData: {
                type: Number,
                default: 0,
            },
            progressData: {
                type: Number,
                default: 0
            },
            progressColor: {
                type: String,
                default: ''
            }
        },
		data() {
			return {

			}
        },
        mounted() {
            
        }
	}
</script>

<style lang="less">
    .night-mode {
        .el-progress-bar__outer {
            background-color: #202020;
        }
    }
</style>