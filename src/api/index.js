import ajax from './ajax'

// 1. 定义基础路径

// 产品
const BASE_URL = 'http://product.jzb768.com/'
// 纪念堂
const URL = 'http://partner.fuyulove.com/'
// 商家及其他接口
const URL_APP = 'http://wx.app.jzb768.com/'
const VIDEO_URL =  "https://wxappapi.fuyulove.com"
// 视频
export const videoList = (params) => ajax(VIDEO_URL + '/DeathbedConcernApi/DeathbedConcernList.ashx',params)
// 获取用户数据  能更改
export const selfDetail = (params) => ajax(URL_APP + 'action/userapi/self',params)
// 服务首页功能
export const service = (params) => ajax( URL_APP + 'action/index/service',params)
// 关于首页功能
export const about = (params) => ajax( URL_APP + 'action/index/about',params)
// 获取联盟商列表
export const shopList = (params) => ajax( URL_APP + 'action/unionapi/getlist',params,'POST')
// 联盟商详情
export const shopDetail = (params) => ajax( URL_APP + 'action/unionapi/detail',params)
// 联盟商分类
export const shopItem = (params) => ajax( URL_APP + 'action/unionapi/index',params)
// 策划案申请
export const serviceapi = (params) => ajax(URL_APP + 'action/serviceapi/apply',params,'POST')
// 策划案申请数据
export const serviceGetapply = (params) => ajax(URL_APP + 'action/serviceapi/getapply',params)


// 登录
// export const getOpenId = (params) => ajax(URL + '/Action/UserLogin',params)
// 产品列表
export const goodsList = (params) => ajax(BASE_URL + 'api/goods/list',params)
// 产品详情
export const deatailList = (params) => ajax(BASE_URL + 'api/goods/detail',params)
// 获取sdkdata
export const getSdkData = (params) => ajax(URL + 'Action/CacheData.aspx?action=jssdk',params)
// 列表
export const list = (params) => ajax(URL + 'Action/MemorApi',params)
// 添加
export const add = (params) => ajax(URL + 'Action/MemorApi?action=add',params,'POST')
// 获取 用户信息
// export const getuserinfo = (params) => ajax(URL + 'Action/MemorApi',params)
export const getuserinfo = (params) => ajax('http://passport.fuyulove.com/sns/userinfo',params)
//获取纪念堂详情
export const view = (params) => ajax(URL + 'Action/MemorApi',params)
// 编辑
export const edit = (params) => ajax(URL + 'Action/MemorApi?action=edit',params,'POST')
// 获取鲜花和贡品
export const prolist = (params) => ajax(URL + 'Action/MemorApi?action=prolist',params,'POST')
// 送花和送贡品
export const giveflower = (params) => ajax(URL + '/Action/MemorApi?action=give',params,'POST')
// 留言数据
export const msglist = (params) => ajax(URL + 'Action/MemorApi',params)
// 删除留言
export const msgdel = (params) => ajax(URL + 'Action/MemorApi?action=msgdel',params,'POST')
// 回复留言
export const msgreply = (params) => ajax(URL + 'Action/MemorApi?action=msgreply',params,'POST')
// 添加留言
export const msgadd = (params) => ajax(URL + 'Action/MemorApi?action=msgadd',params,'POST')
//获取来访记录
export const getip = (params) => ajax(URL + 'Action/MemorApi?action=getip',params,'POST')
// 点灯和打扫
export const opera = (params) => ajax(URL + 'Action/MemorApi?action=opera',params,'POST')
// 申请纪念堂共享
export const shareCard = (params) => ajax(URL + 'Action/MemorApi?action=share',params,'POST')
// 处理纪念堂共享
export const doshare = (params) => ajax(URL + 'Action/MemorApi?action=doshare',params,'POST')
// 纪念堂共享列表
export const sharelist = (params) => ajax(URL + 'Action/MemorApi?action=sharelist',params,'POST')
// 纪念堂共享消息
export const sharemsg = (params) => ajax(URL + 'Action/MemorApi?action=sharemsg',params,'POST')
// 纪念堂模板
export const templist = (params) => ajax(URL + 'Action/MemorApi',params)
// 选择模板
export const uptemplate = (params) => ajax(URL + 'Action/MemorApi?action=uptemplate',params,'POST')
// 设置
export const setinfo = (params) => ajax(URL + 'Action/MemorApi',params)
// 音乐列表
export const musiclist = (params) => ajax(URL + 'Action/MemorApi',params)
// 选择音乐
export const upmusic = (params) => ajax(URL + 'Action/MemorApi?action=upmusic',params,'POST')
// 忌日提醒设置
export const upset = (params) => ajax(URL + 'Action/MemorApi?action=upset',params,'POST')
// 删除纪念堂
export const delcard = (params) => ajax(URL + 'Action/MemorApi?action=del',params,'POST')
// 删除追思日记
export const diarydel = (params) => ajax(URL + 'Action/MemorApi?action=diarydel',params,'POST')
// 添加追思日记
export const diaryadd = (params) => ajax(URL + 'Action/MemorApi?action=diaryadd',params,'POST')
// 日记列表
export const diarylist = (params) => ajax(URL + 'Action/MemorApi',params)
// 名人馆分类
export const fame = (params) => ajax(URL + 'Action/MemorApi',params)
// 馆内详情
export const listbycate = (params) => ajax(URL + 'Action/MemorApi?action=listbycate',params,'POST')
// 文章
export const artica = (params) => ajax(URL + 'action/articapi/index',params)
// 文章列表
export const articaList = (params) => ajax(URL + 'action/articapi/getlist',params)
// 文章详情接口
export const articaDetail = (params) => ajax(URL + 'action/articapi/detail',params)
// 执宾
export const emceeapi = (params) => ajax(URL + 'action/emceeapi/index',params,'POST')
// 执宾列表
export const emceeapiList = (params) => ajax(URL + 'action/emceeapi/getlist',params,'POST')
// 执宾详情
export const emceeapiDetail = (params) => ajax(URL + 'action/emceeapi/detail',params)
// 机构
export const companyapi = (params) => ajax(URL + 'action/companyapi/index',params)
// 机构列表
export const companyapiList = (params) => ajax(URL + 'action/companyapi/getlist',params)
// 机构详情
export const companyapiDetail = (params) => ajax(URL + 'action/companyapi/detail',params)
// 首页导航栏和轮播接口
// 公示
export const indexInfo = (params) => ajax(URL + 'Action/index',params)
// 服务
export const serviceInfo = (params) => ajax(URL + 'Action/service',params)
// 产品
export const productInfo = (params) => ajax(URL + 'Action/product',params)
// 执宾注册
export const emceeapiAdd = (params) => ajax(URL + 'action/emceeapi/add',params,'POST')
// 机构注册
export const companyapiAdd = (params) => ajax(URL + 'action/companyapi/add',params,'POST')
// 提交评论
export const commentapiAdd = (params) => ajax(URL + 'action/commentapi/add',params,'POST')
// 获取评论
export const commentapiList = (params) => ajax(URL + 'action/commentapi/getlist',params)
// 人员分类
export const getquali = (params) => ajax(URL + 'action/emceeapi/getquali',params,'POST')
// 机构分类
export const getcatelist = (params) => ajax(URL + 'action/companyapi/getcatelist',params,'POST')

// 个人中心功能限制
export const personCenterlimit = (params) => ajax(URL + 'action/Member',params)
// 获取机构信息
export const company = (params) => ajax(URL + 'action/userapi/company',params)
// 保存机构信息
export const savecompany = (params) => ajax(URL + 'action/userapi/savecompany',params,'POST')
// 获取司仪数据
export const emcee = (params) => ajax(URL + 'action/userapi/emcee',params)
// 保存司仪信息
export const saveemcee = (params) => ajax(URL + 'action/userapi/saveemcee',params,'POST')

// 保存用户信息
export const saveself = (params) => ajax(URL + 'action/userapi/saveself',params,'POST')
// 个人中心留言
export const getmsg = (params) => ajax(URL + 'action/userapi/getmsg',params)
// 获取浏览记录
export const GetBrowse = (params) => ajax(URL + 'action/serviceapi/GetBrowse',params)
// 记录浏览记录
export const Browse = (params) => ajax(URL + 'action/serviceapi/Browse',params,'POST')
// 收藏
export const Collect = (params) => ajax(URL + 'action/serviceapi/Collect',params,'POST')
// 获取收藏
export const getCollect = (params) => ajax(URL + 'action/serviceapi/getCollect',params)
// 删除收藏
export const FCollect = (params) => ajax(URL + 'action/serviceapi/FCollect',params)
