import layoutHeaderAside from '@/layout/header-aside'
export default {
  layoutHeaderAside: layoutHeaderAside,
  'procurement': () =>
    import(/* webpackChunkName: "roleManagement" */ '@/pages/procurement'),

  'waiting': () =>
    import(/* webpackChunkName: "college-department" */ '@/pages/stock-in/waiting'),
  'record': () =>
    import(/* webpackChunkName: "maintenance-dictionary" */ '@/pages/stock-in/record'),
  'finance-waiting': () =>
    import(/* webpackChunkName: "class-management" */ '@/pages/finance/waiting'),
  'finance-record': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/finance/record'),

  'asset-list': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/asset-management/asset-list'),
  'asset-operations': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/asset-management/asset-operations'),
  'asset-allocation': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/asset-management/asset-allocation'),
  'asset-transfer': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/asset-management/asset-transfer'),
  'asset-scrap': () =>
      import(/* webpackChunkName: "job-management" */ '@/pages/asset-management/asset-scrap'),

  'data-dictionary': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/sys/data-dictionary'),
  'authority-management': () =>
    import(/* webpackChunkName: "job-management" */ '@/pages/sys/authority-management')
}
