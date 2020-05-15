import Constraint from '@/lib/constraint'

export default class Required extends Constraint {
  condition(value) {
    return !!this.field.value
  }

  message(value) {
    return `${this.field.name} is required !`
  }
}