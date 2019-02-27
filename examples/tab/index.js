const app = getApp()

Page({
  data: {
    currentTab: 'tab-tracing',
  },

  handleChangeTab({ detail }) {
    this.setData({
      currentTab: detail.key,
    });
  },
})
