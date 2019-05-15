import request from '@/plugin/axios'

const url = '/purchaseAction/purchase'

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

export function SeachByCondition (param) {
  const data = toData('get purchaseMaster list', param)
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

// export function UpdateClassroom (param) {
//   const data = toData('UpdateClassroom', param)
//   return request({
//     url: url,
//     method: 'post',
//     data: data,
//     loading: {
//       type: 'nprogress',
//       interval: 500
//     },
//     success: {
//       type: 'message',
//       options: {
//         message: '修改成功',
//         type: 'success'
//       }
//     }
//     // data: data
//   })
// }
export function AddPurchase (param) {
  const data = toData('add purchase item', param)
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
export function DeletePurchase (param) {
  const data = toData('delete purchase item', param)
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
// export function UpdateStatus (param) {
//   const data = toData('UpdateStatus', param)
//   return request({
//     url: url,
//     method: 'post',
//     data: data,
//     loading: {
//       type: 'nprogress',
//       interval: 500
//     },
//     success: {
//       type: 'message',
//       options: {
//         message: '操作成功',
//         type: 'success'
//       }
//     }
//     // data: data
//   })
// }
