import OperatingsInstructionRoutes from './OperatingInstructions/routes'
import SafetyInstructionCategories from './SafetyInstructionCategories/routes'

const routes = {
  path: 'instructions',
  name: 'settings-instructions',
  component: () => import('@/modules/Params/Instructions/index.vue'),
  children: [
    OperatingsInstructionRoutes,
    SafetyInstructionCategories
  ]
}

export default routes
