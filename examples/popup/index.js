Page({
  data: {
    modalVisible: false,
  },

  showModal() {
    this.setData({ modalVisible: true });
  },
  hideModal() {
    this.setData({ modalVisible: false });
  }
});