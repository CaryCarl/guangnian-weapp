<template>
    <view class="description-box">
        <view class="pay-msg">
            <view class="title" @click="show = true">
                <image style="width: 30rpx;height: 30rpx;" src="https://qiezidj-resource.oss-cn-shenzhen.aliyuncs.com/static/img/tag-w.png" mode=""></image>
            </view>
        </view>
        <u-popup :show="show" @close="show = false" :round="10" mode="center"
            :custom-style="{'backgroundColor': '#ffffff', 'color': '#888888','width':'calc(100% - 164rpx)','padding':'50rpx','fontSize':'24rpx'}">
            <view>
                <view class="explanation">1. 金币和会员属于虚拟商品，一经购买不得退换；</view>
                <view class="explanation" style="margin: 16rpx 0;">2. 充值后金币可能有延迟，1小时内未到账请与客服联系；</view>
                <view class="explanation">3. 未满18岁的未成年应在父母或其他监护人的监护指导，同意下进行相关付费操作。</view>
            </view>
        </u-popup>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                fileImg : this.$store.getters.getFileImg
            }
        },
    }
</script>
<style scoped lang="scss">
    .pay-msg {
        padding-right: 45rpx;
        .title {
            font-size: 28rpx;
            margin-left: 32rpx;
            display: flex;
            align-items: center;
            color: #959595;
            image {
                margin-left: 8rpx;
                width: 32rpx;
                height: 32rpx;
            }
        }
    }
</style>