Page({
  data: {
    userInfo: {},
    recommendations: [],
    filteredRecommendations: [],
    regions: ['全部地区', '北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都', '西安'],
    regionFilterIndex: 0,
    majors: ['全部专业', '计算机科学与技术', '软件工程', '人工智能', '电子信息工程', '机械工程', '土木工程', '临床医学', '金融学', '会计学'],
    majorFilterIndex: 0
  },

  onLoad: function(options) {
    if (options.data) {
      const userInfo = JSON.parse(options.data)
      this.setData({
        userInfo: userInfo
      })
      this.getRecommendations(userInfo)
    }
  },

  getRecommendations: function(userInfo) {
    wx.showLoading({
      title: '正在生成推荐...',
    })

    // 调用云函数获取推荐结果
    wx.cloud.callFunction({
      name: 'getRecommendations',
      data: userInfo,
      success: res => {
        console.log('获取推荐成功', res)
        this.setData({
          recommendations: res.result.recommendations,
          filteredRecommendations: res.result.recommendations
        })
      },
      fail: err => {
        console.error('获取推荐失败', err)
        wx.showToast({
          title: '获取推荐失败，请重试',
          icon: 'none'
        })
        // 使用模拟数据作为备选
        this.setMockRecommendations(userInfo)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  setMockRecommendations: function(userInfo) {
    // 模拟数据
    const mockData = [
      {
        name: '北京大学',
        minScore: 680,
        minRank: 100,
        region: '北京',
        tags: ['985', '211', '双一流'],
        majors: [
          {
            name: '计算机科学与技术',
            minScore: 690
          },
          {
            name: '软件工程',
            minScore: 685
          }
        ]
      },
      {
        name: '清华大学',
        minScore: 690,
        minRank: 50,
        region: '北京',
        tags: ['985', '211', '双一流'],
        majors: [
          {
            name: '人工智能',
            minScore: 695
          },
          {
            name: '电子信息工程',
            minScore: 690
          }
        ]
      }
    ]

    // 根据用户分数和排名筛选合适的学校
    const recommendations = mockData.filter(school => {
      return school.minScore <= userInfo.score && school.minRank >= userInfo.rank
    })

    this.setData({
      recommendations: recommendations,
      filteredRecommendations: recommendations
    })
  },

  bindRegionFilterChange: function(e) {
    this.setData({
      regionFilterIndex: e.detail.value
    })
    this.filterRecommendations()
  },

  bindMajorFilterChange: function(e) {
    this.setData({
      majorFilterIndex: e.detail.value
    })
    this.filterRecommendations()
  },

  filterRecommendations: function() {
    const { recommendations, regionFilterIndex, majorFilterIndex, regions, majors } = this.data
    const selectedRegion = regions[regionFilterIndex]
    const selectedMajor = majors[majorFilterIndex]

    const filtered = recommendations.filter(school => {
      // 地区过滤
      if (selectedRegion !== '全部地区' && school.region !== selectedRegion) {
        return false
      }
      // 专业过滤
      if (selectedMajor !== '全部专业') {
        return school.majors.some(major => major.name === selectedMajor)
      }
      return true
    })

    this.setData({
      filteredRecommendations: filtered
    })
  },

  goBack: function() {
    wx.navigateBack()
  },

  onShareAppMessage: function() {
    return {
      title: '我的高考志愿推荐结果',
      path: '/pages/result/result?data=' + JSON.stringify(this.data.userInfo)
    }
  }
}) 