import kSvc from "../service";
const app = getApp();
//生成随机 GUID 数
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function createGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const formatDate = function (date) {
    if (!date) {
        return date;
    }
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '/' + month + '/' + day + ' 0:00:00';

}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        guid: '',
        swipers: [],
        detail: null,
        contents: [],
        isFirst: false,
        userInfo: app.globalData.userInfo,
        userPhone: '',
        params: {
            orderguid: createGuid(),
            goodsguid: '',
            goodsname: '',
            userphone: '',
            kdpnumber: '',
            crmnumber: '',
            goodscount: 1,
            effectday: 1,
            deadline: 1,
            partnercode: '',
            partnershowname: '',
            exchangeaddress: '',
            totalkdppoints: 0,
            createuser: '',
            exchangetype: '',
            regioncode: '',
            snapshotdata: null,
            imgurl: null
        },
        contentRole: [],
        contentPhone: [],
        show: false,
        points: 0,
        shareData: {},
        openid: app.globalData.openid,
        isKDP: false,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ guid: options.guid });
        this.setData({ isFirst: getCurrentPages().length < 2 });
    },
    backPage(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    toHome(e) {
        wx.reLaunch({
            url: '/pages3/KDPMall/index/index',
        })
    },
    askForsubmit() {
        console.log('askForsubmit');
        this.setData({ show: true });
    },
    submit() {
        if (this.data.loading) {
            return false;
        }
        this.setData({ loading: true });
        const params = this.data.params;
        wx.showLoading({
            title: '兑换中...',

        })
        console.log(params);
        kSvc.submit(params, res => {
            if (res) {
                wx.hideLoading({
                    success: () => {
                        wx.redirectTo({
                            url: '/pages3/KDPMall/success/success?orderno=' + res.orderno,
                        }).then(() => {

                        });
                    },
                })
            } else {
                this.setData({ loading: false });
                wx.hideLoading({
                    success: (res) => {
                        this.getMeta();
                        this.getData();
                    },
                })
            }
        })
    },
    getMeta() {
        const userInfo = wx.getStorageSync("UserInfo");
        const userPhone = wx.getStorageSync("PhoneNum");
        const orderguid = createGuid();
        const params = this.data.params;
        params.createuser = userPhone;
        params.userphone = userPhone;
        params.orderguid = orderguid;
        this.setData({
            userInfo,
            loading: false,
            userPhone,
            params
        });
    },
    getData() {
        this.getItemContents();
        this.getItemSwipers();
        this.checkKDPMember(this.data.userPhone);
        this.getPoints(this.data.userPhone);
        this.getDetail();
    },
    xsjcrm_tap: function () {
        var timestamp = Date.parse(new Date());
        let url = "/union/nwccvip/login?appid=crm&timestamp=" + timestamp
        wx.navigateTo({
            url: url,
        })
    },
    getPoints(phone) {
        kSvc.getPoints(phone, (res) => {
            const points = res;
            this.setData({ points });
        });
    },
    getDetail() {
        const req = {
            goodsGuid: this.data.guid,
            requesttype: 1
        }
        kSvc.getGoods(req, (res) => {
            const detail = res[0];
            const deadline = detail.deadline ? (detail.deadline.replace(/-/gi, '/') + ' 23:59:59') : null;
            const valid = new Date(deadline).getTime() > new Date().getTime();

            const params = this.data.params;
            const pages = getCurrentPages();
            const shareData = {
                title: detail.goodsname,
                path: pages[pages.length - 1],
                imageUrl: detail.imgurl
            };
            params.imgurl = detail.imgurl;
            params.goodsguid = this.data.guid;
            params.goodsname = detail.goodsname;
            params.effectday = detail.effectday;
            params.deadline = detail.deadline ? formatDate(detail.deadline.replace(/-/gi, '/')) : null;
            params.partnercode = detail.brandcode;
            params.partnershowname = detail.address;
            params.exchangeaddress = detail.exchangeaddress;
            params.totalkdppoints = detail.kdppoints * params.goodscount;
            params.exchangetype = detail.exchangetype;
            params.regioncode = detail.regioncode;
            const url = app.globalData.domain + '/api' + '/KDPMall/GetGoodsListByCondition';
            const snapshotdata = this.data.params.snapshotdata ? JSON.parse(this.data.params.snapshotdata) : [];
            snapshotdata.push({ url, req, res });
            params.snapshotdata = JSON.stringify(snapshotdata);
            this.setData({ params, shareData, detail, valid });
        });
    },
    checkKDPMember: function (phone) {
        kSvc.checkKDPMember(phone, (res) => {
            res = JSON.parse(res)[0];
            const params = this.data.params;
            params.crmnumber = res.crm_member_number;
            params.kdpnumber = res.kdp_member_number;
            this.setData({ params, isKDP: !!res.kdp_member_number });
        });
    },
    getItemContents() {

        kSvc.getItemDetails(this.data.guid, res => {
            const contentRole = res.filter(item => item.datatype === 'GoodsUseRuleContent');
            const contentPhone = res.filter(item => item.datatype === 'ShopTelephoneContent');
            const contents = res.filter(item => item.datatype === 'GoodsDetailContent');
            const url = app.globalData.domain + '/api' + '/KDPMall/GetGoodsDetailDescribe';
            const params = this.data.params;
            const snapshotdata = this.data.params.snapshotdata ? JSON.parse(this.data.params.snapshotdata) : [];
            const req = { goodsGuid: this.data.guid };
            snapshotdata.push({ url, req, res });
            params.snapshotdata = JSON.stringify(snapshotdata);
            this.setData({
                contents: contents,
                contentRole,
                contentPhone,
                params
            });
            //console.log('121212',snapshotdata);
        });
    },
    getItemSwipers() {
        kSvc.getItemSwipers(this.data.guid, res => {
            this.setData({
                swipers: res,
            });
            const url = app.globalData.domain + '/api' + '/KDPMall/GetGoodsDetailViewPager';
            const params = this.data.params;
            const snapshotdata = this.data.params.snapshotdata ? JSON.parse(this.data.params.snapshotdata) : [];
            const req = { goodsGuid: this.data.guid };
            snapshotdata.push({ url, req, res });
            params.snapshotdata = JSON.stringify(snapshotdata);
            this.setData({ params });
        });
    },
    getNum(e) {
        const params = this.data.params;
        params.goodscount = e.detail;
        params.totalkdppoints = this.data.detail.kdppoints * params.goodscount;
        this.setData({ params });
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
            this.getData();
        } else {
            app.appIsOnloadCallback = () => {
                this.getMeta();
                this.getData();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        self = this;
        console.log(self.data);
        return {
            title: self.data.shareData.title,
            path: self.data.shareData.path,
            imageUrl: self.data.shareData.imageUrl,
            success: res => { }
        }
    }
})