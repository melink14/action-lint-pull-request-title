const load = require('@commitlint/load').default;
const lint = require('@commitlint/lint').default;
const config = require('../commitlint.config.js');

module.exports = async function validatePrTitle(prTitle, rootDir) {
  console.log(rootDir);
  console.log(prTitle);
  const customConfig = await load(rootDir + '/commitlint.config.js');
  console.log(customConfig.rules);
  const result = await lint(prTitle, customConfig.rules);

  if (!result.valid || result.warnings.length > 0) {
    const errorMessages = result.errors.map((error) => error.message);
    const warningMessages = result.warnings.map((warning) => warning.message);
    throw new Error(
      errorMessages.join('; ') + '; ' + warningMessages.join('; ')
    );
  }
};
