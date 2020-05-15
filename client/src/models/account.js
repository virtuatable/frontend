class Account extends Model {
  constructor() {
    super({
      "username": {
        "required": true
      }
    })
  }
}