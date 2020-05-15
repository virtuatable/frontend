import { map, get, every } from 'lodash'

/**
 * A model is a structure regrouping different fields and
 * providing methods to easily validate them in forms, or
 * save its informations on the API for example.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
class Model {
  constructor(constraints) {
    this.fields = this.buildFields(constraints)
  }

  /**
   * Validates every field of the model and returns the
   * final value. A model is considered valid if every
   * field composing it is considered valid.
   * @return {Boolean}
   *
   */
  validate() {
    return every(this.fields, f => f.validate())
  }

  /**
   * Takes a series of constraints and extract the
   * corresponding fields names from it.
   * @param {Object} constraints - the constraints list
   *   associated to the fields of this model. Each key
   *   in this object is a field name that has constraints
   *   associated to it.
   */
  buildFields(constraints) {
    return map(constraints, (value, field) => {
      const default_value = get(value, 'default', '')
      delete value['default']
      return new Field(field, value, default_value)
    })
  }
}