import { match } from 'matchit'
export default {
  access: function (config, store) {
    let functionAccess = true
    let interfaceAccess = true
    const isAdmin = store.state.d2admin.permission.isAdmin
    if (config.permission && config.permission.length > 0) {
      const needPermissions = config.permission
      const permissions = store.state.d2admin.permission.functions.concat(
        store.state.d2admin.permission.roles
      )
      const hasPermission = permissions.some(s => {
        return needPermissions.indexOf(s) > -1
      })
      if (!hasPermission && !isAdmin) {
        functionAccess = false
      }
    }
    if (config.interfaceCheck) {
      const path = config.url.replace(config.baseURL, '')
      const method = config.method.toUpperCase()
      const interfaces = store.state.d2admin.permission.interfaces[method]
      const matched = match(path.split('?')[0], interfaces)
      if (matched.length === 0 && !isAdmin) {
        interfaceAccess = false
      }
    }
    return functionAccess && interfaceAccess
  }
}
