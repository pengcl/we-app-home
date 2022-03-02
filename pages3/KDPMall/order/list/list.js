import kSvc from "../../service";
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '',
        userInfo: app.globalData.userInfo,
        userPhone: '',
        orders: [],
        filterOrders: null,
        count: {
            全部: 0,
            未使用: 0,
            已使用: 0,
            即将过期: 0,
            已过期: 0
        },
        page: 0,
        pageSize: 10,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    page() {
        this.setData({ loading: true });
        setTimeout(() => {
            if (this.data.filterOrders.length === this.data.orders.length) {
                this.setData({ loading: false });
                return false;
            }
            this.setData({ loading: false });
            this.setData({ page: this.data.page + 1 });
            this.getFilterOrders();
        }, 500);
    },
    getFilterOrders(status) {
        let filterOrders = this.data.filterOrders || [];
        const orders = this.data.orders.filter(item => item.status === status || !status);
        filterOrders = filterOrders.concat(orders.slice(this.data.page * this.data.pageSize, this.data.pageSize * (this.data.page + 1)));
        this.setData({ filterOrders });
    },
    getMeta() {
        const userInfo = wx.getStorageSync("UserInfo");
        const userPhone = wx.getStorageSync("PhoneNum");
        this.setData({
            userInfo,
            userPhone
        });
    },

    getData() {
        kSvc.getOrders(this.data.userPhone, orders => {
            const count = {
                全部: 0,
                未使用: 0,
                已使用: 0,
                即将过期: 0,
                已过期: 0
            };
            orders.forEach(order => {
                count['全部'] = count['全部'] + 1;
                count[order.status] = count[order.status] + 1;
            });
            this.setData({ orders, count });
            this.filterData('');
        });
    },

    tabChange(e) {
        this.setData({ status: e.currentTarget.dataset.status });
        this.filterData(e.currentTarget.dataset.status);
    },

    filterData(status) {
        this.setData({ page: 0, filterOrders: null });
        this.getFilterOrders(status);
        this.goTop();
    },

    link(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
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
        this.page();
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