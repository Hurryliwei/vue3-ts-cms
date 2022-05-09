import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
export interface MenusRaw {
  type: number
  id: number
  name: string
  sort: number
  url: string
  icon: string
  permission: string
  children: any[]
}

let firstMenu: any = null

// 处理后台返回的动态url 对应加载为动态的routes
export function mapMenusToRoutes(userMenus: MenusRaw[]): RouteRecordRaw[] {
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
        // 如果刷新后 就直接跳转第一个menus作为首页
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _resurseGetRoute(menu.children)
      }
    }
  }
  _resurseGetRoute(userMenus)
  return routes
}

// 这里是处理汉堡导航和默认刷新在当前页面的方法
// 判断传了几个参数 如果只传了 两个参数 就是获取当前路径对应的userMenus里面的id的
// 用来定义defaultValue的

// 具体遍历方法就是 拿到当前的路由地址 然后遍历所有的userMenus
// 判断如果是menu是根路径 就看是否有children 如果有 就调用本身的方法 让他进去type=2的循环里
// 这里如果type===2 且路径相同 那么这个meus就是需要的 返回这个menus就行了
// 这里其实type===1 就是在递归调用本函数 直到判断到为type===2的时候就行了

// 至于说汉堡导航这里 需要获取一个type===1的name和path 也需要type==2 的name和路径
// 那么就是递归的时候 判断 如果type===2 且与路由相同 那么就在递归调用之后判断meun是否为真
// 如果为真的话 这个时候的 type===1的 和type===2的值就是汉堡导航要的两个值
// type===1 对应就是前面那个根导航的名称和路径
// type===2 对应的就是子导航的名称和路径
export function pathMapToMenu(
  userMenus: MenusRaw[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 处理特殊情况的方法 如果传了第三个参数 就是用来处理面包屑导航的
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 处理一下面包屑需要的数据
// 这里就是调用上面的函数 多传一个参数 如果参数为真就保存值
export function pathMapBreadcrumb(
  userMenus: MenusRaw[],
  currentPath: string
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToPermission(userMenus: any[]) {
  const permissions: string[] = []

  const _resurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 3) {
        permissions.push(menu.permission)
      } else {
        _resurseGetPermission(menu.children ?? [])
      }
    }
  }

  _resurseGetPermission(userMenus)

  return permissions
}

export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _resurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _resurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _resurseGetLeaf(menuList)

  return leafKeys
}
export { firstMenu }
