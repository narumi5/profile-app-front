export const helloName = (name: string) => {
  return `goodmoring ${name}`;
};

export const calculate = async (a: number, b: number) => {
  return a + b;
};

export const makeSelfIntroduction = (name: string, age: number) => {
  return ` 私の名前は${name}です。年齢は${age}です。`;
};

export const useMakeSelfIntroduction = (name: string, a: number) => {
  return ` 私の名前は${name}です。社会人${a}年目です。`;
};
