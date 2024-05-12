import SettingsInstructionsRoutes from './Instructions/routes'
import SettingsBusinessRoutes from './Business/routes'

const routes = {
  path: 'settings',
  component: () => import('@/modules/Params/index.vue'),
  children: [
    SettingsBusinessRoutes,
    SettingsInstructionsRoutes
  ]
}

export default routes
