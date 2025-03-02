<template>
    <view class="la-ball-spin">
        
        <image class="qz-loading" src="/static/img/qz-loading.gif"></image>
    </view>
</template>
<script>
    
export default {
    data() {
        return {
            fileImg:''
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
        transform: translateY(-50%);
        left: calc(50% - 75rpx);
        z-index: 9999;
        
        .qz-loading {
            width: 130rpx;
            height: 120rpx;
        }
    }
</style>