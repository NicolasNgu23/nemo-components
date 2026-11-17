import type { RouteObject } from 'react-router'

import CatalogPage from '@site/pages/CatalogPage'
import ComponentPage from '@site/pages/ComponentPage'
import NotFoundPage from '@site/pages/NotFoundPage'

export const routes: RouteObject[] = [
  { path: '/', element: <CatalogPage /> },
  { path: '/c/:name', element: <ComponentPage /> },
  { path: '*', element: <NotFoundPage /> },
]
