Page({
  data: {
    categories: ['全部', '工学', '理学', '医学', '农学', '文学', '历史学', '哲学', '经济学', '管理学', '法学', '教育学', '艺术学'],
    levels: ['全部', '本科', '专科'],
    selectedCategory: '全部',
    selectedLevel: '全部',
    majors: []
  },

  onLoad() {
    this.loadMajors();
  },

  onCategoryChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedCategory: this.data.categories[index]
    });
    this.filterMajors();
  },

  onLevelChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedLevel: this.data.levels[index]
    });
    this.filterMajors();
  },

  loadMajors() {
    // 模拟数据
    const mockMajors = [
      {
        id: 1,
        name: '计算机科学与技术',
        category: '工学',
        level: '本科',
        description: '计算机科学与技术专业培养具有良好的科学素养，系统地掌握计算机科学与技术的基本理论、基本知识和基本技能与方法的高级专门人才。'
      },
      {
        id: 2,
        name: '临床医学',
        category: '医学',
        level: '本科',
        description: '临床医学专业培养具备基础医学、临床医学的基本理论和医疗预防的基本技能，能在医疗卫生单位、医学科研等部门从事医疗及预防、医学科研等方面工作的医学高级专门人才。'
      },
      {
        id: 3,
        name: '金融学',
        category: '经济学',
        level: '本科',
        description: '金融学专业培养具备金融学方面的理论知识和业务技能，能在银行、证券、投资、保险及其他经济管理部门和企业从事相关工作的专门人才。'
      },
      {
        id: 4,
        name: '软件技术',
        category: '工学',
        level: '专科',
        description: '软件技术专业培养掌握软件开发的基本理论、基本知识和基本技能，具备较强的软件开发能力和良好的职业素养的高素质技能型专门人才。'
      },
      {
        id: 5,
        name: '护理学',
        category: '医学',
        level: '专科',
        description: '护理学专业培养具备人文社会科学、医学、预防保健的基本知识及护理学的基本理论知识和技能，能在护理领域内从事临床护理、预防保健、护理管理、护理教学和护理科研的高级专门人才。'
      }
    ];
    
    this.setData({
      majors: mockMajors
    });
  },

  filterMajors() {
    let filteredMajors = [...this.data.majors];
    
    if (this.data.selectedCategory && this.data.selectedCategory !== '全部') {
      filteredMajors = filteredMajors.filter(major => major.category === this.data.selectedCategory);
    }
    
    if (this.data.selectedLevel && this.data.selectedLevel !== '全部') {
      filteredMajors = filteredMajors.filter(major => major.level === this.data.selectedLevel);
    }
    
    this.setData({
      majors: filteredMajors
    });
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/major-detail/major-detail?id=${id}`
    });
  }
}); 