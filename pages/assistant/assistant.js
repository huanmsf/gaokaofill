Page({
  data: {
    messages: [],
    inputMessage: '',
    isLoading: false,
    hasSystemPrompt: false
  },

  onLoad(options) {
    console.log('assistant页面加载，参数:', options)
    this.checkAndSendSystemPrompt()
  },

  onShow() {
    console.log('assistant页面显示')
  },

  onReady() {
    console.log('assistant页面初次渲染完成')
  },

  async checkAndSendSystemPrompt() {
    console.log('检查是否需要发送系统提示词')
    // 检查是否是首次进入
    const isFirstEnter = !wx.getStorageSync('hasEnteredAssistant')
    console.log('是否是首次进入:', isFirstEnter)
    
    if (isFirstEnter) {
      console.log('首次进入，准备发送系统提示词')
      // 设置系统提示词
      const systemPrompt = `你是一个专业的高考志愿填报顾问，请遵循以下规则：
1. 根据考生今年的考试成绩和地区，结合往年的真实数据给出填报建议
2. 所有数据必须真实可靠，不能编造或虚构
3. 如果考生问的问题与志愿填报、学校专业等无关，请礼貌拒绝回答
4. 回答要专业、客观、全面，帮助考生做出最适合的选择
5. 可以分析不同学校和专业的优劣势，但不要给出绝对的建议
6. 提醒考生考虑个人兴趣、职业规划等因素
7. 如果遇到不确定的问题，可以说明原因，但不要给出错误信息`

      console.log('系统提示词内容:', systemPrompt)
      
      // 等待一段时间确保模型初始化完成
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 发送系统提示词
      await this.sendSystemMessage(systemPrompt)
      
      // 标记已进入过
      wx.setStorageSync('hasEnteredAssistant', true)
      console.log('已标记为已进入')
    }
  },

  // 发送系统消息
  async sendSystemMessage(message) {
    console.log('开始发送系统消息')
    try {
      // 添加系统消息到历史记录
      this.setData({
        messages: [...this.data.messages, { role: 'system', content: message }]
      })
      console.log('系统消息已添加到历史记录')

      // 设置流式消息回调
      aiService.setOnStreamMessage((text) => {
        console.log('收到流式消息:', text)
        const messages = this.data.messages
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content += text
          this.setData({ messages })
        }
      })

      // 发送消息
      console.log('开始调用AI服务发送消息')
      await aiService.sendMessage(message)
      console.log('系统消息发送完成')
    } catch (error) {
      console.error('发送系统消息失败:', error)
    }
  },

  // 发送消息
  async sendMessage() {
    if (!this.data.inputMessage.trim()) return

    const userMessage = this.data.inputMessage
    console.log('用户输入的消息:', userMessage)

    // 先添加用户消息到界面
    this.setData({
      inputMessage: '',
      messages: [...this.data.messages, { role: 'user', content: userMessage }],
      isLoading: true
    })

    try {
      // 每条消息都带上系统提示词
      const systemPrompt = `你是一个专业的高考志愿填报顾问，请遵循以下规则：
1. 根据考生今年的考试成绩和地区，结合往年的真实数据给出填报建议
2. 所有数据必须真实可靠，不能编造或虚构
3. 如果考生问的问题与志愿填报、学校专业等无关，请礼貌拒绝回答
4. 回答要专业、客观、全面，帮助考生做出最适合的选择
5. 可以分析不同学校和专业的优劣势，但不要给出绝对的建议
6. 提醒考生考虑个人兴趣、职业规划等因素
7. 如果遇到不确定的问题，可以说明原因，但不要给出错误信息

用户问题：${userMessage}`

      console.log('发送的消息（包含系统提示词）:', systemPrompt)

      // 添加一个空的助手消息，用于流式更新
      this.setData({
        messages: [...this.data.messages, { role: 'assistant', content: '' }]
      })

      // 设置流式消息回调
      aiService.setOnStreamMessage((text) => {
        console.log('收到流式消息:', text)
        const messages = this.data.messages
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content += text
          this.setData({ messages })
        }
      })

      // 发送消息
      await aiService.sendMessage(systemPrompt)
    } catch (error) {
      console.error('发送消息失败:', error)
      wx.showToast({
        title: '发送消息失败',
        icon: 'none'
      })
    } finally {
      this.setData({ isLoading: false })
    }
  },

  // 清空对话历史
  clearHistory() {
    this.setData({
      messages: [],
      hasSystemPrompt: false
    })
    aiService.clearHistory()
  }
}) 