const routes = {
  path: 'operating-instructions',
  component: () => import('@/modules/Params/Instructions/OperatingInstructions/index.vue'),
  children: [
    {
      path: '',
      name: 'settings-instructions-operating-instructions',
      component: () => import('@/modules/Params/Instructions/OperatingInstructions/OperatingInstructionsList.vue')
    },
    {
      path: ':id/edit',
      name: 'settings-instructions-operating-instructions-edit',
      component: () => import('@/modules/Params/Instructions/OperatingInstructions/OperatingInstructionsEdit.vue')
    },
    {
      path: 'add',
      name: 'settings-instructions-operating-instructions-add',
      component: () => import('@/modules/Params/Instructions/OperatingInstructions/OperatingInstructionsEdit.vue')
    }
  ]
}

export default routes
