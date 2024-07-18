import Vue from 'vue'
import Router from 'vue-router'
import Vacation from '@/components/Vacation'
import VacationDetail from '@/components/VacationDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VacationKS',
      component: Vacation
    },
    {
      path: '/VacationDetail/:fixedDesc/:userHours',
      name: 'VacationDetail',
      component: VacationDetail
    }
  ]
})
