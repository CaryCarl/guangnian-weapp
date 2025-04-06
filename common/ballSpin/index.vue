<template>
	<view class="la-ball-spin">
		<view class="loader-inner ball-clip-rotate"></view>
		<!-- <image class="qz-loading" src="/static/img/qz-loading.gif"></image> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				fileImg: ''
			}

		},
		onLoad() {
			this.fileImg = this.$store.getters.getFileImg
		},
	}
</script>
<style lang="scss" scoped>
	.la-ball-spin {
		position: fixed !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;

		.qz-loading {
			width: 130rpx;
			height: 120rpx;
		}
	}

	.loader-inner {
		background-color: #f05b47;
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		border: 3px solid #f05b47;
		border-bottom-color: transparent;
		background: transparent !important;
		display: inline-block;
		-webkit-animation: rotate 0.75s 0s linear infinite;
		animation: rotate 0.75s 0s linear infinite;
	}

	@keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg) scale(1);
			transform: rotate(0deg) scale(1);
		}

		50% {
			-webkit-transform: rotate(180deg) scale(0.6);
			transform: rotate(180deg) scale(0.6);
		}

		100% {
			-webkit-transform: rotate(360deg) scale(1);
			transform: rotate(360deg) scale(1);
		}
	}

	@keyframes scale {
		30% {
			-webkit-transform: scale(0.3);
			transform: scale(0.3);
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>