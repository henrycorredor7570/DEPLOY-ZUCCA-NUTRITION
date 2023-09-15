const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
const numberRegex = /^[1-9]\d{9}$/;
const wordRegex = /^[A-Za-z\s]+$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

function validate(input) {
    const errors = {};
    
  if ( input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
  } 

  if (input.lastName && (!wordRegex.test(input.lastName) || input.lastName.length <2)) {
    errors.lastName = true;
  }

  if (input.email && (!emailRegex.test(input.email))) {
    errors.email = true;
  }
    
  if (input.phone && (!numberRegex.test(input.phone) || input.phone.length != 10)) {
    errors.phone = true;
  }
  
  if (input.birthDate && (!dateRegex.test(input.birthDate))) {
    errors.birthDate = true;
  }
    
  if (input.password && (!passwordRegex.test(input.password))) {
    errors.password = true;
  }

  if (input.address && (input.address.length < 5)) {
    errors.address = true;
  }

  return errors;
}

function isButtonDisabled(errors, input) {
 return Object.values(errors).some(value => value === true) || 
 !input.name || !input.lastName || !input.email ||  !input.password 
}


export {
   validate, 
   isButtonDisabled
}




