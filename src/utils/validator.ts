import validator from 'validator';
import moment from 'moment';
import _ from 'lodash'

function required(value:any) {
  value = (value || value === 0 || value === false) ? String(value) : '';
  value = value.trim();
  return (!!value && value.length > 0) || 'error.validator.required';
}

function passwordRegex(value:string) {
  return value.toString().trim().length >= 8 || `error.validator.password`;
}

function maxLength(max:number) {
  return (value:string) => value.toString().trim().length <= max || `最多${max}個字`;
}

function minLength(min:number) {
  return (value:string) => value.toString().trim().length >= min || `error.validator.minimum.length`;
}
  
function isEmail(value:string) {
  return validator.isEmail(value) || value == '' || 'error.validator.email';
}

function isInt(value:string) {
  return validator.isInt(value) || 'error.validator.isInt';
}

function isNumeric(value: string) {
  return (validator.isNumeric(value + '', { no_symbols: true }) || !value) || 'error.validator.isInt';
}

function isFloat(value:string) {
  return (validator.isFloat(value + '') || !value ) || 'error.validator.isfloat';
}

function confirmationPW(passw:string) {
  return (value:string) => value === passw || 'error.validator.confirmPw';
}

function minNumber(min: number) {
  return (value: number) => value >= min || `error.validator.minimum.number`;
}

function maxNumber(max:number) {
  return (value:number) => value <= max || `error.validator.maximum.number`;
}

function maxNumberGreaterThan(max:number) {
  return (value:number) => value < max || `error.validator.maximum.number`;
}

function isDateFormat(value:string) {
  return moment(value).format() != 'Invalid date' || 'error.validator.date';
}

function filesSize(max:number) {
  return (files:[]) => files.filter((file:any) => file.files[0].size > max).length <= 0 || 'error.validator.files.maxsize';
}

function filesNameMaxLength(max: number) {
  return (files: []) => files.filter((file: any) => file.files[0].name.length > max).length <= 0 || 'error.validator.files.maxLength';
}

function numberNotZero(value: number) {
  value = Number(value) !== NaN ? Number(value) : 0;
  return value !== 0 || 'error.validator.number.not.zero';
}

function isFraction(value: string) {
  return (/^[1-9][0-9]*\/[1-9][0-9]*$/.test(value) || !value) || 'error.validator.is.fraction';
}

function isFractionOrNumber(value: string) {
  return (!isFalse(isFraction(value)) || (!isFalse(isNumeric(value)))) || 'error.validator.is.fraction.or.number'
}

function lengthLimit(limitValue: number) {
  return (value: string) => value.toString().trim().length === limitValue || `error.validator.length.limit`;
}

function decimalPointMaxLength (maxLength: number) {
  return (value: string) => {
    const decimalPointLength = value.split('.').length > 1 ? value.split('.')[1].length : 0;

    return decimalPointLength <= maxLength || 'error.validator.decimal.point.max.length';
  }
}

function isIP(version:validator.IPVersion) {
  return (value: string) => validator.isIP(value, version) || 'error.validator.ip';
}

function isFalse (value: boolean | string) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'string';
}

function isUppercaseEnglishAndNumber(value: string) {
  return (/^(?=.*\d)(?=.*[A-Z])[A-Z0-9]*$/.test(value) || !value) || 'error.validator.uppercase.english.and.number';
}

function isReferralCode(value: string) {
  return (/^(?=.*\d)(?=.*[A-Z])[A-Z0-9]*$/.test(value) && value.toString().trim().length === 8 || !value) || 'error.validator.referral.code';
}

export function validation (target:any) {
  let validBol = false;
  const validations = target.validations;
  const name = target.name;
  const value = target.value;
  let errorMessage:any = {};
  let valid = validations.find(function(func:any) {
    const bol = typeof func === 'function' && func(value) !== true;
    if (bol) {
      errorMessage[name] = func(value);
    }
    return bol;
  });
  
  if (typeof valid !== 'function') {
    errorMessage[name] = '';
    validBol = true;
  }

  return {validBol, errorMessage};
}

export function conactFormData(options:{name:string, value:string|number, formData:any}) {
  const {name, value, formData} = options;
  const newFormData:any = _.cloneDeep(formData)
  if(name.split('.').length > 2) {
    const keys:any = name.split('.');
    let target:any;
    keys.forEach((key:any, index:any) => {
      if(index < keys.length - 1 ) {
        target = target ? target[key] : newFormData[key];
      } else {
        target[key] = value
      }
    })
  } else {
    newFormData[name] = value;
  }

  return newFormData;
}

export function getMultilevelValue(options:{formData:any, name:string}) {
  const { formData, name } = options;
  let value:any;
  if(name.split('.').length >= 2) {
    const names:any = name.split('.');
    let target:any;

    names.forEach((key:any, index:any) => {
      if(index < names.length - 1 ) {
        target = target ? target[key] : formData[key];
      } else {
        value = target[key]
      }
    })
  } else {
    value = formData[name];
  }
  return value;
}


export const validatorUtils = { 
  required, 
  confirmationPW,  
  isEmail,
  passwordRegex,
  isFloat,
  isInt,
  isNumeric,
  minLength,
  minNumber,
  maxNumber,
  maxNumberGreaterThan,
  isDateFormat,
  filesSize,
  filesNameMaxLength,
  numberNotZero,
  isFraction,
  isFractionOrNumber,
  lengthLimit,
  decimalPointMaxLength,
  isIP,
  isUppercaseEnglishAndNumber,
  isReferralCode
}

export default validatorUtils;