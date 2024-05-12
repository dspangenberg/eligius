const routes = {
  path: 'departments',
  component: () => import('@/modules/Params/Business/Empowerments/index.vue'),
  children: [
    {
      path: '',
      name: 'settings-departments',
      component: () => import('@/modules/Params/Business/Departments/DepartmentsList.vue')
    },
    {
      path: ':id/edit',
      name: 'settings-departments-edit',
      component: () => import('@/modules/Params/Business/Departments/DepartmentsEdit.vue')
    },
    {
      path: 'add',
      name: 'settings-departments-add',
      component: () => import('@/modules/Params/Business/Departments/DepartmentsEdit.vue')
    }
  ]
}

export default routes
