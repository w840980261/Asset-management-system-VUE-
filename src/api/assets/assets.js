import request from '@/plugin/axios'

const url = '/assetsAction/assets'

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
// 资产列表
export function AssetsList (param) {
  const data = toData('AssetsList', param)
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

// 可令用资产查询
export function UseList (param) {
  const data = toData('UseList', param)
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

// 报废列表
export function ScrapList (param) {
  const data = toData('ScrapList', param)
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
// 报废
export function Scrap (param) {
  const data = toData('Scrap', param)
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

// 领用记录
export function UsedList (param) {
  const data = toData('UsedList', param)
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
// 领用
export function Use (param) {
  const data = toData('Use', param)
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
// 归还
export function Return (param) {
  const data = toData('Return', param)
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

// 调拨列表
export function AllotList (param) {
  const data = toData('AllotList', param)
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
// 发起调拨
export function Allot (param) {
  const data = toData('Allot', param)
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
// 调拨核对
export function AllotCheck (param) {
  const data = toData('AllotCheck', param)
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

// 移交列表
export function TransferList (param) {
  const data = toData('TransferList', param)
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
// 发起移交
export function Transfer (param) {
  const data = toData('Transfer', param)
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
// 移交核对
export function TransferCheck (param) {
  const data = toData('TransferCheck', param)
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
// 移交列表
export function OwnerAssets (param) {
  const data = toData('OwnerAssets', param)
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
// 移交列表
export function GetCouldTransferUserList (param) {
  const data = toData('GetCouldTransferUserList', param)
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
