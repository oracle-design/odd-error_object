(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("odd-error_object", [], factory);
	else if(typeof exports === 'object')
		exports["odd-error_object"] = factory();
	else
		root["odd-error_object"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_ERROR_OBJECT = { validation_errors: {} };

var Errors = function () {
  /**
   * 建立 Errors 的 instance
   */
  function Errors() {
    _classCallCheck(this, Errors);

    this.errors = DEFAULT_ERROR_OBJECT;
  }

  /**
   * 檢查某個欄位是否有錯誤
   *
   * @param {string} columnName 欄位名稱
   */


  _createClass(Errors, [{
    key: 'has',
    value: function has(columnName) {
      return this.errors.validation_errors.hasOwnProperty(columnName);
    }

    /**
     * 檢查是否有任何錯誤
     */

  }, {
    key: 'any',
    value: function any() {
      return Object.keys(this.errors.validation_errors).length > 0;
    }

    /**
     * 取得某個欄位的錯誤訊息內容
     *
     * @param {string} columnName
     */

  }, {
    key: 'get',
    value: function get(columnName) {
      if (this.errors.validation_errors[columnName]) {
        return this.errors.validation_errors[columnName];
      }
      return '';
    }

    /**
     * 檢查欄位錯誤，回傳標示錯誤的 css class name
     *
     * @param {any} columnName 要檢查的欄位名稱
     * @returns {string} 若有欄位錯誤回傳 'is-danger'
     */

  }, {
    key: 'errorClassAt',
    value: function errorClassAt(columnName) {
      return this.has(columnName) ? 'is-danger' : '';
    }

    /**
     * 列出所有錯誤訊息內容
     *
     * @returns {Object} 所有錯誤訊息內容
     */

  }, {
    key: 'all',
    value: function all() {
      return this.errors;
    }

    /**
     * 紀錄錯誤內容
     *
     * axios 只有在收到 server 回應時才帶 response。連線中斷、CORS 被擋、逾時、
     * 請求被中止都會產生沒有 response 的 error，而那不是邊緣情況 —— 呼叫端
     * 是統一的 API 失敗處理路徑，任何一種失敗都會走到這裡。
     *
     * @param {Object} errors axios 的 error 物件，不保證帶 response
     */

  }, {
    key: 'record',
    value: function record(errors) {
      if (!errors || !errors.response) return;

      if (errors.response.status === 422) {
        this.errors = errors.response.data;
      }
    }

    /**
     * 清除某欄位或者全部的錯誤內容
     *
     * @param {string|null} columnName 若指定欄位名稱會指清除該欄位的錯誤，不指定則全部清除
     */

  }, {
    key: 'clear',
    value: function clear(columnName) {
      if (columnName) {
        delete this.errors.validation_errors[columnName];

        return;
      }

      this.errors = DEFAULT_ERROR_OBJECT;
    }
  }]);

  return Errors;
}();

exports.default = Errors;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=odd-error_object.js.map