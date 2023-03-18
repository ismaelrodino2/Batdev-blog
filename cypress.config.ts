import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    testIsolation: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
