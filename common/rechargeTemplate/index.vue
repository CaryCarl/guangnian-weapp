<template>
    <view class="tabbar">
        <view class="tab" v-for="(item,index) in tabbarList" :key="index" @click="navigatorTo(index)">
			<img class="imgsize" v-if="current !== index" :src="item.icon" alt="" />
			<img class="imgsize" v-if="current == index" :src="item.selectIcon" alt="" />
        </view>
    </view>
</template>

<script>
    export default {
        name: "tabbar",
        props: {
            current: {
                type: Number,
                default: 0, //默认第一个页面tabbar激活
            },
        },

        data() {
            return {
                tabbarList: [{
                    type: 0,
                    icon: '/static/tabbar/home.png',
                    selectIcon: '/static/tabbar/home-active.png',
                    name: '收藏',
                    url: 'pages/Tabbar/watching/watching',
                },{
                    type: 1,
                    icon: '/static/tabbar/my.png',
                    selectIcon: '/static/tabbar/my-active.png',
                    name: '我的',
                    url: 'pages/my/my',
                }]
            };
        },
        methods: {
            navigatorTo(i) {
				this.$emit('onTab',i)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .tabbar {
        padding-top: 12rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: inherit !important;
        position: fixed;
        bottom: 0;
        left: 0;
        padding-bottom: constant(safe-area-inset-bottom);
        /* 兼容 iOS<11.2 */
        padding-bottom: env(safe-area-inset-bottom);
        /* 兼容iOS>= 11.2 */
        background-color: #FFFFFF;
        width: 100%;
        // height: 136rpx;
        z-index: 9999999 !important;
        box-sizing: border-box;
        // box-shadow: 0px -3px 6px 1px rgba(230, 230, 230, 0.8196);
        border-top: 1px solid #eeeeee;
        .tab {
            padding: 10rpx 0 24rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .imgsize {
            width: 56rpx;
            height: 56rpx;
        }
    }
</style>