import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
    }
  ]
});
