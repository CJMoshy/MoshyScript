import { tokenize } from "./Lexer/Lexer.ts";
import { parse } from "./AST/AST.ts";
import { interpret } from "./Interpreter/Interpreter.ts";

export default function executeMSCommand(program: string) {
  try {
    const interpretedProg = interpret(parse(tokenize(program)));
    console.log(eval(interpretedProg.join('')))
  } catch (e) {
    console.log(e);
  }
}

