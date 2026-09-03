// 工廠而非共用常數：共用同一個物件的話，任何寫進 validation_errors 的
// 操作都會跨 instance 汙染。目前沒有那種寫入路徑，但沒有東西擋著日後
// 加一個，從結構上排除比留著地雷便宜。
const defaultErrorObject = () => ({ validation_errors: {} })

export default class Errors {
  /**
   * 建立 Errors 的 instance
   */
  constructor() {
    this.errors = defaultErrorObject()
  }

  /**
   * 檢查某個欄位是否有錯誤
   *
   * @param {string} columnName 欄位名稱
   */
  has(columnName) {
    return this.errors.validation_errors.hasOwnProperty(columnName)
  }

  /**
   * 檢查是否有任何錯誤
   */
  any() {
    return Object.keys(this.errors.validation_errors).length > 0
  }

  /**
   * 取得某個欄位的錯誤訊息內容
   *
   * @param {string} columnName
   */
  get(columnName) {
    if (this.errors.validation_errors[columnName]) {
      return this.errors.validation_errors[columnName]
    }
    return ''
  }

  /**
   * 檢查欄位錯誤，回傳標示錯誤的 css class name
   *
   * @param {any} columnName 要檢查的欄位名稱
   * @returns {string} 若有欄位錯誤回傳 'is-danger'
   */
  errorClassAt(columnName) {
    return this.has(columnName) ? 'is-danger' : ''
  }

  /**
   * 列出所有錯誤訊息內容
   *
   * @returns {Object} 所有錯誤訊息內容
   */
  all() {
    return this.errors
  }

  /**
   * 紀錄錯誤內容
   *
   * axios 只有在收到 server 回應時才帶 response。連線中斷、CORS 被擋、逾時、
   * 請求被中止都會產生沒有 response 的 error，而那不是邊緣情況 —— 呼叫端
   * 是統一的 API 失敗處理路徑，任何一種失敗都會走到這裡。
   *
   * has / any / get / clear 都無條件讀 this.errors.validation_errors，所以這裡
   * 存進去的東西必須永遠帶著那個欄位。422 的 body 不保證是預期的形狀 ——
   * 沒有 body、或是 { error: '...' } 這類 bespoke 形狀都可能出現 —— 直接存
   * 下去的話錯誤會延後到下一次取用才爆，而且爆在跟成因無關的地方。
   *
   * @param {Object} errors axios 的 error 物件，不保證帶 response
   */
  record(errors) {
    if (!errors || !errors.response) return
    if (errors.response.status !== 422) return

    const data = errors.response.data

    this.errors = data && data.validation_errors ? data : defaultErrorObject()
  }

  /**
   * 清除某欄位或者全部的錯誤內容
   *
   * @param {string|null} columnName 若指定欄位名稱會指清除該欄位的錯誤，不指定則全部清除
   */
  clear(columnName) {
    if (columnName) {
      delete this.errors.validation_errors[columnName]

      return
    }

    this.errors = defaultErrorObject()
  }
}
