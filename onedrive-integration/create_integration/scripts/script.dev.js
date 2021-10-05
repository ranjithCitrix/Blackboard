(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../commons/src/lib/encoding-utils.js":
/*!********************************************!*\
  !*** ../commons/src/lib/encoding-utils.js ***!
  \********************************************/
/*! exports provided: encodeContent, decodeContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeContent\", function() { return encodeContent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeContent\", function() { return decodeContent; });\nconst Buffer = library.load('buffer').Buffer;\nfunction encodeContent(content) {\n  return Buffer.from(content, \"utf8\").toString(\"base64\");\n}\nfunction decodeContent(content) {\n  return Buffer.from(content, \"base64\").toString(\"utf8\");\n}\n\n//# sourceURL=webpack:///../commons/src/lib/encoding-utils.js?");

/***/ }),

/***/ "../commons/src/lib/httpResponse.js":
/*!******************************************!*\
  !*** ../commons/src/lib/httpResponse.js ***!
  \******************************************/
/*! exports provided: HttpResponse, processUnauthorizedResponse, badRequest, unauthorized, internalError, withHttpResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HttpResponse\", function() { return HttpResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"processUnauthorizedResponse\", function() { return processUnauthorizedResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"badRequest\", function() { return badRequest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unauthorized\", function() { return unauthorized; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"internalError\", function() { return internalError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"withHttpResponse\", function() { return withHttpResponse; });\n/* harmony import */ var _encoding_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encoding-utils */ \"../commons/src/lib/encoding-utils.js\");\n\nclass HttpResponse {\n  static encode(content) {\n    return Object(_encoding_utils__WEBPACK_IMPORTED_MODULE_0__[\"encodeContent\"])(content);\n  }\n\n  static convertHeaders(inputHeaders) {\n    if (Array.isArray(inputHeaders)) {\n      return inputHeaders;\n    } else {\n      return Object.entries(inputHeaders).map(([name, value]) => ({\n        name,\n        value\n      }));\n    }\n  }\n  /**\n   *\n   * @param args statusCode, headers, body or object {statusCode, headers, body}\n   */\n\n\n  constructor(...args) {\n    let statusCode, headers, body;\n\n    if (typeof args[0] === 'object') {\n      ({\n        statusCode,\n        headers,\n        body\n      } = args[0]);\n    } else {\n      [statusCode, headers, body] = args;\n    }\n\n    this.statusCode = statusCode || 200;\n    this.headers = HttpResponse.convertHeaders(headers || {});\n    this.body = HttpResponse.encode(body || '');\n  }\n\n}\nfunction processUnauthorizedResponse(response) {\n  if (response.status === 401) {\n    return response.text() // FIXME copy headers? content-type etc?\n    .then(unauthorized).then(error => {\n      throw error;\n    });\n  } else {\n    return response;\n  }\n}\nfunction badRequest(body) {\n  return new HttpResponse({\n    statusCode: 400,\n    body\n  });\n}\nfunction unauthorized(body) {\n  return new HttpResponse({\n    statusCode: 401,\n    body\n  });\n}\nfunction internalError(body) {\n  return new HttpResponse({\n    statusCode: 500,\n    body\n  });\n}\nfunction withHttpResponse(fn) {\n  return (...args) => {\n    try {\n      const result = fn(...args);\n\n      if (result instanceof HttpResponse) {\n        return result;\n      } else if (result instanceof Promise) {\n        return result.then(buildSuccessResponse).catch(buildErrorResponse);\n      } else {\n        return Promise.resolve(buildSuccessResponse(result));\n      }\n    } catch (error) {\n      console.error(`Caught unexpected error in withHttpResponse wrapper: ${error.message}`);\n      return Promise.resolve(buildErrorResponse(error));\n    }\n  };\n}\n\nfunction buildSuccessResponse(result) {\n  if (result instanceof HttpResponse) {\n    return result;\n  } else {\n    return new HttpResponse({\n      body: result,\n      statusCode: 200\n    });\n  }\n}\n\nfunction buildErrorResponse(error, statusCode = 500) {\n  if (error instanceof HttpResponse) {\n    return error;\n  }\n\n  let body;\n\n  if (typeof error === 'string') {\n    body = error;\n  } else if (error instanceof Error) {\n    body = error.message;\n\n    if (error.stack) {\n      body = `${body}\\n${error.stack}`;\n    }\n  }\n\n  return new HttpResponse(statusCode, undefined, body);\n}\n\n//# sourceURL=webpack:///../commons/src/lib/httpResponse.js?");

/***/ }),

/***/ "../commons/src/lib/ssql-constants.js":
/*!********************************************!*\
  !*** ../commons/src/lib/ssql-constants.js ***!
  \********************************************/
/*! exports provided: CitrixRequestAttributes, CitrixResponseAttributes, CitrixRequestAttributeNames, CitrixResponseAttributeNames, SupportedQueryRootElements, ContentType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CitrixRequestAttributes\", function() { return CitrixRequestAttributes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CitrixResponseAttributes\", function() { return CitrixResponseAttributes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CitrixRequestAttributeNames\", function() { return CitrixRequestAttributeNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CitrixResponseAttributeNames\", function() { return CitrixResponseAttributeNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SupportedQueryRootElements\", function() { return SupportedQueryRootElements; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ContentType\", function() { return ContentType; });\nconst CitrixRequestAttributes = {\n  file: 'file',\n  title: 'title',\n  path: 'path',\n  creator: 'creator',\n  uploadDate: 'uploadDate',\n  size: 'size'\n};\nconst CitrixResponseAttributes = {\n  itemId: 'itemId',\n  contentType: 'contentType',\n  mimeType: 'mimeType',\n  title: 'title',\n  path: 'path',\n  creator: 'creator',\n  uploadDate: 'uploadDate',\n  size: 'size',\n  parentId: 'parentId',\n  // required for resolving foundIn value\n  foundIn: 'foundIn'\n};\nconst CitrixRequestAttributeNames = Object.values(CitrixRequestAttributes);\nconst CitrixResponseAttributeNames = Object.values(CitrixResponseAttributes);\nconst SupportedQueryRootElements = ['and', 'options', 'or', 'order-by', 'return', 'contentType'];\nconst ContentType = {\n  FILE: 'file',\n  FOLDER: 'folder'\n};\n\n//# sourceURL=webpack:///../commons/src/lib/ssql-constants.js?");

/***/ }),

/***/ "../commons/src/lib/ssql-validation.js":
/*!*********************************************!*\
  !*** ../commons/src/lib/ssql-validation.js ***!
  \*********************************************/
/*! exports provided: validateRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateRequest\", function() { return validateRequest; });\n/* harmony import */ var _ssql_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssql-constants */ \"../commons/src/lib/ssql-constants.js\");\n\nfunction validateRequest(request) {\n  return [...validateQuery(request.query), ...validateReturn(request.return)];\n}\n\nfunction validateReturn(returnElement) {\n  const validationErrors = [];\n\n  if (returnElement == null) {\n    return validationErrors;\n  }\n\n  if (returnElement.attributes && !Array.isArray(returnElement.attributes)) {\n    validationErrors.push({\n      error: 'return_attributes_not_array',\n      message: 'return.attributes might be omitted or must be an array.'\n    });\n  } else if (returnElement.attributes) {\n    if (getInvalidReturnAttributeTypes(returnElement).length > 0) {\n      validationErrors.push({\n        warning: 'return_attributes_not_string',\n        message: `return.attributes elements must be strings but found ${getInvalidReturnAttributeTypes(returnElement)}`\n      });\n    }\n\n    if (getUnsupportedReturnAttributeNames(returnElement).length > 0) {\n      validationErrors.push({\n        warning: 'return_attributes_unsupported_value',\n        message: `return.attributes contains unsupported values = ${getUnsupportedReturnAttributeNames(returnElement)}`\n      });\n    }\n  }\n\n  return validationErrors;\n}\n\nfunction validateQuery(query) {\n  const validationErrors = [];\n  const unsupportedRootElements = Object.keys(query).filter(element => !_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"SupportedQueryRootElements\"].includes(element));\n\n  if (unsupportedRootElements.length > 0) {\n    validationErrors.push({\n      warning: 'query_contains_unsupported_element',\n      message: `\"query\" property contains unsupported elements: ${unsupportedRootElements}`\n    });\n  }\n\n  return validationErrors;\n}\n\nfunction getInvalidReturnAttributeTypes(returnElement) {\n  return returnElement.attributes.map(element => typeof element).filter(type => type !== 'string');\n}\n\nfunction getUnsupportedReturnAttributeNames(returnElement) {\n  return returnElement.attributes.map(element => ({\n    type: typeof element,\n    element\n  })).filter(element => element.type === 'string' && !_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributeNames\"].includes(element.element)).map(({\n    element\n  }) => element);\n}\n\n//# sourceURL=webpack:///../commons/src/lib/ssql-validation.js?");

/***/ }),

/***/ "../commons/src/lib/validation.ts":
/*!****************************************!*\
  !*** ../commons/src/lib/validation.ts ***!
  \****************************************/
/*! exports provided: getSuccessJson, getSuccessText, validateResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSuccessJson\", function() { return getSuccessJson; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSuccessText\", function() { return getSuccessText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateResponse\", function() { return validateResponse; });\nfunction getSuccessJson(onError = defaultErrorBuilder(), responseValidator = defaultResponseValidator) {\n  return response => validateResponse(onError, responseValidator)(response).then(r => r.json());\n}\nfunction getSuccessText(onError = defaultErrorBuilder(), responseValidator = defaultResponseValidator) {\n  return response => validateResponse(onError, responseValidator)(response).then(r => r.text());\n}\nfunction validateResponse(onError = defaultErrorBuilder(), responseValidator = defaultResponseValidator) {\n  return async response => {\n    if (!responseValidator(response)) {\n      return reject(onError, response);\n    } else {\n      return Promise.resolve(response);\n    }\n  };\n}\n\nfunction defaultResponseValidator(response) {\n  return response.ok;\n}\n\nfunction defaultErrorBuilder(errorMessage = 'Response status') {\n  return response => new Error(`${errorMessage}: ${response.status} ${response.statusText}`);\n}\n\nasync function reject(onError, response) {\n  let error;\n\n  if (typeof onError === 'function') {\n    error = await onError(response);\n  } else {\n    // onError is static, so log the error response and throw it away\n    console.error(`Response error = ${await response.text()}, status=${response.status}: ${response.statusText}`);\n    error = onError;\n  }\n\n  if (error instanceof Error) {\n    return Promise.reject(error);\n  } else {\n    return Promise.reject(new Error(error));\n  }\n}\n\n//# sourceURL=webpack:///../commons/src/lib/validation.ts?");

/***/ }),

/***/ "./src/script/attributesTransform.js":
/*!*******************************************!*\
  !*** ./src/script/attributesTransform.js ***!
  \*******************************************/
/*! exports provided: transformResponseAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformResponseAttributes\", function() { return transformResponseAttributes; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/script/constants.js\");\n/* harmony import */ var _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/src/lib/ssql-constants */ \"../commons/src/lib/ssql-constants.js\");\n\n\n\nconst _ = library.load('lodash');\n\nfunction transformResponseAttributes(request) {\n  // 1) ensure that required attribute itemId is always present\n  // 2) parentReference.id is for resolving foundIn attribute\n  return _.uniq([...optionalAttributes(request), _constants__WEBPACK_IMPORTED_MODULE_0__[\"ResponseAttributesMapping\"][_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__[\"CitrixResponseAttributes\"].itemId], _constants__WEBPACK_IMPORTED_MODULE_0__[\"ResponseAttributesMapping\"][_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__[\"CitrixResponseAttributes\"].parentId]]);\n}\n\nfunction optionalAttributes(request) {\n  var _request$return;\n\n  const {\n    attributes\n  } = (_request$return = request === null || request === void 0 ? void 0 : request.return) !== null && _request$return !== void 0 ? _request$return : {};\n\n  if (attributes == null || Array.isArray(attributes) && attributes.length === 0) {\n    return _constants__WEBPACK_IMPORTED_MODULE_0__[\"GraphResponseAttributeNames\"];\n  } else {\n    return attributes.map(attr => _constants__WEBPACK_IMPORTED_MODULE_0__[\"ResponseAttributesMapping\"].findValue(attr)).filter(attr => !!attr);\n  }\n}\n\n//# sourceURL=webpack:///./src/script/attributesTransform.js?");

/***/ }),

/***/ "./src/script/constants.js":
/*!*********************************!*\
  !*** ./src/script/constants.js ***!
  \*********************************/
/*! exports provided: RequestAttributesMapping, GraphRequestAttributeNames, ResponseAttributesMapping, GraphResponseAttributeNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestAttributesMapping\", function() { return RequestAttributesMapping; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GraphRequestAttributeNames\", function() { return GraphRequestAttributeNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponseAttributesMapping\", function() { return ResponseAttributesMapping; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GraphResponseAttributeNames\", function() { return GraphResponseAttributeNames; });\n/* harmony import */ var _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../commons/src/lib/ssql-constants */ \"../commons/src/lib/ssql-constants.js\");\n\n/**\n * Citrix request attribute => Graph attribute\n */\n\nconst RequestAttributesMapping = {\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].file]: 'filename',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].title]: 'title',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].path]: 'filename',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].creator]: 'createdBy',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].uploadDate]: 'createdDateTime',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixRequestAttributes\"].size]: 'size'\n};\nconst GraphRequestAttributeNames = Object.values(RequestAttributesMapping); // placeholder to have one source of attribute names even if their value is generated/derived.\n\nconst GENERATED_VALUE = '__generated_value__';\n/**\n * Citrix response attribute => Graph attribute\n * Only static attributes, dynamic attributes contentType, foundIn is added on the fly.\n */\n\nconst ResponseAttributesMapping = {\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].itemId]: 'id',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].contentType]: GENERATED_VALUE,\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].foundIn]: GENERATED_VALUE,\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].mimeType]: 'file.mimeType',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].title]: 'name',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].path]: 'webUrl',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].creator]: 'createdBy.user.displayName',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].uploadDate]: 'createdDateTime',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].size]: 'size',\n  [_commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_0__[\"CitrixResponseAttributes\"].parentId]: 'parentReference.id',\n  findKeyForValue: function (value) {\n    const result = Object.entries(this).filter(([_, graphAttr]) => value === graphAttr).map(([citrixAttr]) => citrixAttr)[0];\n    if (result === undefined) throw new Error(`ResponseAttributesMapping element not found by value = ${value}`);\n    return result;\n  },\n  findValue: function (key) {\n    const value = this[key];\n    return value !== GENERATED_VALUE ? value : undefined;\n  }\n};\nconst GraphResponseAttributeNames = Object.values(ResponseAttributesMapping).filter(name => name !== GENERATED_VALUE && typeof name !== 'function');\n\n//# sourceURL=webpack:///./src/script/constants.js?");

/***/ }),

/***/ "./src/script/graphRequest.js":
/*!************************************!*\
  !*** ./src/script/graphRequest.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst template = {\n  entityTypes: ['driveItem'],\n  query: {},\n  fields: [// TODO fields from request and field names from constants.js\n  'id', 'name', 'title', 'webUrl', 'createdBy', 'createdDateTime', 'size'],\n  // TODO pagination\n  from: 0,\n  size: 9 // TODO orderBy\n\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (queryString, fields) {\n  return {\n    requests: [{ ...template,\n      query: { ...template.query,\n        queryString\n      },\n      fields: Array.isArray(fields) && fields.length > 0 ? fields : template.fields\n    }]\n  };\n});\n\n//# sourceURL=webpack:///./src/script/graphRequest.js?");

/***/ }),

/***/ "./src/script/index.ts":
/*!*****************************!*\
  !*** ./src/script/index.ts ***!
  \*****************************/
/*! exports provided: searchByRequestInternal, searchByRequest, debug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"searchByRequestInternal\", function() { return searchByRequestInternal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"searchByRequest\", function() { return searchByRequest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debug\", function() { return debug; });\n/* harmony import */ var _commons_src_lib_encoding_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../commons/src/lib/encoding-utils */ \"../commons/src/lib/encoding-utils.js\");\n/* harmony import */ var _commons_src_lib_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/src/lib/validation */ \"../commons/src/lib/validation.ts\");\n/* harmony import */ var _queryTransform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryTransform */ \"./src/script/queryTransform.js\");\n/* harmony import */ var _responseTransform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./responseTransform */ \"./src/script/responseTransform.js\");\n/* harmony import */ var _commons_src_lib_ssql_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../commons/src/lib/ssql-validation */ \"../commons/src/lib/ssql-validation.js\");\n/* harmony import */ var _commons_src_lib_httpResponse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../commons/src/lib/httpResponse */ \"../commons/src/lib/httpResponse.js\");\n\n\n\n\n\n\n\nconst _ = library.load('lodash');\n\nconst BASE_URL = 'https://graph.microsoft.com/v1.0';\nasync function searchByRequestInternal({\n  client,\n  parameters\n}) {\n  const ssqlRequestStr = _commons_src_lib_encoding_utils__WEBPACK_IMPORTED_MODULE_0__[\"decodeContent\"](parameters.requestBody);\n  const ssqlRequest = JSON.parse(ssqlRequestStr);\n  const validationResult = Object(_commons_src_lib_ssql_validation__WEBPACK_IMPORTED_MODULE_4__[\"validateRequest\"])(ssqlRequest);\n\n  if (validationResult.filter(result => !!result.error).length > 0) {\n    return Object(_commons_src_lib_httpResponse__WEBPACK_IMPORTED_MODULE_5__[\"badRequest\"])({\n      error: {\n        message: 'Request contains validation errors. Unable to continue.',\n        errors: validationResult.filter(result => !!result.error),\n        warning: validationResult.filter(result => !!result.warning)\n      }\n    });\n  } else if (validationResult.filter(result => !!result.warning).length > 0) {\n    // TODO return warning in response metadata or in headers\n    validationResult.filter(result => !!result.warning).forEach(({\n      warning,\n      message\n    }) => {\n      console.warn(`Request validation contains warning: code=${warning}, message=${message}`);\n    });\n  }\n\n  const graphQuery = Object(_queryTransform__WEBPACK_IMPORTED_MODULE_2__[\"transformQuery\"])(ssqlRequest.query);\n  const url = getSearchUri(graphQuery);\n  return client.fetch(url).then(_commons_src_lib_httpResponse__WEBPACK_IMPORTED_MODULE_5__[\"processUnauthorizedResponse\"]).then(Object(_commons_src_lib_validation__WEBPACK_IMPORTED_MODULE_1__[\"getSuccessJson\"])(`Graph request to '${url}' failed`)).then(Object(_responseTransform__WEBPACK_IMPORTED_MODULE_3__[\"mapResponseAttributes\"])(ssqlRequest)).then(postProcessAttributes(ssqlRequest, client)).then(results => ({\n    results\n  })).then(JSON.stringify);\n}\n\nfunction postProcessAttributes(ssqlRequest, client) {\n  return results => {\n    // TODO do nothing when foundIn is not required\n    const requests = _.uniq(results.map(({\n      parentId\n    }) => parentId)).filter(parentId => {\n      if (parentId) {\n        return true;\n      } else {\n        console.warn(`postProcessAttributes - checking parentIds and found empty id, probably 'parentId' attribute mapping error?`);\n        return false;\n      }\n    }).map(parentId => ({\n      url: `/me/drive/items/${parentId}`,\n      method: 'GET',\n      id: parentId\n    }));\n\n    const url = `${BASE_URL}/$batch`;\n    const options = {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        requests\n      })\n    };\n    return client.fetch(url, options).then(Object(_commons_src_lib_validation__WEBPACK_IMPORTED_MODULE_1__[\"getSuccessJson\"])(`Can't fetch drive items for resolving folder names`)).then(({\n      responses\n    }) => {\n      return responses.map(({\n        id,\n        body: {\n          webUrl\n        }\n      }) => ({\n        id,\n        webUrl\n      })).reduce((acc, {\n        id,\n        webUrl\n      }) => {\n        acc[id] = webUrl;\n        return acc;\n      }, {});\n    }).then(driveItems => {\n      return results.map(result => {\n        const parentWebUrl = driveItems[result.parentId];\n\n        if (parentWebUrl) {\n          const protocolMatches = parentWebUrl.match(/^([^:]+:\\/\\/)(.*)$/);\n          const foundIn = Array.isArray(protocolMatches) && protocolMatches.length === 3 ? protocolMatches[2] : parentWebUrl;\n          return { ...result,\n            foundIn\n          };\n        } else {\n          return result;\n        }\n      });\n    });\n  };\n}\n\nconst searchByRequest = Object(_commons_src_lib_httpResponse__WEBPACK_IMPORTED_MODULE_5__[\"withHttpResponse\"])(searchByRequestInternal);\nfunction debug({\n  parameters\n}) {\n  console.log('Got parameters', JSON.stringify(parameters));\n  return JSON.stringify(parameters);\n}\n\nfunction getSearchUri(query) {\n  return `${BASE_URL}/me/drive/search(q='${query}')`;\n}\n\n//# sourceURL=webpack:///./src/script/index.ts?");

/***/ }),

/***/ "./src/script/queryTransform.js":
/*!**************************************!*\
  !*** ./src/script/queryTransform.js ***!
  \**************************************/
/*! exports provided: transformQuery, transformArrayExpression, transformRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformQuery\", function() { return transformQuery; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformArrayExpression\", function() { return transformArrayExpression; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transformRequest\", function() { return transformRequest; });\n/* harmony import */ var _graphRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphRequest */ \"./src/script/graphRequest.js\");\n/* harmony import */ var _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/src/lib/ssql-constants */ \"../commons/src/lib/ssql-constants.js\");\n\n\nfunction transformQuery(query) {\n  const {\n    and,\n    or,\n    equals,\n    ftcontains\n  } = query;\n\n  if (Array.isArray(or)) {\n    return transformArrayExpression('OR', or);\n  } else if (Array.isArray(and)) {\n    return transformArrayExpression('AND', and);\n  } else if (equals) {\n    if (equals.attr === _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__[\"CitrixRequestAttributes\"].file) {\n      return equals.value;\n    } else {\n      throw new Error(`Unsupported attribute in equals: ${equals.attr}`);\n    }\n  } else if (ftcontains) {\n    if (ftcontains.attr === _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_1__[\"CitrixRequestAttributes\"].file || ftcontains.attr == null) {\n      return ftcontains.value;\n    } else {\n      throw new Error(`Unsupported attribute in ftcontains: ${ftcontains.attr}`);\n    }\n  } else {\n    throw new Error(`Unsupported tokens in query: ${Object.keys(query)}`);\n  }\n} // exported only for test\n\nfunction transformArrayExpression(operatorName, expressions) {\n  if (expressions.length === 0) {\n    return '';\n  } else {\n    const result = expressions.map(transformQuery).join(` ${operatorName} `);\n\n    if (expressions.length === 1) {\n      return result;\n    } else {\n      return `(${result})`;\n    }\n  }\n}\nfunction transformRequest(request) {\n  const queryString = transformQuery(request.query);\n  return Object(_graphRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(queryString);\n}\n\n//# sourceURL=webpack:///./src/script/queryTransform.js?");

/***/ }),

/***/ "./src/script/responseTransform.js":
/*!*****************************************!*\
  !*** ./src/script/responseTransform.js ***!
  \*****************************************/
/*! exports provided: mapResponseAttributes, flatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapResponseAttributes\", function() { return mapResponseAttributes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"flatten\", function() { return flatten; });\n/* harmony import */ var _attributesTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributesTransform */ \"./src/script/attributesTransform.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/script/constants.js\");\n/* harmony import */ var _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../commons/src/lib/ssql-constants */ \"../commons/src/lib/ssql-constants.js\");\n\n\n\nfunction mapResponseAttributes(request) {\n  return response => {\n    try {\n      const resources = getArrayOrElseEmpty(response.value).map(flatten);\n      const resultAttributes = Object(_attributesTransform__WEBPACK_IMPORTED_MODULE_0__[\"transformResponseAttributes\"])(request);\n      return resources.map(resource => {\n        const result = Object.entries(resource).map(([graphAttr, value]) => {\n          if (resultAttributes.includes(graphAttr)) {\n            const citrixAttr = _constants__WEBPACK_IMPORTED_MODULE_1__[\"ResponseAttributesMapping\"].findKeyForValue(graphAttr); // FIXME convert size, date format?\n\n            return [citrixAttr, value];\n          } else {\n            return [];\n          }\n        }).filter(entry => entry.length > 0).reduce((acc, [k, v]) => {\n          acc[k] = v;\n          return acc;\n        }, {});\n        return { ...result,\n          // contentType is mandatory attribute which must be always present\n          // contentType is not available in the response and must be determined\n          contentType: contentType(resource)\n        };\n      });\n    } catch (e) {\n      throw new Error(`mapResponseAttributes Error ${e.message} ${e.stack}`);\n    }\n  };\n}\n\nfunction getArrayOrElseEmpty(object) {\n  return Array.isArray(object) ? object : [];\n}\n\nfunction getKey(key, keyPrefix) {\n  if (keyPrefix) {\n    return `${keyPrefix}.${key}`;\n  } else {\n    return key;\n  }\n}\n\nfunction setObjectValueWithPrefix(rootAcc, prefix, obj) {\n  return Object.entries(obj).forEach(([key, value]) => {\n    if (isObject(value)) {\n      setObjectValueWithPrefix(rootAcc, getKey(key, prefix), value);\n    } else {\n      rootAcc[getKey(key, prefix)] = value;\n    }\n  });\n}\n\nfunction flatten(obj) {\n  return Object.entries(obj).reduce((acc, [key, value]) => {\n    if (isObject(value)) {\n      setObjectValueWithPrefix(acc, key, value);\n    } else if (value != null) {\n      acc[key] = value;\n    }\n\n    return acc;\n  }, {});\n} // TODO replace with _.isObject()\n\nfunction isObject(obj) {\n  return obj !== null && typeof obj === 'object';\n}\n\nfunction isType(type) {\n  return name => name.match(new RegExp(type, \"i\"));\n}\n\nfunction isProperty(type, propertyNames) {\n  return propertyNames.find(isType(type)) !== undefined;\n}\n\nfunction contentType(resource) {\n  const propertyNames = Object.keys(resource);\n\n  if (isProperty('folder', propertyNames)) {\n    return _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_2__[\"ContentType\"].FOLDER;\n  } else if (isProperty('file', propertyNames)) {\n    return _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_2__[\"ContentType\"].FILE;\n  } else {\n    const defaultResult = _commons_src_lib_ssql_constants__WEBPACK_IMPORTED_MODULE_2__[\"ContentType\"].FILE;\n    console.warn(`Can't detect contentType for resource id=${resource.id}, returning ${defaultResult}`);\n    return defaultResult;\n  }\n}\n\n//# sourceURL=webpack:///./src/script/responseTransform.js?");

/***/ })

/******/ })));