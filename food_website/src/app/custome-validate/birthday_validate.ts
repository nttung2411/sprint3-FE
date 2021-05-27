import {AbstractControl, ValidationErrors} from '@angular/forms';

// @ts-ignore
export function birthdayValidate(control: AbstractControl): ValidationErrors | null {
  const birthday = new Date(control.value);
  const now = new Date();
  const minDate = new Date(now.getFullYear() - 16, now.getMonth(), now.getDay());
  const maxDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDay());
  if (birthday) {
    if (birthday.getTime() > minDate.getTime()) {
      return {'birthdayValidate': true};
    } else if (birthday.getTime() < maxDate.getTime()) {
      return {'birthdayValidate': true};
    }
  }
  return null;
}
