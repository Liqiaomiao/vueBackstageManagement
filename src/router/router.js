/**
 * Created by Liqiaomiao on 2018/4/12.
 */
import Main from '../components/Main.vue';//Main框架；
import Home from '../components/home/home.vue';//home；
import Page404 from '../components/error-page/404.vue'//404
import Smenu from '../components/system/s-menu.vue';//菜单管理
import Suser from '../components/system/s-user.vue';//用户管理
import Srole from '../components/system/s-role.vue';//角色管理
import Dholiday from '../components/dispatch/holiday.vue';//调度
import Video from '../components/system/s-video'//视频
export const page404={
  path: '/error',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component:Page404
}
export const otherRouter=  {
  path: '/',
  name: '首页',
  redirect: '/home',
  component: Main,
  children:[
    {path:'home',name:'首页',component:Home}
  ]
}
export const appRouter=[
  {
    path: '/system',
    name: '系统管理',
    component: Main,
    children:[
      {path:'menu',title:'菜单管理',name:'菜单管理',component:Smenu},
      {path:'user',title:'用户管理',name:'用户管理',component:Suser},
      {path:'role',title:'角色管理',name:'角色管理',component:Srole},
      {path:'video',title:'视频播放',name:'视频播放',component:Video}
    ]
  },{
    path: '/dispatch',
    name: '调度管理',
    component: Main,
    children:[
      {path:'driver/holiday',title:'节假日管理',name:'节假日管理',component:Dholiday},

    ]

  }
]
export const routers = [
  otherRouter,
  ...appRouter,
  page404

];
