/**
 * Base class for a constraint. A constraint is a condition
 * under which a value is considered "valid", if not she's
 * considered invalid, and then marked as invalid in the form.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export default class Constraint {

  constructor(field) {
    this.field = field
  }

  validate() {
    return this.condition(this.field.value)
  }

  condition() {
    return false
  }

  message() {
    return ""
  }
}