const getImagePrefix = () => {
  return process.env.NODE_ENV === "production" ? "/ChestXray-Diagnosis/" : "/";
};

export { getImagePrefix };
