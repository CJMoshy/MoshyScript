// lexer is responsible for taking in the raw program and breaking it down into tokens that the parser can then read
export function tokenize(program: string): Token[][] {
    const expressions: string[][] = [];
    // split string by line
    const lines = program.split(";");
    for (const line of lines) {
        const l = line.trim().split(" ").filter(elem => elem !== '');
        if (l.length > 0) {
            expressions.push(l);
        }
    }

    const tokens: Token[][] = []; // our final tokes is a 2d array of tokenized 'expression' obects, each array is a self contained expression
    for (const statement of expressions) { // a singular expression is a statement
        const tokenizedExpression: Token[] = [];
        for (const value of statement) { // a statement is made up of tokens
            switch (value) {
                case "mut":
                    // console.log('declaration', value)
                    tokenizedExpression.push({ type: "Declaration", value });
                    break;
                case "imut":
                    // console.log('Const declaration', value)
                    tokenizedExpression.push({ type: "Declaration", value });
                    break;
                case "=":
                    // console.log('operation', value)
                    tokenizedExpression.push({ type: "Operator", value });
                    break;
                case "+":
                    // console.log('operation (+)', value)
                    tokenizedExpression.push({ type: "Operator", value });
                    break;
                case "-":
                    // console.log('operation (+)', value)
                    tokenizedExpression.push({ type: "Operator", value });
                    break;
                case "*":
                    // console.log('operation (+)', value)
                    tokenizedExpression.push({ type: "Operator", value });
                    break;
                case "/":
                    // console.log('operation (+)', value)
                    tokenizedExpression.push({ type: "Operator", value });
                    break;
                default:
                    if (!isNaN(Number(value))) {
                        // console.log('literal', value)
                        tokenizedExpression.push({ type: "Literal", value });
                        break;
                    }
                    // console.log('Identifier', value)
                    tokenizedExpression.push({ type: "Identifier", value });
                    break;
            }
        }
        // console.log(tokenizedExpression)
        tokens.push([...tokenizedExpression]);
        tokenizedExpression.length = 0;
    }
    return tokens;
}
