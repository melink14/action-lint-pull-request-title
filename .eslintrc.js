// This enables ESLint to use dependencies of this config
// (see https://github.com/eslint/eslint/issues/3458)
import 'eslint-config-molindo/setupPlugins';

export default {
  extends: 'molindo/javascript',
  env: {
    node: true,
    jest: true
  }
}
