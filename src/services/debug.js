import settings from "@/services/settings.json";

const s = (value) => JSON.stringify(value);

const lMobile = function (text, paramaters, result) {
  console.log(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(result)}`);
  return result;
};
let l = function (text, paramaters, result) {
  console.log("Debug : ", text, paramaters, result);
  return result;
};

const lEMobile = function (text, paramaters, error) {
  console.error(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(error)}`);
  return error;
};
let lE = function (text, paramaters, error) {
  console.error("Debug : ", text, paramaters, error);
  return error;
};

const lWMobile = function (text, paramaters, error) {
  console.error(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(error)}`);
  return error;
};
let lW = function (text, paramaters, error) {
  console.error("Debug : ", text, paramaters, error);
  return error;
};

const fNoDebug = function (
  promise = () => new Promise(),
  paramaters = [],
  result = undefined
) {
  return new Promise((resolve, reject) => {
    promise
      .apply(null, paramaters)
      .then((r) => resolve(result ? result : r))
      .catch((e) => reject(e));
  });
};
let f = function (
  promise = () => new Promise(),
  paramaters = [],
  result = undefined
) {
  l(`Run : ${promise.name}`, paramaters, result);
  const res = (res) => (result != undefined ? result : res);
  return new Promise((resolve, reject) => {
    promise
      .apply(null, paramaters)
      .then((r) => l(`Res : ${promise.name}`, paramaters, res(r)))
      .then((r) => resolve(res(r)))
      .catch((e) => lE(`Err : ${promise.name}`, paramaters, e))
      .then((e) => reject(e));
  });
};

let p = function () {
  return new Promise((resolve) => {
    resolve();
  });
};

if (settings.isMobile) {
  l = lMobile;
  lE = lEMobile;
  lW = lWMobile;
}
if (!settings.debug) {
  l = function () {
    return arguments;
  };
  lE = l;
  lW = l;
  f = fNoDebug;
}

export { p, f, l, lE, lW };
