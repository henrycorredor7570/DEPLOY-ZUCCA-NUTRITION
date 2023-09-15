const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
const wordRegex = /^[A-Za-z\s]+$/;

export default function Validate(input) {
    const errors = {};
    if (input.user === "") errors.user = true;
    else if (!wordRegex.test(input.user)) errors.user1 = true;      

    if (!passwordRegex.test(input.password)) errors.password = true;
    
    return errors;
} 