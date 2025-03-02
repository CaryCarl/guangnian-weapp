<template>
    <view class="page-no-data">
        <image src="../../static/img/qidai.png" mode="widthFix"></image>
        <view v-if="comingSoon" class="coming-soon">您还没有可用金券</view>
        <view class="p-btn" @click="onPath()">先去看剧</view>
    </view>
</template>

<script>
    export default {
        props: {
          comingSoon: {
            type: Boolean,
            default: false,
            fileImg:''
          },
        },
        data() {
            return {
            }
        },
        methods:{
            onPath() {
                uni.switchTab({
                    url: '/pages/index/index'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-no-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 120rpx);
        .coming-soon {
            margin-top: 80rpx;
            color: #24231f;
            font-size: 36rpx;
            font-weight: bold;
        }
        .p-btn {
            margin-top: 50rpx;
            padding: 0 48rpx;
            height: 90rpx;
            line-height: 90rpx;
            color: #ffffff;
            font-size: 36rpx;
            border-radius: 46rpx;
            background: linear-gradient(270deg, #1C8EFF 0%, #0A68F3 100%);
        }
    }

</style>