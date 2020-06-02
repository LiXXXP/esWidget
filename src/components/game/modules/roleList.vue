<template>
	<div class="role-list flex flex_column">
        <img v-for="item in roleList"
            :key="item.id"
            :src="item.url">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				roleList: [
                    {
                        id: 0,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 1,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 2,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 3,
                        url: require('../../../assets/imgs/3.png')
                    },
                    {
                        id: 4,
                        url: require('../../../assets/imgs/3.png')
                    }
                ]
			}
		}
	}
</script>

<style lang="less" scoped>
    .role-list {
        margin-top: -15px;
        img {
            width: 36px;
            height: 36px;
            margin: 2px;
            margin-top: 0;
        }
    }
</style>