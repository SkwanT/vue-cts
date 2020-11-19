import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from './views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      //component: Home
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/Home.vue')
    },
    {
      path: '/details/:id?',
      name: 'details',
      //component: Details
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/Details.vue')
    },
    {
      path: '/add',
      name: 'add',
      // component: Add
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/Add.vue')
    },
    {
      path: '/edit/:id?',
      name: 'edit',
      //component: Edit
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/Edit.vue')
    },
    {
      path: '/delete/:id?',
      name: 'delete',
      //component: Delete
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/Delete.vue')
    },
    {
      path: '/about',
      name: 'about',
      //component: About
      component: () =>
        import(/* webpackChunkName: "bundle-cts" */ './views/About.vue')
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound

    },
  ]
})
