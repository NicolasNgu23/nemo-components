import type { RouteObject } from 'react-router'

import CatalogPage from '@site/pages/CatalogPage'
import BarePage from '@site/pages/BarePage'
import ComponentPage from '@site/pages/ComponentPage'
import NotFoundPage from '@site/pages/NotFoundPage'

export const routes: RouteObject[] = [
  { path: '/', element: <CatalogPage /> },
  { path: '/c/:name', element: <ComponentPage /> },
  { path: '/bare/:name', element: <BarePage /> },
  { path: '*', element: <NotFoundPage /> },
]
