const routes = {
  path: 'empowerment',
  component: () => import('@/modules/Params/Business/Empowerments/index.vue'),
  children: [
    {
      path: '',
      name: 'settings-empowerments',
      component: () => import('@/modules/Params/Business/Empowerments/EmpowermentsList.vue')
    },
    {
      path: ':id/edit',
      name: 'settings-empowerments-edit',
      component: () => import('@/modules/Params/Business/Empowerments/EmpowermentsEdit.vue')
    },
    {
      path: 'add',
      name: 'settings-empowerments-add',
      component: () => import('@/modules/Params/Business/Empowerments/EmpowermentsEdit.vue')
    }
  ]
}

export default routes
