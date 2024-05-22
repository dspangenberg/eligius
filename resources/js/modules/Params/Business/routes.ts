import DepartmentsRoutes from './Department/routes'
import FilingRoutes from './Filing/routes'
import StorageLocationRoutes from './StorageLocation/routes'

const routes = {
  path: 'business',
  name: 'params-business',
  children: [
    DepartmentsRoutes,
    FilingRoutes,
    StorageLocationRoutes
  ]
}

export default routes
