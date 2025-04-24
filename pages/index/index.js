// index.js
Page({
  data: {
    riskData: {
      high: 2,    // 有风险
      medium: 3,  // 较稳妥
      low: 5      // 可保底
    },
    newsList: [
      {
        id: 1,
        title: '2024年高考报名人数再创新高，达到1291万人',
        time: '2024-06-07'
      },
      {
        id: 2,
        title: '清华大学公布2024年本科招生计划，新增人工智能专业',
        time: '2024-06-06'
      },
      {
        id: 3,
        title: '北京大学2024年招生政策解读：新增交叉学科专业',
        time: '2024-06-05'
      },
      {
        id: 4,
        title: '教育部：2024年高考改革方案正式发布',
        time: '2024-06-04'
      },
      {
        id: 5,
        title: '浙江大学2024年招生计划公布，新增数据科学专业',
        time: '2024-06-03'
      }
    ]
  },
  
  // 跳转到选科页面
  navigateToSubject() {
    wx.navigateTo({
      url: '/pages/subject/subject'
    })
  },

  // 跳转到客服页面
  showCustomerService() {
    wx.navigateTo({
      url: '/pages/service/service'
    })
  },

  // 跳转到推荐列表页面
  navigateToRecommend(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/recommend/recommend?type=${type}`
    })
  },

  // 跳转到新闻详情页
  navigateToNewsDetail(e) {
    console.log(11111111)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news/detail?id=${id}`
    })
  },

  startInput: function() {
    wx.navigateTo({
      url: '/pages/input/input'
    })
  }
})
