export const isValidEmail = (email) => /.+@.+\..+/.test(email);
export const isValidPassword = (password) => password.length >= 6;
