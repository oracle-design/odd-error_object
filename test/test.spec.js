import { expect } from 'chai'
import Errors from '../src/error_object'
import BuiltErrors from '../index'

describe('Errors#record', () => {
  it('422 的回應會存下驗證錯誤內容', () => {
    const errors = new Errors()

    errors.record({
      response: { status: 422, data: { validation_errors: { name: ['不能空白'] } } }
    })

    expect(errors.has('name')).to.equal(true)
    expect(errors.get('name')).to.deep.equal(['不能空白'])
  })

  it('非 422 的回應不會動到既有內容', () => {
    const errors = new Errors()

    errors.record({ response: { status: 500, data: { validation_errors: { name: ['x'] } } } })

    expect(errors.any()).to.equal(false)
  })

  // axios 在網路層失敗時（連線中斷、CORS、逾時、請求被中止）產生的 error
  // 物件沒有 response —— 這是 record 唯一的參數來源，所以不是邊緣情況。
  it('沒有 response 的 error 不會拋例外', () => {
    const errors = new Errors()

    expect(() => errors.record(new Error('Network Error'))).to.not.throw()
    expect(errors.any()).to.equal(false)
  })

  it('response 為 undefined 時也不會拋例外', () => {
    const errors = new Errors()

    expect(() => errors.record({ message: 'Request aborted' })).to.not.throw()
    expect(errors.any()).to.equal(false)
  })
})

// package.json 的 main 指向 lib/，使用端 import 進去的是打包後的檔案而不是
// src/。只測 src 會得到證明不了任何事的綠燈，所以這裡直接載使用端拿到的東西。
describe('Errors#record（使用端實際載入的 lib/）', () => {
  it('沒有 response 的 error 不會拋例外', () => {
    const errors = new BuiltErrors()

    expect(() => errors.record(new Error('Network Error'))).to.not.throw()
    expect(errors.any()).to.equal(false)
  })

  it('422 的回應會存下驗證錯誤內容', () => {
    const errors = new BuiltErrors()

    errors.record({
      response: { status: 422, data: { validation_errors: { name: ['不能空白'] } } }
    })

    expect(errors.get('name')).to.deep.equal(['不能空白'])
  })
})
