const routes = {
  path: 'categories',
  children: [
    {
      path: '',
      name: 'params-work-equipment-categories',
      component: () => import('@/modules/Params/WorkEquipment/EqquipmentCategory/EqquipmentCategoryList.vue'),
      children: [
        {
          path: ':id/edit',
          name: 'params-work-equipment-categories-edit',
          component: () => import('@/modules/Params/WorkEquipment/EqquipmentCategory/EqquipmentCategoryEdit.vue')
        },
        {
          path: 'add',
          name: 'params-work-equipment-categories-add',
          component: () => import('@/modules/Params/WorkEquipment/EqquipmentCategory/EqquipmentCategoryEdit.vue')
        }
      ]
    }
  ]
}

export default routes
