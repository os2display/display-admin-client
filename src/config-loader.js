/** Config loader. */
export default class ConfigLoader {
  static async loadConfig() {
    return fetch("/admin/config.json")
      .then((response) => response.json())
      .catch(() => {
        // Defaults.
        return {
          api: "/api/",
          touchButtonRegions: false,
        };
      });
  }
}
