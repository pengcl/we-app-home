import kSvc from "../../service";
const app = getApp();
const sortKeys = (items, orderKeys) => {
    let keys = [];
    orderKeys.forEach(key => {
        keys = keys.concat(items.filter(item => item.status === key));

    });
    return keys;
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        userPhone: null,
        current: 0,
        codes: [],
        usedCount: 0,
        order: {},
        orderno: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ orderno: options.orderno });
    },
    getMeta() {
        const userInfo = wx.getStorageSync("UserInfo");
        const userPhone = wx.getStorageSync("PhoneNum");
        this.setData({
            userInfo,
            userPhone
        });
    },
    swiperChange(e) {
        this.setData({ current: e.detail.current });
    },
    getData(orderno) {
        kSvc.getOrder(this.data.userPhone, orderno, res => {
            this.setData({ order: res });
            this.getGood(res.goodsguid);
            this.getOthers(res.goodsguid);

        });
        this.getCodes(orderno);
    },

    getGood(goodsGuid) {
        const params = {
            goodsGuid: goodsGuid,
            requesttype: 1
        }
        kSvc.getGoods(params, (res) => {
            const good = res[0];
            this.setData({ good });
        });
    },
    getCodes(orderno) {
        kSvc.getCodes(orderno, codes => {
            let usedCount = this.data.usedCount;
            codes.forEach((item, index) => {
                item.qrcodeurl = item.qrcodeurl.replace(/\\/gi, '/');
                if (item.status === '已使用') {
                    usedCount = usedCount + 1;
                }
            });
            // codes = sortKeys(codes, ['未使用', '即将过期', '已过期', '已使用']);
            this.setData({ codes: codes, usedCount });
        });
    },
    getOthers(goodsguid) {
        kSvc.getItemDetails(goodsguid, res => {
            const contentRole = res.filter(item => item.datatype === 'GoodsUseRuleContent');
            const contentPhone = res.filter(item => item.datatype === 'ShopTelephoneContent');
            this.setData({ contentRole, contentPhone });
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.appIsOnload) {
            this.getMeta();
            this.getData(this.data.orderno);
        } else {
            app.appIsOnloadCallback = () => {
                this.getMeta();
                this.getData(this.data.orderno);
            };
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
})