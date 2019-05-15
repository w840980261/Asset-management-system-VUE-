import request from '@/plugin/axios'

const url = '/personManagement/person'

function toData (functionNo, param) {
  const data = {
    'head': {
      'appVerNo': '1.0.0',
      'functionNo': functionNo
    },
    'param': param
  }
  return data
}
export function GetPersonList (param) {
  const data = toData('GetPersonList', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function GetDepartmentList () {
  const data = {
    'head': { // 类型：Object  必有字段  备注：无
      'functionNo': 'GetDepartmentList' // 类型：String  必有字段  备注：无
    }
  }
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function GetCurrentPerson () {
  const data = {
    'head': { // 类型：Object  必有字段  备注：无
      'functionNo': 'GetCurrentPerson' // 类型：String  必有字段  备注：无
    }
  }
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function AddPerson (param) {
  const data = toData('AddPerson', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    },
    success: {
      type: 'message',
      options: {
        message: '添加成功',
        type: 'success'
      }
    }
    // data: data
  })
}
export function UpdatePerson (param) {
  const data = toData('UpdatePerson', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    },
    success: {
      type: 'message',
      options: {
        message: '修改成功',
        type: 'success'
      }
    }
    // data: data
  })
}
export function DeletePerson (param) {
  const data = toData('DeletePerson', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    },
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
    // data: data
  })
}
export function UpdataStatus (param) {
  const data = toData('UpdataStatus', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    },
    success: {
      type: 'message',
      options: {
        message: '操作成功',
        type: 'success'
      }
    }
    // data: data
  })
}
export function UpdatePassword (param) {
  const data = toData('UpdatePassword', param)
  return request({
    url: url,
    method: 'post',
    data: data,
    loading: {
      type: 'nprogress',
      interval: 500
    },
    success: {
      type: 'message',
      options: {
        message: '修改成功',
        type: 'success'
      }
    }
    // data: data
  })
}
