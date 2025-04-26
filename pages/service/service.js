import AIService from '../../services/ai'

Page({
  data: {
    inputValue: '',
    messages: [],
    scrollToView: 'welcome',
    messageId: 0,
    isLoading: false
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '智能助手'
    })
    // 添加欢迎消息
    this.addMessage('service', '你好！我是高考志愿助手，有什么可以帮助你的吗？')
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 发送消息
  async sendMessage() {
    if (!this.data.inputValue.trim() || this.data.isLoading) return

    const userMessage = {
      id: ++this.data.messageId,
      type: 'user',
      content: this.data.inputValue
    }

    // 添加用户消息
    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: '',
      scrollToView: `msg-${userMessage.id}`,
      isLoading: true
    })

    try {
      // 显示加载提示
      wx.showLoading({
        title: '思考中...',
        mask: true
      })

      // 发送消息到AI
      const response = await AIService.sendMessage(userMessage.content)

      // 添加AI回复
      const aiMessage = {
        id: ++this.data.messageId,
        type: 'service',
        content: response
      }

      this.setData({
        messages: [...this.data.messages, aiMessage],
        scrollToView: `msg-${aiMessage.id}`,
        isLoading: false
      })
    } catch (error) {
      console.error('发送消息失败:', error)
      wx.showToast({
        title: '发送消息失败，请稍后重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
      this.setData({ isLoading: false })
    }
  },

  // 添加消息
  addMessage(type, content) {
    const message = {
      id: ++this.data.messageId,
      type,
      content
    }
    this.setData({
      messages: [...this.data.messages, message],
      scrollToView: `msg-${message.id}`
    })
  },

  onUnload() {
    // 清空对话历史
    AIService.clearHistory()
  }
}) 