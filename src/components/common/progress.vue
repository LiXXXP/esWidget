<template>
	<div class="progress">
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

<style lang="less" scoped>
    .progress {

    }
</style>