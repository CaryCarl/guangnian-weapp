<template>
	<view class="img-page">
		<view v-if="id === '0' || id === '2'" class="grid-size qz-fl-sb-wrap">
			<view class="jq-row mb32" v-for="(item,i) in rm" :key="i">
				<view class="jq-img-box">
					<image class="jq-img" mode="" :src="item.src"></image>
				</view>
			</view>
		</view>
		
		<view v-else class="grid-size qz-fl-sb-wrap">
			<view class="jq-row mb32" v-for="(item,i) in dm" :key="i">
				<view class="jq-img-box">
					<image class="jq-img" mode="" :src="item.src"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'1',
				dm:[
					{
						src:require("@/static/img/dm1.png")
					},{
						src:require("@/static/img/dm2.png")
					},{
						src:require("@/static/img/dm3.png")
					},{
						src:require("@/static/img/dm4.png")
					}
				],
				rm:[
					{
						src:require("@/static/img/rm1.png")
					},{
						src:require("@/static/img/rm2.png")
					},{
						src:require("@/static/img/rm3.png")
					},{
						src:require("@/static/img/rm4.png")
					}
				]
			};
		},
		onLoad(options) {
			console.log('options---', options);
			this.id = options?.id || 1
		},
	}
</script>

<style lang="scss" scoped>
	.img-page {
		padding: 32rpx;
	}
	.grid-size {
		.jq-row {
			width: calc(50% - 16rpx);
			border-radius: 12rpx;
			overflow: hidden;
			background-color: #ffffff;
			box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
			.jq-img-box {
				width: 100%;
				height: 320rpx;
				border-radius: 12rpx;
				overflow: hidden;
				.jq-img {
					width: 100%;
					height: 100%;
				}
			}
			
			.row-title {
				font-weight: 550;
			}
			.price {
				font-weight: 550;
				color: #f05b47;
			}
			.pay-btn {
				padding: 12rpx 24rpx;
				color: #ffffff;
				border-radius: 32rpx;
				background-color: #f05b47;
			}
			
		}
	}

</style>
