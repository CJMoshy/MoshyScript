import executeMSCommand from "./MS.ts";

executeMSCommand(
  `
  mut x = 7;
  imut y = 9;
  x + 7;
  `,
);
