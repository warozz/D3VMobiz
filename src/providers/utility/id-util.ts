// Util function
export const isEmpty = value => value === undefined || value === null || value === '';

export const checkPersonalID = personalID => ( isPersonalID(personalID) ) // true - false

export const isEmptyObj = value => typeof value === 'object' && Object.keys(value).length === 0
// Validate personal id
const isPersonalID = personalID => {
  if (personalID.length != 13) return false;
  let checkSum = 0;
  for(let i=0; i < 12; i++) {
    checkSum += parseFloat(personalID.charAt(i))*(13-i);
  }
  if ((11-checkSum%11)%10 != parseFloat(personalID.charAt(12)))
    return false;
  else
    return true;
}
