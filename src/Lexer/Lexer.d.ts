type TokenType = "Declaration" | "Literal" | "Identifier" | "Operator";

interface Token {
  type: TokenType;
  value: string;
}
