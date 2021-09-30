/**
 * Config loader.
 */
export default class ConfigLoader {
  config;

  constructor() {
    this.config = [];
    fetch("/config.json").then((config) => this.config = config);
  }

  loadConfigKey(key) {
    console.log('------- CONFIG --------');
    console.log(this.config);
    console.log('------- CONFIG --------');

    return this.config[key];
  }
}
