const routes = {
  path: 'groups',
  children: [
    {
      path: '',
      name: 'params-work-equipment-groups',
      component: () => import('@/modules/Params/WorkEquipment/EqquipmentGroup/EqquipmentGroupList.vue'),
      children: [
        {
          path: ':id/edit',
          name: 'params-work-equipment-groups-edit',
          component: () => import('@/modules/Params/WorkEquipment/EqquipmentGroup/EqquipmentGroupEdit.vue')
        },
        {
          path: 'add',
          name: 'params-work-equipment-groups-add',
          component: () => import('@/modules/Params/WorkEquipment/EqquipmentGroup/EqquipmentGroupEdit.vue')
        }
      ]
    }
  ]
}

export default routes
