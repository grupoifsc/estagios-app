import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
  
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
    ): ValidationErrors | null => {
    return control.value.password1 === control.value.password2
      ? null
      : { PasswordNoMatch: true };
};

export function mustMatch(otherControl: AbstractControl): ValidatorFn {  
    return (control: AbstractControl): ValidationErrors | null => {       
        const matches : boolean = control.value == otherControl.value;
        return matches ? null : {mismatch: true};  
    };
}