import request from '@/plugin/axios'

const url = '/entryAction/entry'

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

export function OutListPurchaseMaster (param) {
  const data = toData('get purchaseMaster out list', param)
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
export function InListPurchaseMaster (param) {
  const data = toData('get purchaseMaster in list', param)
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
export function entry (param) {
  const data = toData('entry', param)
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
  })
}
