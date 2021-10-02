"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { getRandomInt, shuffle, getRandomDate } = require(`./utils`);
const { ExitCode } = require(`../../constants`);
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_ANNOUNCES_PATH = `../../data/announces.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generatePublication = (count, titles, categories, announces) => {
  const randomSentencesNumber = getRandomInt(1, announces.length - 1);
  return Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: getRandomDate(),
      announce: shuffle(announces).slice(1, 5).join(` `),
      fullText: shuffle(announces).slice(1, randomSentencesNumber).join(` `),
      category: [categories[getRandomInt(0, categories.length - 1)]],
    }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const announces = await readContent(FILE_ANNOUNCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const [count] = args;
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
      generatePublication(countOffer, titles, categories, announces)
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  },
};
