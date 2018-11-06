import _ from "lodash";

let checkSum =  0;
export const predictAddres = allAddress => {
  checkSum =  0;
  const addressWithN = _.split(allAddress.replace(/\n/mg, ' '), ' ');
  const addressWithS = _.split(allAddress, ' ');
  let addr = [];
  let data = {
    isComplete: false,
    address: {
      no: '',
      building: '',
      soi: '',
      road: '',
      moo: ''
    }
  }

  if (addressWithN.length > 1) { // ถูกฟอร์แมท
    checkSum = addressWithN.length;
    addr = addressWithN;
  } else if (addressWithS.length > 1) { // ถูกฟอร์แมท
    checkSum = addressWithS.length;
    addr = addressWithS;
  } else { // ไม่เข้าฟอร์แมทใดเลย
    data = {
      ...data,
      isComplete: false
    }
    return data;
  }
  const dataCleaned = cleanArrayUp(addr);
  checkSum = dataCleaned.length;

  // บ้านเลขที่
  data.address = {
    ...data.address,
    no: predictAddressNo(dataCleaned),
    building: predictBuilding(dataCleaned),
    soi: predictSoi(dataCleaned),
    road: predictRoad(dataCleaned),
    moo: predictMoo(dataCleaned)
  }
  predictRoom(dataCleaned);
  predictFloor(dataCleaned);
  predictHouse(dataCleaned);

  data = {
    ...data,
    isComplete: checkValue(data.address)
  }

  checkSum > 0 ? data.isComplete = false : null
  return data;
}

const predictNo = /^[0-9]+/g;
const predictAddressNo = address => {
  const pattern = ['เลขที่', 'N'];
  if (predictNo.test(_.head(address))){
    checkSum--;
    return _.head(address);
  } else {
    return  predict(address, pattern);
  }
}

const predictRoom = address => {
  const pattern = ['ห้อง','R'];
  return predict(address, pattern);
}
const predictFloor = address => {
  const pattern = ['ชั้น','F'];
  return predict(address, pattern);
}
const predictHouse = address => {
  const pattern = ['บ้าน','H'];
  return predict(address, pattern);
}

const predictSoi = address => {
  const pattern = ['ซ.', 'ซอย', 'ตรอก', 'S', 'T'];
  return predict(address, pattern);
}

const predictRoad = address => {
  const pattern = ['ถ.', 'ถนน', 'A'];
  return predict(address, pattern);
}

const predictBuilding = address => {
  const pattern = ['อาคาร', 'ตึก', 'หมู่บ้าน', 'B', 'V', 'H'];
  return predict(address, pattern);
}

const predictMoo = address => {
  const pattern = ['หมู่ที่', 'M'];
  return predict(address, pattern);
}

const predict = (address, pattern) => {
  const predictStartWithNum = /^[0-9]+/g;
  let text = '';
  let isNo = false;
  _.forEach(address, (value) => {
    const check = _.filter(pattern, (patternValue) => _.startsWith(value, patternValue))
    if (isNo && predictStartWithNum.test(value)) {
      text += ' ' + value;
      isNo = false;
      checkSum--;
    } else if (isNo) {
      isNo = false;
    }
    if (!_.isEmpty(check)) {
      text = _.trim(_.replace(value, check, ''));
      isNo = true;
      checkSum--;
    }
  });
  return text;
}

export const translateAddress = (address='') => {
  let temp =  _.replace(address, 'A', 'ถนน');
  temp =  _.replace(temp, 'S', 'ซอย');
  temp =  _.replace(temp, 'T', 'ตรอก');
  temp =  _.replace(temp, 'N', 'เลขที่');
  temp =  _.replace(temp, 'B', 'อาคาร');
  temp =  _.replace(temp, 'V', 'หมู่บ้าน');
  temp =  _.replace(temp, 'H', 'บ้าน');
  temp =  _.replace(temp, 'M', 'หมู่ที่');
  temp =  _.replace(temp, 'R', 'ห้อง');
  temp =  _.replace(temp, 'F', 'ชั้น');

  return temp;
}

const checkValue = (data) => {
  let isValid = true;
  if (data.no == '' && data.building == '' && data.soi == '' && data.road == '' && data.moo == '') {
    isValid = false;
  }
  
  return isValid
}

// ตัดอาเรย์ว่าง
const cleanArrayUp = (arr) => {
  return _.remove(arr, n => (n!=''));
}