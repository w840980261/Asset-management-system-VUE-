import request from '@/plugin/axios'

const url = 'loginManagement/login'

function toData (functionNo, param) {
  const data = {
    'head': {
      'functionNo': functionNo
    },
    'param': param
  }
  return data
}

export function AccountLogin (param) {
  const data = toData('Login', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'loading',
      options: {
        fullscreen: true,
        lock: true,
        text: '正在登陆...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  })
}

export function GetMenueInfo () {
  const param = {
    head: {
      appVerNo: process.env.VUE_APP_VER_NO,
      functionNo: 'GetMenue'
    }
  }
  return request({
    url: 'getSysMenue/getMenu',
    method: 'post',
    data: param
  })
}
