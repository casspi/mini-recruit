let tabItemIndex = 0

export default {
  onTabItemTap(event) {
    const {index} = event
    if (tabItemIndex !== index) {
      this.tabItemTapCallback && this.tabItemTapCallback()
    }
    tabItemIndex = index
  },
}
