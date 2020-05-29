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
    component: () => import('pages/login/login'),
    meta: {
      title: '家族宝',
      depth: 1
    }
  },

  {
    path: '/create',
    name: 'create',
    component: () => import('pages/create/create'),
    meta: {
      title: '创建追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },

  {
    path: '/mechan',
    name: 'mechan',
    component: () => import('pages/mechan/mechan'),
    meta: {
      title: '联盟商家',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechanDeatil',
    name: 'mechanDeatil',
    component: () => import('pages/mechanDeatil/mechanDeatil'),
    meta: {
      title: '联盟商家',
      requireAuth: true,
      depth: 1
    }
  },

  {
    path: '/service',
    name: 'service',
    component: () => import('pages/service/service'),
    meta: {
      title: '家族宝盒-服务',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/recall',
    name: 'recall',
    component: () => import('pages/recall/recall'),
    meta: {
      title: '线上追思',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/completion',
    name: 'completion',
    component: () => import('pages/completion/completion'),
    meta: {
      title: '创建成功',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('pages/modify/modify'),
    meta: {
      title: '编辑纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/myRecall',
    name: 'myRecall',
    component: () => import('pages/myRecall/myRecall'),
    meta: {
      title: '我的追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('pages/show/show'),
    meta: {
      title: '',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('pages/news/news'),
    meta: {
      title: '共享纪念堂申请',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('pages/diary/diary'),
    meta: {
      title: '追思日记',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('pages/setting/setting'),
    meta: {
      title: '功能设置',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('pages/template/template'),
    meta: {
      title: '选择追思纪念堂模板',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('pages/music/music'),
    meta: {
      title: '选择追思纪念堂音乐',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/remindDetail',
    name: 'remindDetail',
    component: () => import('pages/remindDetail/remindDetail'),
    meta: {
      title: '祭祀提醒',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('pages/share/share'),
    meta: {
      title: '分享',
      requireAuth: true,
      depth: 1
    },
  },


  {
    path: '/detail',
    name: 'detail',
    component: () => import('pages/detail/detail'),
    meta: {
      title: '产品详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/burialPlanning',
    name: 'burialPlanning',
    component: () => import('pages/burialPlanning/burialPlanning'),
    meta: {
      title: '安葬策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/funeralPlanning',
    name: 'funeralPlanning',
    component: () => import('pages/funeralPlanning/funeralPlanning'),
    meta: {
      title: '殡仪策划',
      requireAuth: true,
      depth: 1
    },

  },

  {
    path: '/delete',
    name: 'delete',
    component: () => import('pages/delete/delete'),
    meta: {
      title: '追思纪念堂已被删除',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/about',
    name: 'about',
    component: () => import('pages/about/about'),
    meta: {
      title: '家族宝盒-关于',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import('pages/intro/intro'),
    meta: {
      title: '公司简介',
      depth: 1
    },

  },
  {
    path: '/brand',
    name: 'brand',
    component: () => import('pages/brand/brand'),
    meta: {
      title: '品牌故事',
      depth: 1
    },

  },
  {
    path: '/yiJing',
    name: 'yiJing',
    component: () => import('pages/yiJing/yiJing'),
    meta: {
      title: '易经泰斗',
      depth: 1
    },

  },
  {
    path: '/treasure',
    name: 'treasure',
    component: () => import('pages/treasure/treasure'),
    meta: {
      title: '家族宝盒',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/memorial',
    name: 'memorial',
    component: () => import('pages/memorial/memorial'),
    meta: {
      title: '追思讣告',
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