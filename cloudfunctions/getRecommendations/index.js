// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { province, type, score, rank, region, major } = event
    
    // 查询符合条件的院校
    const schools = await db.collection('schools')
      .where({
        province: province,
        type: type,
        minScore: _.lte(Number(score)),
        minRank: _.gte(Number(rank))
      })
      .get()

    // 查询相关专业信息
    const majorInfo = await db.collection('majors')
      .where({
        category: major.category,
        name: major.name
      })
      .get()

    // 查询历年录取数据
    const admissionData = await db.collection('admission_data')
      .where({
        schoolId: _.in(schools.data.map(s => s._id)),
        majorId: _.in(majorInfo.data.map(m => m._id))
      })
      .get()

    // 处理推荐结果
    const recommendations = schools.data.map(school => {
      const schoolAdmission = admissionData.data.filter(d => d.schoolId === school._id)
      const majorAdmission = schoolAdmission.filter(d => 
        majorInfo.data.some(m => m._id === d.majorId)
      )

      return {
        name: school.name,
        minScore: school.minScore,
        minRank: school.minRank,
        region: school.region,
        tags: school.tags,
        majors: majorAdmission.map(admission => ({
          name: majorInfo.data.find(m => m._id === admission.majorId).name,
          minScore: admission.minScore
        }))
      }
    })

    return {
      success: true,
      recommendations: recommendations
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err
    }
  }
} 