/**
 * Config loader.
 */
export default class ConfigLoader {
  static async loadConfig() {
    return fetch("/config.json").then((response) => response.json());
  }
}
