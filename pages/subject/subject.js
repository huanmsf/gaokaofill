Page({
  data: {
    provinces: ['北京', '上海', '广东', '江苏', '浙江', '山东', '四川', '湖北', '湖南', '河南'],
    provinceIndex: 0,
    totalScore: '',
    selectedSubjects: []
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '设置选科分数'
    });
  },

  bindProvinceChange: function(e) {
    this.setData({
      provinceIndex: e.detail.value
    });
  },

  bindTotalScoreInput: function(e) {
    this.setData({
      totalScore: e.detail.value
    });
  },

  toggleSubject: function(e) {
    const subject = e.currentTarget.dataset.subject;
    let selectedSubjects = [...this.data.selectedSubjects];
    
    // 检查是否是首选科目（物理或历史）
    const isFirstChoice = subject === '物理' || subject === '历史';
    
    if (isFirstChoice) {
      // 如果已经选择了另一个首选科目，先移除它
      const otherFirstChoice = subject === '物理' ? '历史' : '物理';
      const index = selectedSubjects.indexOf(otherFirstChoice);
      if (index > -1) {
        selectedSubjects.splice(index, 1);
      }
    } else {
      // 检查是否已经选择了两个再选科目
      const secondChoiceCount = selectedSubjects.filter(s => s !== '物理' && s !== '历史').length;
      if (secondChoiceCount >= 2 && !selectedSubjects.includes(subject)) {
        wx.showToast({
          title: '最多选择两门再选科目',
          icon: 'none'
        });
        return;
      }
    }

    const index = selectedSubjects.indexOf(subject);
    if (index > -1) {
      selectedSubjects.splice(index, 1);
    } else {
      selectedSubjects.push(subject);
    }

    this.setData({
      selectedSubjects
    });
  },

  submitScores: function() {
    if (!this.data.totalScore) {
      wx.showToast({
        title: '请输入总分',
        icon: 'none'
      });
      return;
    }

    // 检查是否选择了首选科目
    const hasFirstChoice = this.data.selectedSubjects.includes('物理') || this.data.selectedSubjects.includes('历史');
    if (!hasFirstChoice) {
      wx.showToast({
        title: '请选择物理或历史',
        icon: 'none'
      });
      return;
    }

    // 检查是否选择了两个再选科目
    const secondChoiceCount = this.data.selectedSubjects.filter(s => s !== '物理' && s !== '历史').length;
    if (secondChoiceCount !== 2) {
      wx.showToast({
        title: '请选择两门再选科目',
        icon: 'none'
      });
      return;
    }

    // 保存数据到本地存储
    wx.setStorageSync('subjectData', {
      province: this.data.provinces[this.data.provinceIndex],
      subjects: this.data.selectedSubjects,
      totalScore: this.data.totalScore
    });

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
      success: function() {
        setTimeout(function() {
          wx.navigateBack();
        }, 2000);
      }
    });
  }
}); 