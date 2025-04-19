Page({
  data: {
    type: '', // 风险类型：high/medium/low
    title: '', // 页面标题
    list: [] // 推荐列表数据
  },

  onLoad(options) {
    const type = options.type || 'high';
    const titles = {
      high: '有风险院校推荐',
      medium: '较稳妥院校推荐',
      low: '可保底院校推荐'
    };
    
    this.setData({
      type,
      title: titles[type]
    });

    // 模拟数据，实际项目中应该从服务器获取
    this.loadRecommendList(type);
  },

  loadRecommendList(type) {
    // 模拟数据
    const mockData = {
      high: [
        {
          schoolName: '北京大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 680 },
            { name: '软件工程', minScore: 675 },
            { name: '人工智能', minScore: 678 },
            { name: '数据科学与大数据技术', minScore: 676 }
          ]
        },
        {
          schoolName: '清华大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 675 },
            { name: '软件工程', minScore: 672 },
            { name: '人工智能', minScore: 674 },
            { name: '网络工程', minScore: 670 }
          ]
        }
      ],
      medium: [
        {
          schoolName: '浙江大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 650 },
            { name: '软件工程', minScore: 645 },
            { name: '人工智能', minScore: 648 },
            { name: '数据科学与大数据技术', minScore: 646 }
          ]
        },
        {
          schoolName: '复旦大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 645 },
            { name: '软件工程', minScore: 642 },
            { name: '人工智能', minScore: 644 },
            { name: '网络工程', minScore: 640 }
          ]
        },
        {
          schoolName: '上海交通大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 640 },
            { name: '软件工程', minScore: 638 },
            { name: '人工智能', minScore: 642 },
            { name: '数据科学与大数据技术', minScore: 639 }
          ]
        }
      ],
      low: [
        {
          schoolName: '南京大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 620 },
            { name: '软件工程', minScore: 618 },
            { name: '人工智能', minScore: 622 },
            { name: '网络工程', minScore: 615 }
          ]
        },
        {
          schoolName: '武汉大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 615 },
            { name: '软件工程', minScore: 612 },
            { name: '人工智能', minScore: 614 },
            { name: '数据科学与大数据技术', minScore: 610 }
          ]
        },
        {
          schoolName: '中山大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 610 },
            { name: '软件工程', minScore: 608 },
            { name: '人工智能', minScore: 612 },
            { name: '网络工程', minScore: 605 }
          ]
        },
        {
          schoolName: '华中科技大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 605 },
            { name: '软件工程', minScore: 602 },
            { name: '人工智能', minScore: 604 },
            { name: '数据科学与大数据技术', minScore: 600 }
          ]
        },
        {
          schoolName: '西安交通大学',
          schoolType: '985',
          majors: [
            { name: '计算机科学与技术', minScore: 600 },
            { name: '软件工程', minScore: 598 },
            { name: '人工智能', minScore: 602 },
            { name: '网络工程', minScore: 595 }
          ]
        }
      ]
    };

    this.setData({
      list: mockData[type] || []
    });
  }
}); 