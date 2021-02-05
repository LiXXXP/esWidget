<template>
	<div :class="[{
        'night-mode':colorData,
        'revolve-b': isRevolve && progressColor === '#1167E8',
        'revolve-r': isRevolve && progressColor === '#D43F2F'
    }]">
        <el-progress 
            class="progress"
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
            },
            isRevolve: {
                type: Boolean,
                default: false
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

    .revolve-b {
        .el-progress-bar__inner {
            overflow: hidden;
            &::after {
                content: '';
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 100px;
                transition: all 2s linear;
                animation: animate 2s linear infinite;
                background-color: #1167E8;
                background-image: repeating-linear-gradient(
                    -60deg,
                    rgba(255, 255, 255, .2) 25%,
                    transparent 25%, transparent 50%,
                    rgba(255, 255, 255, .2) 50%,
                    rgba(255, 255, 255, .2) 75%,
                    transparent 75%,
                    transparent
                );
                background-size: 10px 10px;
            }
        }
    }

    .revolve-r {
        .el-progress-bar__inner {
            overflow: hidden;
            &::after {
                content: '';
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 100px;
                transition: all 2s linear;
                animation: animate 2s linear infinite;
                background-color: #D43F2F;
                background-image: repeating-linear-gradient(
                    -60deg,
                    rgba(255, 255, 255, .2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .2) 50%,
                    rgba(255, 255, 255, .2) 75%,
                    transparent 75%,
                    transparent
                );
                background-size: 10px 10px;
            }
        }
    }

    @keyframes animate {
        0% {

        }
        100% {
            background-position: 80px 0;
        }
    }
</style>