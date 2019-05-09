Component({
  properties: {
    data: {
      type: Object,
      value: {
        isLastPage: false,
        pageNum: 1
      }
    },
    threshold: {
      type: Number,
      value: 50
    },
    pulling: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: 'THE END'
    },
    loadingColor: {
      type: String,
      value: '#B51E00'
    }
  },
  observers: {
    data() {
      this.setData({ pulling: false });
    }
  },
  methods: {
    onReachBottom() {
      const { data, pulling } = this.data;
      if (data && data.isLastPage != null && data.pageNum != null) {
        const { isLastPage, pageNum } = data;
        if (isLastPage) {
          this.triggerEvent('pager-lastpage');
        } else if (!pulling) {
          this.setData({ pulling: true });
          this.triggerEvent('pager-next', pageNum + 1);
        }
      }
    }
  }
});
