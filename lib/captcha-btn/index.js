const DEFAULT_COUNTDOWN = 60;
const isValidPhone = function (phone) {
  const phone = phone + '';
  const rePhoneNo = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,2-9]))\d{8}$/;
  return !!phone.match(rePhoneNo);
};

Component({
  properties: {
    mobile: String,
    url: String,
    countdown: {
      type: Number,
      value: DEFAULT_COUNTDOWN,
    },
    label: {
      type: String,
      value: '获取验证码',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    handleClick() {
      const { mobile, url, disabled } = this.data;
      if (disabled || !url) {
        return;
      }

      if (!isValidPhone(this.data.mobile)) {
        wx.showToast({
          title: '请填写正确的手机号',
          icon: 'none',
          duration: 2000,
        });
        return;
      }

      this.setData({
        disabled: true,
        label: '发送中',
      });

      wx.request({
        url,
        method: 'POST',
        data: {
          mobile,
        },
        fail: () => {
          wx.showToast({
            title: '验证码发送失败',
            icon: 'none',
            duration: 2000,
          });
          this.reset();
        },
        success: res => {
          if (!res || !res.data) {
            wx.showToast({
              title: '验证码发送失败',
              icon: 'none',
              duration: 2000,
            });
            this.reset();
            return;
          }
          
          if (res.data.code === 1) {
            wx.showToast({
              title: '手机验证码已发送, 请注意查收',
              icon: 'none',
              duration: 2000,
            });
            this.countdown();
          } else if(res.data.code === 200) {
            wx.showToast({
              title: '该手机号已注册，请直接登录' || '验证码发送失败',
              icon: 'none',
              duration: 2000,
            });
            this.reset();
          } else {
            wx.showToast({
              title: '该手机号未注册，请注册' || '验证码发送失败',
              icon: 'none',
              duration: 2000,
            });
            this.reset();
          }
        },
      });
    },

    reset() {
      this.setData({
        countdown: DEFAULT_COUNTDOWN,
        label: '获取验证码',
        disabled: false
      });
    },

    countdown() {
      this.setData({
        countdown: DEFAULT_COUNTDOWN,
      });
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        if (this.data.countdown <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.reset();
          return;
        }
        this.setData({
          countdown: this.data.countdown - 1,
          label: `${this.data.countdown}s`
        });
      }, 1000);
    },
  },
});
