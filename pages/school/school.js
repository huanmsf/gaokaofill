Page({
  data: {
    provinces: ['全部', '北京', '上海', '广东', '江苏', '浙江', '湖北', '四川', '陕西', '山东', '湖南', '河南', '河北', '福建', '安徽', '辽宁', '吉林', '黑龙江', '江西', '山西', '重庆', '天津', '广西', '云南', '贵州', '甘肃', '海南', '宁夏', '青海', '新疆', '西藏', '内蒙古'],
    schoolTypes: ['全部', '985', '211', '一本', '二本', '三本', '专科'],
    selectedProvince: '全部',
    selectedType: '全部',
    schools: []
  },

  onLoad() {
    this.loadSchools();
  },

  onProvinceChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedProvince: this.data.provinces[index]
    });
    this.filterSchools();
  },

  onTypeChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedType: this.data.schoolTypes[index]
    });
    this.filterSchools();
  },

  loadSchools() {
    // 模拟数据
    const mockSchools = [
      { id: 1, name: '清华大学', is985: true, is211: true, type: '一本', rank: 1, province: '北京' },
      { id: 2, name: '北京大学', is985: true, is211: true, type: '一本', rank: 2, province: '北京' },
      { id: 3, name: '浙江大学', is985: true, is211: true, type: '一本', rank: 3, province: '浙江' },
      { id: 4, name: '上海交通大学', is985: true, is211: true, type: '一本', rank: 4, province: '上海' },
      { id: 5, name: '复旦大学', is985: true, is211: true, type: '一本', rank: 5, province: '上海' },
      { id: 6, name: '南京大学', is985: true, is211: true, type: '一本', rank: 6, province: '江苏' },
      { id: 7, name: '武汉大学', is985: true, is211: true, type: '一本', rank: 7, province: '湖北' },
      { id: 8, name: '中山大学', is985: true, is211: true, type: '一本', rank: 8, province: '广东' },
      { id: 9, name: '华中科技大学', is985: true, is211: true, type: '一本', rank: 9, province: '湖北' },
      { id: 10, name: '四川大学', is985: true, is211: true, type: '一本', rank: 10, province: '四川' },
      { id: 11, name: '西安交通大学', is985: true, is211: true, type: '一本', rank: 11, province: '陕西' },
      { id: 12, name: '哈尔滨工业大学', is985: true, is211: true, type: '一本', rank: 12, province: '黑龙江' },
      { id: 13, name: '北京师范大学', is985: true, is211: true, type: '一本', rank: 13, province: '北京' },
      { id: 14, name: '南开大学', is985: true, is211: true, type: '一本', rank: 14, province: '天津' },
      { id: 15, name: '天津大学', is985: true, is211: true, type: '一本', rank: 15, province: '天津' },
      { id: 16, name: '山东大学', is985: true, is211: true, type: '一本', rank: 16, province: '山东' },
      { id: 17, name: '厦门大学', is985: true, is211: true, type: '一本', rank: 17, province: '福建' },
      { id: 18, name: '东南大学', is985: true, is211: true, type: '一本', rank: 18, province: '江苏' },
      { id: 19, name: '同济大学', is985: true, is211: true, type: '一本', rank: 19, province: '上海' },
      { id: 20, name: '北京航空航天大学', is985: true, is211: true, type: '一本', rank: 20, province: '北京' }
    ];
    
    this.setData({
      schools: mockSchools.sort((a, b) => a.rank - b.rank)
    });
  },

  filterSchools() {
    let filteredSchools = [...this.data.schools];
    
    if (this.data.selectedProvince && this.data.selectedProvince !== '全部') {
      filteredSchools = filteredSchools.filter(school => school.province === this.data.selectedProvince);
    }
    
    if (this.data.selectedType && this.data.selectedType !== '全部') {
      if (this.data.selectedType === '985') {
        filteredSchools = filteredSchools.filter(school => school.is985);
      } else if (this.data.selectedType === '211') {
        filteredSchools = filteredSchools.filter(school => school.is211);
      } else {
        filteredSchools = filteredSchools.filter(school => school.type === this.data.selectedType);
      }
    }
    
    this.setData({
      schools: filteredSchools.sort((a, b) => a.rank - b.rank)
    });
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/school-detail/school-detail?id=${id}`
    });
  }
}); 