/**
 * Config loader.
 */
export default class ConfigLoader {
  static async loadConfig() {
    return await fetch("/config.json").then(response => response.json());
  }
}
