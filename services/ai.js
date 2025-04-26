import AIConfig from '../config/ai'

class AIService {
  constructor() {
    this.currentProvider = 'deepseekR1'
    this.conversationHistory = []
    this.model = null
    this.isInitialized = false
    this._initModel()
    this.onStreamMessage = null // 用于接收流式消息的回调
  }

  // 设置流式消息回调
  setOnStreamMessage(callback) {
    this.onStreamMessage = callback
  }

  // 初始化模型
  async _initModel() {
    try {
      console.log('【AI服务】开始初始化模型')
      // 初始化云开发
      wx.cloud.init({
        env: "cloudbase-7g5jqqg4fa69ea3e",
        traceUser: true
      })
      
      // 创建模型
      this.model = wx.cloud.extend.AI.createModel("deepseek")
      this.isInitialized = true
      console.log('【AI服务】模型初始化成功')
    } catch (error) {
      console.error('【AI服务】模型初始化失败:', error)
      throw error
    }
  }

  // 发送消息到AI
  async sendMessage(message) {
    try {
      console.log('【AI服务】开始发送消息')
      console.log('【AI服务】输入消息内容:', message)
      
      // 等待模型初始化完成
      if (!this.isInitialized) {
        console.log('【AI服务】等待模型初始化...')
        await new Promise(resolve => {
          const checkInitialized = () => {
            if (this.isInitialized) {
              resolve()
            } else {
              setTimeout(checkInitialized, 100)
            }
          }
          checkInitialized()
        })
      }

      // 添加用户消息到历史记录
      this.conversationHistory.push({
        role: 'user',
        content: message
      })
      console.log('【AI服务】当前对话历史:', JSON.stringify(this.conversationHistory, null, 2))

      if (!this.model) {
        throw new Error('模型未初始化')
      }

      // 使用流式生成文本
      console.log('【AI服务】开始调用模型生成文本')
      const requestData = {
        model: "deepseek-r1",
        messages: this.conversationHistory
      }
      console.log('【AI服务】请求数据:', JSON.stringify(requestData, null, 2))
      
      const res = await this.model.streamText({
        data: requestData
      })
      console.log('【AI服务】模型调用成功，开始接收流式响应')

      let fullResponse = ''
      for await (let event of res.eventStream) {
        if (event.data === '[DONE]') {
          console.log('【AI服务】流式响应结束')
          continue
        }
        const data = JSON.parse(event.data)
        console.log('【AI服务】收到流式数据:', JSON.stringify(data, null, 2))
        
        // 打印思维链内容
        const think = (data?.choices?.[0]?.delta)?.reasoning_content
        if (think) {
          console.log('【AI服务】思维链:', think)
        }
        
        // 打印生成文本内容
        const text = data?.choices?.[0]?.delta?.content
        if (text) {
          console.log('【AI服务】生成文本:', text)
          fullResponse += text
          // 实时回调流式消息
          if (this.onStreamMessage) {
            console.log('【AI服务】调用流式消息回调:', text)
            this.onStreamMessage(text)
          }
        }
      }

      // 添加AI回复到历史记录
      this.conversationHistory.push({
        role: 'assistant',
        content: fullResponse
      })
      console.log('【AI服务】完整对话历史:', JSON.stringify(this.conversationHistory, null, 2))
      console.log('【AI服务】完整响应内容:', fullResponse)

      return fullResponse
    } catch (error) {
      console.error('【AI服务】错误:', {
        message: error.message,
        stack: error.stack,
        errMsg: error.errMsg
      })
      throw error
    }
  }

  // 清空对话历史
  clearHistory() {
    this.conversationHistory = []
    console.log('【AI服务】对话历史已清空')
  }
}

export default new AIService() 