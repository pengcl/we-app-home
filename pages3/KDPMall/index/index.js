import kSvc from "../service";
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: null,
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        regions: [],
        swipers: [],
        types: [],
        brands: [],
        points: 0,
        filterType: 0,
        filtersShow: false,
        position: 'bottom',
        duration: 300,
        page: 0,
        pageSize: 10,
        loading: false,
        filters: [
            { name: '专属体验', code: 'goodsTypeCode', items: [] },
            { name: '换领地点', code: 'brandcode', items: [] },
            {
                name: '积分范围', code: 'points', items: [
                    {
                        label: '0~4999',
                        code: '0~4999'
                    },
                    {
                        label: '5000~9999',
                        code: '5000~9999'
                    },
                    {
                        label: '10000~99999',
                        code: '10000~99999'
                    },
                    {
                        label: '100000以上',
                        code: '100000~'
                    },
                    {
                        label: '我可兑换',
                        code: '0~'
                    }
                ]
            }
        ],
        params: {
            minPoints: null,
            maxPoints: null,
            brandcode: null,
            goodsTypeCode: null,
            regionCode: null,
            goodsName: null,
            goodsGuid: null
        },
        goods: [],
        filterGoods: null,
        openid: app.globalData.openid,
        isKDP: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    setRegion(e) {
        const dataset = e.currentTarget.dataset;
        const params = this.data.params;
        params[dataset.key] = dataset.value;
        this.setData({ params });
        this.getGoods();
    },
    setParams(e) {
        const dataset = e.currentTarget.dataset;
        const params = this.data.params;
        const filters = this.data.filters;
        const type = filters.filter(item => item.code === dataset.key)[0];
        const typeItem = type.items.filter(item => item.code === dataset.value)[0];
        if (dataset.key === 'points') {
            type.items.forEach(item => {
                item.selected = false;
            });
            const itemCode = typeItem.code.split('~');
            if (itemCode[0] === params.minPoints && params.maxPoints === itemCode[1] ? itemCode[1] : null) {
                params.minPoints = null;
                params.maxPoints = null;
                typeItem.selected = false;
            } else {
                params.minPoints = itemCode[0];
                params.maxPoints = itemCode[1] ? itemCode[1] : null;
                console.log(params, typeItem.selected);
                typeItem.selected = true;
            }
        } else {
            let values = params[dataset.key] ? params[dataset.key].split(',') : [];
            if (values.indexOf(dataset.value) !== -1) {
                values = values.filter(item => item !== dataset.value);
                typeItem.selected = false;
            } else {
                typeItem.selected = true;
                values.push(dataset.value);
            }
            let value = '';
            values.forEach(item => {
                if (value) {
                    value = value + ',' + item
                } else {
                    value = item;
                }
            });
            params[dataset.key] = value;
            console.log(params[dataset.key]);
        }
        this.setData({ params, filters });
    },

    inputTyping(e) {
        const params = this.data.params;
        params.goodsName = e.detail.value;
        this.setData({ params: params });
        this.getGoods();
    },

    getData: function () {
        const userInfo = wx.getStorageSync("UserInfo");
        const phone = wx.getStorageSync("PhoneNum");
        this.checkKDPMember(phone);
        this.getRegions();
        this.getSwipers(phone);
        this.getPoints(phone);
        this.getTypes();
        this.getBrands();
        this.getGoods();
        this.setData({ phone });
    },

    checkKDPMember: function (phone) {
        kSvc.checkKDPMember(phone, (res) => {
            res = JSON.parse(res)[0];
            this.setData({ isKDP: !!res.kdp_member_number });
        });
    },

    page() {
        this.setData({ loading: true });
        setTimeout(() => {
            if (this.data.filterGoods.length === this.data.goods.length) {
                this.setData({ loading: false });
                return false;
            }
            this.setData({ loading: false });
            this.setData({ page: this.data.page + 1 });
            this.getFilterGoods();
        }, 500);
    },

    getFilterGoods() {
        let goods = JSON.parse(JSON.stringify(this.data.goods));
        goods = goods.sort((a, b) => {
            if (this.data.filterType === 2) {
                return b.kdppoints - a.kdppoints;
            } else {
                return a.kdppoints - b.kdppoints;
            }
        });
        let filterGoods = this.data.filterGoods || [];
        filterGoods = filterGoods.concat(goods.slice(this.data.page * this.data.pageSize, this.data.pageSize * (this.data.page + 1)));
        this.setData({ filterGoods });
    },

    soon() {
        wx.showToast({
            title: '敬请期待',
            icon: 'error',
            duration: 2000
        })

        setTimeout(() => {
            wx.hi
        });
    },

    confirmFilter() {
        this.setData({ filtersShow: false });
        this.getGoods();
    },
    onLeave() {
        this.setData({ filtersShow: false });
    },
    cancelFilter() {
        const filters = this.data.filters;
        const params = this.data.params;
        filters.forEach(filter => {
            filter.items.forEach(item => {
                item.selected = false;
            });
        });
        params.maxPoints = null;
        params.minPoints = null;
        params.brandcode = null;
        params.goodsTypeCode = null;
        this.setData({ filters, params });
    },

    getRegions: function () {
        kSvc.getRegions((res) => {
            this.setData({
                regions: res,
            });
        });
    },

    getPoints: function (phone) {
        wx.showLoading({
            mask: true,
            title: '加载中...',
        })
        kSvc.getPoints(phone, (res) => {
            this.setData({ points: res });
            const filters = this.data.filters;
            filters[2].items[filters[2].items.length - 1].code = '0~' + res;
            this.setData({ filters });
            wx.hideLoading({
                success: (res) => { },
            })
        });
    },

    getSwipers: function (phone) {
        kSvc.getSwipers(phone, (res) => {
            this.setData({
                swipers: res,
            });
        });
    },

    getTypes: function () {
        kSvc.getTypes(res => {
            const filters = this.data.filters;
            const items = [];
            res.forEach(item => {
                items.push({
                    label: item.goodstypename,
                    code: item.goodstypecode
                });
            });
            filters[0].items = items;
            this.setData({
                filters: filters,
            });
        });
    },

    getBrands: function () {
        kSvc.getBrands(res => {
            const filters = this.data.filters;
            const items = [];
            res.forEach(item => {
                items.push({
                    label: item.brandname,
                    code: item.brandcode
                });
            });
            filters[1].items = items;
            this.setData({
                filters: filters,
            });
        });
    },

    getGoods: function () {
        this.setData({ page: 0, filterGoods: null });
        kSvc.getGoods(this.data.params, res => {
            this.setData({
                goods: res,
            });
            this.getFilterGoods();
        });
    },
    onEnter(res) {
        console.log(res)
    },
    setDefult() {
        this.setData({
            filterType: 0,
            page: 0,
            filterGoods: null
        });
        this.getFilterGoods();
    },
    setPointsFilter() {
        this.setData({
            filterType: this.data.filterType === 1 ? 2 : 1,
            page: 0,
            filterGoods: null
        })
        this.getFilterGoods();
        return false;
        const goods = JSON.parse(JSON.stringify(this.data.goods));
        const filterGoods = goods.sort((a, b) => {
            if (this.data.filterType === 2) {
                return b.kdppoints - a.kdppoints;
            } else {
                return a.kdppoints - b.kdppoints;
            }
        });
        this.setData({ filterGoods });
    },
    link(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    webview(e) {
        wx.navigateTo({
            url: '/pages3/KDPMall/webview/webview?link=' + encodeURIComponent(e.currentTarget.dataset.url)
        })
    },
    xsjcrm_tap: function () {
        var timestamp = Date.parse(new Date());
        let url = "/union/nwccvip/login?appid=crm&timestamp=" + timestamp
        wx.navigateTo({
            url: url,
        })
    },
    imgTap(e) {
        console.log(e.currentTarget);
        const format = e.currentTarget.dataset.format;
        const url = e.currentTarget.dataset.url;
        console.log(format);
        if (format === 'imagelink' && url) {
            if (url.indexOf('http') !== -1) {
                this.webview(e);
            } else {
                this.link(e);
            }
        }
        console.log(format, url);
    },
    showFilters: function () {
        const position = 'bottom';
        const duration = 300;
        this.setData({
            filtersShow: true,
            duration,
            position
        });
    },
    onShareAppMessage() {
        return {
            title: 积分商城,
            success: res => { }
        }
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
            this.getData();
        } else {
            app.appIsOnloadCallback = () => {
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
        this.page();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    goTop: function (e) {  // 一键回到顶部
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
            })
        }
    }
})