import request from "../../utils/request";

const kSvc = {
    checkKDPMember: (phone, callback) => {
        request.postRequest(
            "/KDPMall/CheckIsKDPMember",
            { phone },
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getSwipers: (phone,callback) => {
        request.postRequest(
            "/KDPMall/GetIndexViewPager",
            {phone},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getRegions: (callback) => {
        request.postRequest(
            "/KDPMall/GetMallRegion",
            {},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getPoints: (phone, callback) => {
        request.postRequest(
            "/KDPMall/GetKDPPointsByUserPhone",
            { phone },
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getTypes: (callback) => {
        request.postRequest(
            "/KDPMall/GetGoodsTypeList",
            {},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getBrands: (callback) => {
        request.postRequest(
            "/KDPMall/GetBrandList",
            {},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getGoods: (params, callback) => {
        request.postRequest(
            "/KDPMall/GetGoodsListByCondition",
            params,
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getOrders: (phone, callback) => {
        request.postRequest(
            "/KDPMall/GetOrderListByUser",
            {phone:phone},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getOrder: (phone,orderno, callback) => {
        request.postRequest(
            "/KDPMall/GetOrderListByUser",
            {phone},
            (res) => {
                if (res.StatusCode == 200) {
                    const items = res.Data ? JSON.parse(res.Data) : [];
                    callback(items.filter(item => item.orderno === orderno)[0]);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getItemSwipers: (guid, callback) => {
        request.postRequest(
            "/KDPMall/GetGoodsDetailViewPager",
            {goodsGuid:guid},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getItem: (guid, callback) => {
        request.postRequest(
            "/KDPMall/GetGoodsListByCondition",
            {},
            (res) => {
                if (res.StatusCode == 200) {
                    const items = res.Data ? JSON.parse(res.Data) : [];
                    callback(items.filter(item => item.goodsguid === guid)[0]);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getItemDetails: (guid, callback) => {
        request.postRequest(
            "/KDPMall/GetGoodsDetailDescribe",
            {goodsGuid:guid},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    submit: (params, callback) => {
        request.postRequest(
            "/KDPMall/SubmitOrder",
            params,
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                }else if(res.StatusCode == 900){
                    callback(false);
                    if(typeof res !== 'object'){
                        res = JSON.parse(res)
                    }
                    wx.showModal({
                        title: '',
                        showCancel:false,
                        content: res.Data,
                        confirmText:'我知道了',
                        success (res) {
                        }
                      })
                } else {
                    callback(false);
                    if(typeof res !== 'object'){
                        res = JSON.parse(res)
                    }
                    wx.showModal({
                        title: '',
                        showCancel:false,
                        content: '服务器繁忙，请稍后重试',
                        confirmText:'我知道了',
                        success (res) {
                        }
                      })
                }
            },
            err => {
                console.log(err);
            }
        );
    },
    getCodes: (orderno, callback) => {
        request.postRequest(
            "/KDPMall/GetOrderDetailByOrderNo",
            {orderno},
            (res) => {
                if (res.StatusCode == 200) {
                    callback(res.Data ? JSON.parse(res.Data) : []);
                } else {
                }
            },
            err => {
                console.log(err);
            }
        );
    }
};

module.exports = kSvc;