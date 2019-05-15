import request from '@/plugin/axios'

const url = '/dictionaryAction/dictionary'

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
export function getDictionary () {
  const data = {
    'head': { // 类型：Object  必有字段  备注：无
      'functionNo': 'get dictionary list' // 类型：String  必有字段  备注：无
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

export function AddDictionary (param) {
  const data = toData('add dictionary item', param)
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
export function DeleteDictionary (param) {
  const data = toData('delete dictionary item', param)
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
