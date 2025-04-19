Page({
  data: {
    provinces: ['北京', '上海', '广东', '江苏', '浙江', '山东', '河南', '河北', '四川', '湖北'],
    provinceIndex: 0,
    types: ['文科', '理科'],
    typeIndex: 0,
    score: '',
    rank: ''
  },

  bindProvinceChange: function(e) {
    this.setData({
      provinceIndex: e.detail.value
    })
  },

  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  bindScoreInput: function(e) {
    this.setData({
      score: e.detail.value
    })
  },

  bindRankInput: function(e) {
    this.setData({
      rank: e.detail.value
    })
  },

  submitInfo: function() {
    if (!this.data.score || !this.data.rank) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    const userInfo = {
      province: this.data.provinces[this.data.provinceIndex],
      type: this.data.types[this.data.typeIndex],
      score: this.data.score,
      rank: this.data.rank
    }

    // 保存用户信息到云数据库
    wx.cloud.callFunction({
      name: 'saveUserInfo',
      data: userInfo,
      success: res => {
        console.log('保存成功', res)
        // 跳转到结果页面
        wx.navigateTo({
          url: '/pages/result/result?data=' + JSON.stringify(userInfo)
        })
      },
      fail: err => {
        console.error('保存失败', err)
        wx.showToast({
          title: '保存失败，请重试',
          icon: 'none'
        })
      }
    })
  }
}) 