// component/stepper/stepper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 这里是一些组件内部数据
    // input默认是1 
    num: 1,
    // 使用data数据对象设置样式名 
    minusStatus: 'disabled',
    plusStatus: '',
  },
  methods: {
    // 这里放置自定义方法
    /* 点击减号 */
    bindMinus: function () {
      var num = this.data.num;
      // 如果大于1时，才可以减 
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      var plusStatus = num > this.data.max ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus,
        plusStatus: plusStatus
      });
      this.triggerEvent('num', this.data.num);
    },
    /* 点击加号 */
    bindPlus: function () {
      console.log(this.data.max);
      var num = this.data.num;
      // 不作过多考虑自增1 
      var num = this.data.num;
      // 如果大于1时，才可以减 
      if (num < this.data.max) {
        num++;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      var plusStatus = num >= this.data.max ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus,
        plusStatus: plusStatus
      });
      this.triggerEvent('num', this.data.num);
    },
    /* 输入框事件 */
    bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回 
      this.setData({
        num: num
      });
      this.triggerEvent('num', this.data.num);
    }
  }
})