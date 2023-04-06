export default {

  broadcastAddEventListener(type, callback) {
    const {broadcastEvents} = getApp()
    let event = broadcastEvents.find(item => item.type === type)
    if (!event) {
      event = {type, data: []}
      broadcastEvents.push(event)
    }
    const index = event.data.push(callback)
    return () => event.data.splice(index, 1)
  },

  broadcastSendEvent(type, data) {
    const {broadcastEvents} = getApp()
    const event = broadcastEvents.find(item => item.type === type)
    if (event) {
      event.data.forEach(cb => cb(data))
    }
  },

  broadcastRemoveEventListener(type, callback) {
    const {broadcastEvents} = getApp()
    let index = broadcastEvents.findIndex(item => item.type === type)
    if (index === -1) return
    if (callback) {
      return broadcastEvents.splice(index, 1)
    }
    const event = broadcastEvents[index]
    index = event.data.findIndex(item => item === callback)
    if (index > -1) {
      event.data.splice(index, 1)
    }
  },

}
