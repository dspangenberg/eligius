import EmpowermentRoutes from './Empowerments/routes'
import DepartmenRoutes from './Departments/routes'

const routes = {
  path: 'business',
  name: 'settings-business',
  component: () => import('@/modules/Params/Business/index.vue'),
  children: [
    EmpowermentRoutes,
    DepartmenRoutes
  ]
}

export default routes
