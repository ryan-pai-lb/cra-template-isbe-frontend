import validator from 'validator';
import moment from 'moment';
import _ from 'lodash'

export function required(value:any) {
  value = (value || value === 0 || value === false) ? String(value) : '';
  value = value.trim();
  return (!!value && value.length > 0) || 'error.validator.required';
}

export function isEmail(value:string) {
  return validator.isEmail(value) || value == '' || 'error.validator.email';
}
