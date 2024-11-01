mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    email
  }
}

mutation Login($email: String, $password: String) {
  login(email: $email, password: $password) {
    email
  }
}
