import { RouteRecordRaw } from 'vue-router'
export interface MenusRaw {
  type: number
  id: number
  name: string
  sort: number
  url: string
  icon: string
  children: MenusRaw[]
}
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 加载所有的默认的routes
  const allRoutes: RouteRecordRaw[] = []

  const routerFiles = require.context('../router/main', true, /\.ts/)
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 根据菜单获取需要添加的routes
  const _resurseGetRoute = (menus: MenusRaw[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => {
          return item.path === menu.url
        })
        if (route) {
          routes.push(route)
        }
      } else {
        _resurseGetRoute(menu.children)
      }
    }
  }
  _resurseGetRoute(userMenus)
  return routes
}
