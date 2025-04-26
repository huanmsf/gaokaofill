// AI服务配置
const AIConfig = {
  // DeepSeek R1配置
  deepseekR1: {
    apiKey: 'sk-46d843cafcee469c91dc7494518b4a02',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    maxTokens: 2000,
    temperature: 0.7
  },
  
  // DeepSeek V3配置
  deepseekV3: {
    apiKey: 'sk-46d843cafcee469c91dc7494518b4a02',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    maxTokens: 2000,
    temperature: 0.7
  },
  
  // 豆包配置
  doubao: {
    apiKey: '94886b10-8f02-41bf-ba20-4f11e3bab1c1', // 需要替换为实际的API Key
    apiUrl: 'https://api.doubao.com/v1/chat/completions',
    model: 'doubao-chat',
    maxTokens: 2000,
    temperature: 0.7
  }
}

export default AIConfig 