Page({
  data: {
    article: null
  },

  onLoad(options) {
    const id = options.id;
    this.loadArticleDetail(id);
  },

  loadArticleDetail(id) {
    // 模拟数据，实际项目中应该从服务器获取
    const mockArticles = {
      1: {
        title: '2024年高考报名人数再创新高，达到1291万人',
        time: '2024-06-07',
        source: '教育部',
        content: [
          {
            type: 'text',
            text: '据教育部最新统计，2024年全国高考报名人数达到1291万人，比去年增加98万人，再创历史新高。'
          },
          {
            type: 'image',
            url: '/images/news/1.jpg'
          },
          {
            type: 'text',
            text: '教育部相关负责人表示，今年高考报名人数的增加，反映了我国教育事业的持续发展和人民群众对高等教育的需求不断增长。'
          },
          {
            type: 'video',
            url: '/videos/news/1.mp4'
          }
        ]
      },
      2: {
        title: '清华大学公布2024年本科招生计划，新增人工智能专业',
        time: '2024-06-06',
        source: '清华大学',
        content: [
          {
            type: 'text',
            text: '清华大学今日正式公布2024年本科招生计划，计划在全国招收本科生3800人，其中新增人工智能专业，计划招生60人。'
          },
          {
            type: 'image',
            url: '/images/news/2.jpg'
          },
          {
            type: 'text',
            text: '人工智能专业将依托清华大学计算机科学与技术、自动化、电子工程等优势学科，培养具有国际视野的AI人才。'
          }
        ]
      },
      3: {
        title: '北京大学2024年招生政策解读：新增交叉学科专业',
        time: '2024-06-05',
        source: '北京大学',
        content: [
          {
            type: 'text',
            text: '北京大学2024年招生计划正式发布，计划在全国招收本科生3600人，新增数据科学与人工智能交叉学科专业。'
          },
          {
            type: 'image',
            url: '/images/news/3.jpg'
          },
          {
            type: 'text',
            text: '该专业将整合计算机科学、数学、统计学等多个学科资源，培养具有跨学科背景的复合型人才。'
          }
        ]
      },
      4: {
        title: '教育部：2024年高考改革方案正式发布',
        time: '2024-06-04',
        source: '教育部',
        content: [
          {
            type: 'text',
            text: '教育部今日正式发布2024年高考改革方案，重点推进考试内容改革和招生录取机制改革。'
          },
          {
            type: 'image',
            url: '/images/news/4.jpg'
          },
          {
            type: 'text',
            text: '新方案将更加注重考查学生的综合素质和实践能力，进一步推进素质教育。'
          }
        ]
      },
      5: {
        title: '浙江大学2024年招生计划公布，新增数据科学专业',
        time: '2024-06-03',
        source: '浙江大学',
        content: [
          {
            type: 'text',
            text: '浙江大学2024年本科招生计划正式发布，计划在全国招收本科生4000人，新增数据科学专业。'
          },
          {
            type: 'image',
            url: '/images/news/5.jpg'
          },
          {
            type: 'text',
            text: '数据科学专业将依托浙江大学在计算机科学、统计学等领域的优势，培养具有数据分析能力的高端人才。'
          }
        ]
      }
    };

    this.setData({
      article: mockArticles[id]
    });
  }
}); 