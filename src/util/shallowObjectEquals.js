const shallowObjectEquals = (json1 = {}, json2 = {}) => {
  const keys = Object.keys(json1);
  return keys.every(k => json1[k] === json2[k]);
};

export default shallowObjectEquals;
