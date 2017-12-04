/**
 * Created by dpcui on 13/04/2017.
 */

import _ from 'lodash';

const _codeMapFilterHandler = (codemap, id, value) => {
  let valueStr = value.toString();
  const menuMap = [];
  if (codemap[id]) {
    for (const propTemp in codemap[id]) { // eslint-disable-line
      valueStr = codemap[id][value] || '';
      const mapItem = {};
      mapItem.prop = propTemp;
      mapItem.value = codemap[id][propTemp];
      menuMap.push(mapItem);
    }
  }

  if (value instanceof Array) {
    valueStr = '';
    if (codemap[id]) {
      value.map((item) => {
        valueStr = valueStr + codemap[id][item] + ',';
        return valueStr;
      });
    } else {
      valueStr = value.join(',');
    }
  }

  return {
    value: valueStr,
    menuMap
  };
};

// 定制分组数据操作
const _customGroupDataHandler = (data) => {
  const codemap = data.codemap;
  const elements = data.elements;
  const elementGroups = data.elementGroups.slice(0);
  const dataTemp = data.data;

  for (let i = 0; i < elementGroups.length; i++) {
    elementGroups[i].groupItem = [];
  }

  Object.values(elements).map((item) => {
    const rowsObject = {};
    if (item.visible === true && item.name !== '按钮组') {
      const id = item.id;
      const key = item.name;
      const groupId = item.groupId;
      rowsObject.id = item.id;
      rowsObject.name = key;
      rowsObject.suffix = item.suffix.indexOf('button') > 0 || !item.suffix ? '' : item.suffix;
      rowsObject.checkFormat = item.checkFormat || '';
      rowsObject.editType = item.editType || '';
      rowsObject.readonly = item.readonly;
      rowsObject.required = item.required;
      rowsObject.value = dataTemp[id];
      const value = dataTemp[id];
      const resFilter = _codeMapFilterHandler(codemap, id, value);
      rowsObject.showValue = resFilter.value + '' === 'undefined' ? '' : (resFilter.value + '');
      rowsObject.menuMap = resFilter.menuMap;

      const i = _.findIndex(elementGroups, (o) => o.id === groupId);

      if (i > -1) elementGroups[i].groupItem.push(rowsObject);
    }
    return elementGroups;
  });

  return {
    data: elementGroups,
    originData: data,
  };
};

// 定制平铺数据操作
const _customTiledDataHandler = (data) => {
  const codemap = data.codemap;
  const elements = data.elements;
  const dataTemp = data.data.list || data.data;
  const tiledArray = [];

  Object.values(elements).map((item) => {
    const rowsObject = {};
    if (item.visible === true && item.name !== '按钮组') {
      const id = item.id;
      const key = item.name;
      rowsObject.id = item.id;
      rowsObject.name = key;
      rowsObject.suffix = item.suffix.indexOf('button') > 0 || !item.suffix ? '' : item.suffix;
      rowsObject.checkFormat = item.checkFormat || '';
      rowsObject.editType = item.editType || '';
      rowsObject.readonly = item.readonly;
      rowsObject.required = item.required;
      rowsObject.value = dataTemp[id];
      const value = dataTemp[id];
      const resFilter = _codeMapFilterHandler(codemap, id, value);
      rowsObject.showValue = resFilter.value + '' === 'undefined' ? '' : (resFilter.value + '');
      rowsObject.menuMap = resFilter.menuMap;
      tiledArray.push(rowsObject);
    }
    return tiledArray;
  });

  return {
    data: tiledArray,
    originData: data,
  };
};

// 定制平铺列表项操作
const _customTiledListItemHandler = (data, listItem) => {
  const codemap = data.codemap;
  const elements = data.elements;
  const dataTemp = listItem;
  const tiledArray = [];

  Object.values(elements).map((item) => {
    const rowsObject = {};
    if (item.visible === true && item.name !== '按钮组') {
      const id = item.id;
      const key = item.name;
      rowsObject.id = item.id;
      rowsObject.name = key;
      rowsObject.suffix = item.suffix || '';
      rowsObject.checkFormat = item.checkFormat || '';
      rowsObject.editType = item.editType || '';
      rowsObject.readonly = item.readonly;
      rowsObject.required = item.required;
      rowsObject.value = dataTemp[id];
      const value = dataTemp[id];
      const resFilter = _codeMapFilterHandler(codemap, id, value);
      rowsObject.showValue = resFilter.value + '' === 'undefined' ? '' : (resFilter.value + '');
      rowsObject.menuMap = resFilter.menuMap;
      tiledArray.push(rowsObject);
    }
    return tiledArray;
  });

  return tiledArray;
};

// 定制分组列表项操作
const _customGroupListItemHandler = (data, listItem) => {
  const codemap = data.codemap;
  const elements = data.elements;
  const elementGroups = data.elementGroups.slice(0);
  const dataTemp = listItem;

  for (let i = 0; i < elementGroups.length; i++) {
    elementGroups[i].groupItem = [];
  }

  Object.values(elements).map((item) => {
    const rowsObject = {};
    if (item.visible === true && item.name !== '按钮组') {
      const id = item.id;
      const key = item.name;
      const groupId = item.groupId;
      rowsObject.id = item.id;
      rowsObject.name = key;
      rowsObject.suffix = item.suffix || '';
      rowsObject.checkFormat = item.checkFormat || '';
      rowsObject.editType = item.editType || '';
      rowsObject.readonly = item.readonly;
      rowsObject.required = item.required;
      rowsObject.value = dataTemp[id];
      const value = dataTemp[id];
      const resFilter = _codeMapFilterHandler(codemap, id, value);
      rowsObject.showValue = resFilter.value + '' === 'undefined' ? '' : (resFilter.value + '');
      rowsObject.menuMap = resFilter.menuMap;

      const i = _.findIndex(elementGroups, (o) => o.id === groupId);

      if (i > -1) elementGroups[i].groupItem.push(rowsObject);
    }
    return elementGroups;
  });

  return elementGroups;
};

// 数组元素移除
const _removeObjFromArrayHandler = (arr, filterObjName) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === filterObjName) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

// 对象是否存在值
const _hasValueInObjHandler = (obj, value) => {
  for (let item in obj) { // eslint-disable-line
    if (obj[item] === value) {
      return true;
    }
  }
  return false;
};

// 对象是否存在无效值
const _hasUnvalidInObjHandler = (obj) => {
  for (let item in obj) { // eslint-disable-line
    if (obj[item] !== 0 && obj[item] !== '' && !obj[item]) {
      return true;
    }
  }
  return false;
};

// 字符串划分
const _stringSplitHandler = (string, includeKey) => {
  const splitArr = string.split('; ');
  let i = 0;
  let returnStr = splitArr[0];
  for (const item of splitArr) { // eslint-disable-line
    i = item.indexOf(includeKey + '');
    if (i !== -1) returnStr = item;
  }
  return returnStr;
};

// 对象数组值转化普通数组
const _objArrayConvertArrayHandler = (array, pickProp, callback) => {
  const returnArray = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      returnArray.push(array[i][pickProp]);
    }
  }
  return returnArray;
};

const DataUtil = {
  customGroupDataHandler: (data) => _customGroupDataHandler(data),
  customTiledDataHandler: (data) => _customTiledDataHandler(data),
  customTiledListItemHandler: (data, listItem) => _customTiledListItemHandler(data, listItem),
  customGroupListItemHandler: (data, listItem) => _customGroupListItemHandler(data, listItem),
  removeObjFromArrayHandler: (arr, filterObjName) => _removeObjFromArrayHandler(arr, filterObjName),
  hasValueInObjHandler: (obj, value) => _hasValueInObjHandler(obj, value),
  hasUnvalidInObjHandler: (obj) => _hasUnvalidInObjHandler(obj),
  stringSplitHandler: (string, includeKey) => _stringSplitHandler(string, includeKey),
  objArrayConvertArrayHandler: (array, pickProp, callback) => _objArrayConvertArrayHandler(array, pickProp, callback),
  codeMapFilterHandler: (codemap, id, value) => _codeMapFilterHandler(codemap, id, value)
};

export default DataUtil;
