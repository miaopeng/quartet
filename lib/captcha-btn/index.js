const DEFAULT_COUNTDOWN = 60;
const isValidPhone = (phone = '') => {
  const rePhoneNo = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,2-9]))\d{8}$/;
  return !!phone.match(rePhoneNo);
};

Component({
  externalClasses: ['theme-cls'],
  observers: {
    status(status) {
      switch (status) {
        case 'countdown':
          this.start();
          break;
        case 'idle':
          this.reset();
          break;
        default:
          break;
      }
    }
  },
  properties: {
    mobile: String, // 需要发送验证码的手机号
    status: {
      // 状态: countdown: 正在计数; idle: 闲置
      type: String,
      value: 'idle'
    },
    countdown: {
      // 计数的起始数字
      type: Number,
      value: DEFAULT_COUNTDOWN
    },
    label: {
      // 按钮上的文字
      type: String,
      value: '获取验证码'
    },
    disabled: {
      // 是否置为不可用
      type: Boolean,
      value: false
    }
  },

  lifetimes: {
    attached() {
      const { countdown } = this.data;
      this.setData({
        count: countdown
      });
    },
    detached() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },

  methods: {
    handleClick() {
      const { mobile, disabled } = this.data;
      if (disabled) {
        return;
      }

      if (!isValidPhone(mobile)) {
        wx.showToast({
          title: '请填写正确的手机号',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      this.setData({
        disabled: true,
        label: '发送中'
      });

      this.triggerEvent('fetch');
    },

    reset() {
      this.setData({
        count: this.data.countdown,
        label: '获取验证码',
        disabled: false
      });
    },

    start() {
      this.setData({
        count: this.data.countdown
      });
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        if (this.data.count <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.setData({ status: 'idle' });
          return;
        }
        console.log('count ', this.data.count);
        this.setData({
          count: this.data.count - 1,
          label: `${this.data.count}s`
        });
      }, 1000);
    }
  }
});
