module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEviroment: "node",
  testWatch: ["**/*.test.ts"],
};
