import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/scroll",
      name: "scroll",
      component: () => import("./views/scroll.vue")
    }
  ]
});
