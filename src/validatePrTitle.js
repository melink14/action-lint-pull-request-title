import load from '@commitlint/load';
import lint from '@commitlint/lint';
import config from '../commitlint.config.js';

export default async function validatePrTitle(prTitle, rootDir) {
  console.log(rootDir);
  console.log(prTitle);
  console.log(config);
  const customConfig = (await load(rootDir || '' + '/commitlint.config.js')) || config;
  const finalConfig = Object.keys(customConfig).length === 0 ? config : customConfig;
  const result = await lint(prTitle, finalConfig.rules);
  console.log(result);

  if (!result.valid || result.warnings.length > 0) {
    const errorMessages = result.errors.map((error) => error.message);
    const warningMessages = result.warnings.map((warning) => warning.message);
    throw new Error(
      errorMessages.join('; ') + '; ' + warningMessages.join('; ')
    );
  }
};
