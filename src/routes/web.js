// import { GITHUB } from '@/config'
import Layout from '../layout/web'
import lazy from '../components/Lazy'

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: lazy(() => import('../views/web/home')) },
    { path: 'article/:id', component: lazy(() => import('../views/web/article')) },
    // { path: '*', component: lazy(() => import('@/components/404')) },
  ],
}
