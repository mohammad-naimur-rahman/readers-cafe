'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const user_1 = require('../modules/user')
const router = (0, express_1.Router)()
router.use('/user', user_1.userRoutes)
exports.default = router
//# sourceMappingURL=index.js.map
