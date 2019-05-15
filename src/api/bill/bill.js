import request from '@/plugin/axios'

const url = '/billAction/bill'

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

export function BillOutList (param) {
  const data = toData('BillOutList', param)
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
export function BillList (param) {
  const data = toData('BillList', param)
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
export function InBill (param) {
  const data = toData('InBill', param)
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
