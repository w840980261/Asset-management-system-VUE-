import request from '@/plugin/axios'

const url = '/helloWorld/hello'

let param = {
  'head': { // 类型：Object  必有字段  备注：无
    'functionNo': 'Test' // 类型：String  必有字段  备注：功能号
  },
  'param': { // 类型：Object  必有字段  备注：无
    'userName': '测试', // 类型：String  必有字段  备注：用户名
    'sex': 'dlsdfajl' // 类型：String  必有字段  备注：性别
  }
}

export function Test () {
  return request({
    url: url,
    method: 'post',
    data: param,
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
