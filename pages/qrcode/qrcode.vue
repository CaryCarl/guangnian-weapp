<template>
    <view class="wrapper">
        <view class="vtop" :style="{marginTop: menuButtonInfo.top +'px'}">
            <view class="backj-img" @click="goHome()">
                <image class="img" :src="fileImg + '/static/img/home-title.png'" mode=""></image>
            </view>
            <view class="title">
                {{form.title || ''}}
            </view>
        </view>
        <view
            :style="{marginTop: `calc(${menuButtonInfo.top}px + ${topRpx});`,
         height:  `calc(100vh - ${menuButtonInfo.top}px - ${topRpx} - 64rpx);padding:32rpx;background-color: #a6eec6;`}">
            <view style="padding: 64rpx 32rpx;background-color: #fefefe;border-radius: 12px;">
                <view style="display: flex;align-items: stretch;">
                    <view>
                        <img style="width: 150rpx;height: 150rpx;border-radius: 6px;" decoding="async"
                            :src="form.avatar"></img>
                    </view>
                    <view style="margin-left: 16px;height: 100%;display: flex;flex-direction: column;">
                        <view style="display: flex;align-items: center;">
                            <view style="font-size: 40rpx;font-weight: bold;color: #333237;">{{form.name || ''}}</view>
                            <img style="width: 36rpx;height: 36rpx;margin-left: 10rpx;" decoding="async"
                                :src="fileImg + '/static/img/qrcode-2.png'"></img>
                        </view>
                        <view
                            style="margin-top: 20rpx;height: 42rpx;display: flex;align-items: center;width:80px;justify-content: center;border: 1px solid #1cae66;border-radius: 20px;color: #1cae66;">
                            <img style="width: 13px;height: 13px;margin-right: 3px;" decoding="async"
                                :src="fileImg + '/static/img/qrcode-1.png'"></img>
                            <view style="font-size: 24rpx;">官方认证</view>
                        </view>
                    </view>
                </view>
                <view style="margin: 25px 10px;position: relative;">
                    <view
                        style="position: absolute;left: -40px;top:-15px;width: 30px;height: 30px;background-color: #a6eec6; border-radius: 50%;">
                    </view>
                    <view style="border: 1px  dashed #c1c1c1; "></view>
                    <view
                        style="position: absolute;right: -40px;top:-15px;width: 30px;height: 30px;background-color: #a6eec6; border-radius: 50%;">
                    </view>
                </view>
                <view style="display: flex;flex-direction: column;align-items: center;width: 100%;">
                    <view
                        style="text-align: center;font-size: 20px;color: #333031;margin-bottom: 40rpx;font-weight: bold;">
                        长按二维码添加客服</view>
                    <image :src="form.showPic" mode="widthFix" style="width: 80%; height: auto;"
                        :show-menu-by-longpress="true"></image>
                </view>
                <view
                    style="margin: 50rpx 0;padding: 16rpx 0;border-radius: 20px;background-color: #34ab6b;color: #ffffff;font-weight: bold;text-align: center;font-size: 17px;letter-spacing: 1.5px;">
                    {{form.remark || '添加微信咨询'}}
                </view>
                <view style="font-size: 12px;text-align: center;">
                    长按二维码后在弹窗内 点击打开对方名片添加好友
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        fetch
    } from '../../utils/fetch.js';
    let menuButtonInfo = {};
    menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    export default {
        data() {
            return {
                menuButtonInfo: menuButtonInfo,
                topRpx: '35px',
                videoUrl: '',
                typePage: 0,
                title: '精彩视频',
                introduceText: '',
                id: -1,
                form: {
                    title: '',
                    remark: '',
                    name: ''
                },
                fileImg:''
            };
        },
        watch: {

        },
        onLoad(option) {
            console.log('接收---', option);
            this.typePage = option?.type || 0
            this.id = option?.id
            this.getList(+option?.type, +option?.id)
            this.fileImg = this.$store.getters.getFileImg
        },
        methods: {
            onBtn() {
                uni.navigateTo({
                    url: "/pages/essay/essay"
                })
            },
            goHome() {
                uni.switchTab({
                    url: "/pages/index/index"
                })
            },
            getList(type, id) {
                console.log('id', id);
                fetch(this.$api.getEssayList + (type + 1), {}, 'get').then((res) => {
                    let temp = res[1]?.data?.data
                    if (temp) {
                        let row = temp.find(item => item.id === id)
                        this.form = row
                        this.title = row?.title

                    }
                }).catch(err => {})
            },
        }
    }
</script>
<style lang="scss">
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: auto;
        line-height: 50rpx;
        background-color: #7ddfd0;

        .vtop {
            position: fixed;
            z-index: 999999;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;

            .title {
                margin-left: 90rpx;
                width: calc(100% - 88px - 90rpx);
                color: #24231f;
                font-size: 32rpx;
                line-height: 30px;
                font-weight: bold;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
            }
            .backj-img {
                padding: 10rpx 30rpx 4rpx 25rpx;
                position: absolute;
                z-index: 999999;
                top: 50%;
                transform: translateY(-50%);
                left: 0;

                .img {
                    width: 46rpx;
                    height: 46rpx;
                }
            }
        }

        .header-title {
            margin-bottom: 25rpx;
            font-size: 36rpx;
            font-weight: bold;
        }

        .video-box {
            width: 100%;

            video {
                width: 100%;
            }

            .title {
                margin: 0 0 20rpx 0;
                font-size: 36rpx;
                font-weight: bold;
            }
        }

        .btn {
            margin-top: 30rpx;
            height: 80rpx;
            color: #ffffff;
            line-height: 80rpx;
            border-radius: 16rpx;
            text-align: center;
            background-color: #ff3a4f;
        }

    }
</style>