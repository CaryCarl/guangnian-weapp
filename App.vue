<script>
import { fetch } from './utils/fetch.js';
import { getCodeLogin } from './utils/login.js';
import api from './api/api.js';


export default {
    methods: {},
    async onLaunch(options) {
        if (options?.query?.openId && options?.query?.completeId) {
            let inv = {
                openId: options?.query?.openId,
                completeId: options?.query?.completeId
            };
            uni.setStorageSync('inviteInfoLogin', inv);
            this.$store.commit('setInviteInfoLogin', inv); //存储邀请者信息用于登录
        }
		
        let xcxInfo = {
            name: "小橘图库",
            appid: "wx65ede331cd1aadbc",
        };
        this.$store.commit('setXcxInfo', xcxInfo);
        // 用户登录
        await getCodeLogin();
		this.$isResolve()
    },
    async onShow() {
        let updateManager = uni.getUpdateManager();
        if (!updateManager) {
            return;
        } else {
            //新版本更新
            if (uni.canIUse('getUpdateManager')) {
                updateManager.onCheckForUpdate(function(res) {
                    if (res.hasUpdate) {
                        updateManager.onUpdateReady(function() {
                            updateManager.applyUpdate();
                        });
                        updateManager.onUpdateFailed(function() {
                            uni.showModal({
                                title: '已经有新版本了哟~',
                                content: '新版本已经上线啦~，请您删除当前小程序，重新进入~'
                            });
                        });
                    }
                });
            }
        }
    },
    onHide: function() {}
};
</script>

<style lang="scss">
@import "uview-ui/theme.scss";
@import './common/css/app.scss';
</style>
