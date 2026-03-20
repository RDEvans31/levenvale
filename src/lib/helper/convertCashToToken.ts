const convertCashToToken = (cash: number, rate: number) => {
  return Math.round(cash * rate);
};

export default convertCashToToken;
