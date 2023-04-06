//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Broadcast,
    WowPage.wow$.mixins.Config,


  ],
  data: {
    event: 'enrollList',
    selected: [],
  },
  lifetimes: {
    attached() {
      this.data.unbind = this.broadcastAddEventListener(this.data.event, this.handleLocation.bind(this))
      this.getenrollList()
    },
    detached() {
      if (this.data.unbind) {
        this.data.unbind()
      }
    },
  },
  methods: {
    handleRefresh(type) {
      const refWowScroll = this.selectComponent('#wowScroll')
      if (refWowScroll) {
        refWowScroll.returnTop()
      }
      this.pagingRefresh(type)
    },
    getenrollList() {
      const {api$} = this.data
      this.curl(api$.REQ_NATIONWIDE_AUCTION_LIST, {}, {
        method: 'GET'
      }).then(res => {
        this.setData({
          nationwideAuctionList: res.dataList,
        })
        console.log("res=>", res)
      }).toast()
    },
    pagingGetUrlParamsOptions() {
      const {api$, selected} = this.data
      console.log("api$=>", api$)
      const cityList = selected.length ? selected.map(item => item.value) : ['全国']
      return {
        url: api$.REQ_AUCTION_LIST,
        params: {cityList}
      }
    },
  }
})

