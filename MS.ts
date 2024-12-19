import { tokenize } from "./Lexer.ts";
import { parse } from "./AST.ts";
import { interpret } from "./Interpreter.ts";

export default function executeMSCommand(program: string) {
  try {
    //validate(program)
    const interpretedProg = interpret(parse(tokenize(program)));
    console.log(eval(interpretedProg.join('')))
  } catch (e) {
    console.log(e);
  }
}

