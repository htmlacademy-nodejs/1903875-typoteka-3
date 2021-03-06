"use strict";

const fs = require(`fs`).promises;
const {MockFile} = require(`../../constants`);

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(MockFile.NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    return err;
  }

  return data;
};

module.exports = getMockData;
