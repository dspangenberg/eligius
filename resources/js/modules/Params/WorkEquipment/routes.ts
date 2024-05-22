import Manufacturer from './Manufacturer/routes'
import EqquipmentGroup from './EqquipmentGroup/routes'
import EqquipmentCategory from './EqquipmentCategory/routes'

const routes = {
  path: 'work-eqquipment',
  children: [
    Manufacturer,
    EqquipmentGroup,
    EqquipmentCategory
  ]
}

export default routes
