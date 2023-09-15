const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
const wordRegex = /^[A-Za-z\s]+$/;

export function Validate(input) {
    const errors = {};
    
  if (!wordRegex.test(input.name)) errors.name1 = true;

  if (!wordRegex.test(input.lastName))
    errors.lastName1 = true;

  if (!emailRegex.test(input.email))
    errors.email1 = true;

  if (!passwordRegex.test(input.password) && input.password.length > 0)
    errors.password1 = true;

  if (input.password !== input.passwordConfirmed) errors.passwordEqual = true;

  return errors;
}




