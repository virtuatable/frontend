import { every, map } from 'lodash'

/**
 * A field represents the information about one column
 * in a data table, for example the username of a user.
 * It has constraints that assert its value is valid
 * under the current data structures.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
class Field {
  constructor(name, constraints, default_value) {
    this.name = name
    this.constraints = constraints
    this.default_value = default_value
    /** The value given as v-model in the form */
    this.value = default_value
    /** If the model has been touched or not. */
    this.touched = false
  }

  /**
   * Validates if the value of the field is respecting
   * the current schema by respecting all the constraints.
   * @return [Boolean] TRUE if all constraints are respected
   *   and the value has been modified at least once, FALSE
   *   otherwise.
   */
  validate() {
    return !this.touched || every(this.constraints, c => c.validate())
  }

  errors() {
    return map(this.constraints, c => c.error())
  }

  touch() {
    this.touched = true
  }
}