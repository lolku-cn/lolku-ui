import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },{
      path:'/tab',
      name: "tab",
      component: () => import("./views/tab.vue")
    },{
      path:'/navBar',
      name: "tabBar",
      component: () => import("./views/navbar.vue")
    },{
      path:'/luckyDraw',
      name: "luckyDraw",
      component: () => import("./views/luckyDraw/index.vue")
      // rid lottery
    },{
      path:'/luckyDraw/gridLottery',
      name: "tabBar",
      component:() => import("./views/luckyDraw/gridLottery.vue")
    },
    {
      path: "/scroll",
      name: "scroll",
      component: () => import("./views/scroll.vue")
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import("./views/demo.vue")
    }
  ]
});
