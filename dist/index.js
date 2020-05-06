
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./formik-wizard.cjs.production.min.js')
} else {
  module.exports = require('./formik-wizard.cjs.development.js')
}
