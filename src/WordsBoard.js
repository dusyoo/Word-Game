import wordPool from './word-pool.txt';

export const boardDefault = [
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""]
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordPool)
    .then((response) => response.text())
    .then((res) => {
      // console.log(res)
      const wordArr = res.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWord };
};