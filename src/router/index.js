import Vue from 'vue'
import VueRouter from 'vue-router'

// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve=>(require(['pages/login/login'],resolve)),
    meta: {
      title: '家族宝',
      depth: 1
    }
  },

  {
    path: '/create',
    name: 'create',
    component: resolve=>(require(['pages/create/create'],resolve)),
    meta: {
      title: '创建追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },

  {
    path: '/mechan',
    name: 'mechan',
    component: resolve=>(require(['pages/mechan/mechan'],resolve)),
    meta: {
      title: '联盟商家',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechanDeatil',
    name: 'mechanDeatil',
    component: resolve=>(require(['pages/mechanDeatil/mechanDeatil'],resolve)),
    meta: {
      title: '联盟商家',
      requireAuth: true,
      depth: 1
    }
  },

  {
    path: '/service',
    name: 'service',
    component: resolve=>(require(['pages/service/service'],resolve)),
    meta: {
      title: '家族宝品牌服务',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/recall',
    name: 'recall',
    component: resolve=>(require(['pages/recall/recall'],resolve)),
    meta: {
      title: '线上追思',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/completion',
    name: 'completion',
    component: resolve=>(require(['pages/completion/completion'],resolve)),
    meta: {
      title: '创建成功',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component:  resolve=>(require(['pages/modify/modify'],resolve)),
    meta: {
      title: '编辑纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/myRecall',
    name: 'myRecall',
    component: resolve=>(require(['pages/myRecall/myRecall'],resolve)),
    meta: {
      title: '我的追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/show',
    name: 'show',
    component:resolve=>(require(['pages/show/show'],resolve)),
    meta: {
      title: '',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/news',
    name: 'news',
    component:resolve=>(require(['pages/news/news'],resolve)),
    meta: {
      title: '共享纪念堂申请',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/diary',
    name: 'diary',
    component:resolve=>(require(['pages/diary/diary'],resolve)),
    meta: {
      title: '追思日记',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component:resolve=>(require(['pages/setting/setting'],resolve)),
    meta: {
      title: '功能设置',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/template',
    name: 'template',
    component:resolve=>(require(['pages/template/template'],resolve)),
    meta: {
      title: '选择追思纪念堂模板',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/music',
    name: 'music',
    component: resolve=>(require(['pages/music/music'],resolve)),
    meta: {
      title: '选择追思纪念堂音乐',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/remindDetail',
    name: 'remindDetail',
    component:resolve=>(require(['pages/remindDetail/remindDetail'],resolve)),
    meta: {
      title: '祭祀提醒',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/share',
    name: 'share',
    component:resolve=>(require(['pages/share/share'],resolve)),
    meta: {
      title: '分享',
      requireAuth: true,
      depth: 1
    },
  },


  {
    path: '/detail',
    name: 'detail',
    component: resolve=>(require(['pages/detail/detail'],resolve)),
    meta: {
      title: '产品详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/burialPlanning',
    name: 'burialPlanning',
    component: resolve=>(require(['pages/burialPlanning/burialPlanning'],resolve)),
    meta: {
      title: '安葬策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/funeralPlanning',
    name: 'funeralPlanning',
    component: resolve=>(require(['pages/funeralPlanning/funeralPlanning'],resolve)),
    meta: {
      title: '殡仪策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/deathbed',
    name: 'deathbed',
    component: resolve=>(require(['pages/deathbed/deathbed'],resolve)),
    meta: {
      title: '临终关怀策划',
      requireAuth: true,
      depth: 1
    },

  },

  {
    path: '/delete',
    name: 'delete',
    component: resolve=>(require(['pages/delete/delete'],resolve)),
    meta: {
      title: '追思纪念堂已被删除',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/about',
    name: 'about',
    component: resolve=>(require(['pages/about/about'],resolve)),
    meta: {
      title: '家族宝品牌介绍',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/intro',
    name: 'intro',
    component:resolve=>(require(['pages/intro/intro'],resolve)),
    meta: {
      title: '公司简介',
      depth: 1
    },

  },
  // {
  //   path: '/brand',
  //   name: 'brand',
  //   component: () => import('pages/brand/brand'),
  //   meta: {
  //     title: '品牌故事',
  //     depth: 1
  //   },

  // },
  // {
  //   path: '/yiJing',
  //   name: 'yiJing',
  //   component: () => import('pages/yiJing/yiJing'),
  //   meta: {
  //     title: '易经泰斗',
  //     depth: 1
  //   },

  // },
  {
    path: '/treasure',
    name: 'treasure',
    component:resolve=>(require(['pages/treasure/treasure'],resolve)),
    meta: {
      title: '家族宝盒',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/memorial',
    name: 'memorial',
    component:resolve=>(require(['pages/memorial/memorial'],resolve)),
    meta: {
      title: '追思讣告',
      requireAuth: true,
      depth: 1
    },

  },

  {
    path: '/personalCenter',
    name: 'personalCenter',
    component:resolve=>(require(['pages/personalCenter/personalCenter'],resolve)),
    meta: {
      title: '个人中心',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myEdit',
    name: 'myEdit',
    component:resolve=>(require(['pages/personalCenter/myEdit/myEdit'],resolve)),
    meta: {
      title: '编辑个人信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component:resolve=>(require(['pages/personalCenter/myCollection/myCollection'],resolve)),
    meta: {
      title: '我的收藏',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myBrowsing',
    name: 'myBrowsing',
    component:resolve=>(require(['pages/personalCenter/myBrowsing/myBrowsing'],resolve)),
    meta: {
      title: '最近浏览',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myMessage',
    name: 'myMessage',
    // component: () => import('pages/personalCenter/myMessage/myMessage'),
    component: resolve=>(require(['pages/personalCenter/myMessage/myMessage'],resolve)),
    meta: {
      title: '留言管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/deathManage',
    name: 'deathManage',
    // component: () => import('pages/personalCenter/deathManage/deathManage'),
    component: resolve=>(require(['pages/personalCenter/deathManage/deathManage'],resolve)),
    meta: {
      title: '忌日管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/searchHall',
    name: 'searchHall',
    component: resolve=>(require(['pages/searchHall/searchHall'],resolve)),
    meta: {
      title: '搜索纪念堂',
      requireAuth: true,
      depth: 1
    },

  },

]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router