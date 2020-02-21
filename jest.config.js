module.exports = {
  verbose: true,
  roots: ["<rootDir>/src/", "<rootDir>/tests/unit"],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  preset: "@vue/cli-plugin-unit-jest"
};
