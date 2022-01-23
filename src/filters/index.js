import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('date-format', (value, formatStr='YYYY-MMMM DD-HH:mm:ss') => {
  return format(value, formatStr)
})
