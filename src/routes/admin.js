import Layout from '../layout/admin'
import lazy from '../components/Lazy'

export default {
  path: '/admin',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: lazy(() => import('../views/admin/home')) },
  ]
}
