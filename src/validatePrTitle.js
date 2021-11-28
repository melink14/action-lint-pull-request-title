const lint = require('@commitlint/lint').default;
const config = require('../commitlint.config.js');

module.exports = async function validatePrTitle(prTitle, rootDir) {
  console.log(rootDir);
  const customConfig = await require(rootDir + '/commitlint.config.js');
  const result = await lint(prTitle, customConfig.rules);

  if (!result.valid) {
    const errorMessages = result.errors.map((error) => error.message);
    throw new Error(errorMessages.join('; '));
  }
};
