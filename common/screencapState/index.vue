<template>
    <view>
        <view class="screencap-state-box">
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .screencap-state-box {
        position: fixed;
        z-index: 999999999 !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
    }
</style>