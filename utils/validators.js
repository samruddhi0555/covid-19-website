module.exports = {
  name: /^[A-Za-z ]{2,50}$/,
  email: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  phone: /^[6-9]\d{9}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  comment: /^[^<>]{1,500}$/
};