<template>
	<section>
        <head-tab :colorData="definedStyle.type"></head-tab>
	</section>
</template>

<script>
    import headTab from '@/components/game/modules/headTab'       // 头部切换
	export default {
        props: {
            definedStyle: {
                type: Object,
                default: null
            }
        },
		data() {
			return {
                
			}
        },
        mounted() {

        },
        components: {
            headTab,
        }
	}
</script>

<style lang="less" scoped>
    
</style>