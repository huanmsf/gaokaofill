Page({
  data: {
    inputValue: '',
    messages: [],
    scrollToView: 'welcome',
    messageId: 0
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '在线客服'
    })
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 发送消息
  sendMessage() {
    if (!this.data.inputValue.trim()) return

    const userMessage = {
      id: ++this.data.messageId,
      type: 'user',
      content: this.data.inputValue
    }

    // 添加用户消息
    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: '',
      scrollToView: `msg-${userMessage.id}`
    })

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: ++this.data.messageId,
        type: 'service',
        content: this.getAIResponse(userMessage.content)
      }

      this.setData({
        messages: [...this.data.messages, aiMessage],
        scrollToView: `msg-${aiMessage.id}`
      })
    }, 500)
  },

  // 模拟AI回复逻辑
  getAIResponse(userMessage) {
    // 这里可以根据用户消息返回相应的回复
    // 后续可以接入真实的AI接口
    const responses = [
      '根据你的问题，我建议你可以...',
      '这个问题比较复杂，让我为你详细分析一下...',
      '关于这个问题，主要有以下几个方面需要考虑...',
      '我理解你的困惑，建议你可以从以下几个角度思考...'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }
}) 