// // Abstract Syntax Tree

export function parse(tokens: Token[][]): ProgramNode {
    if (tokens.length === 0) {
        throw new Error("Failed to create AST... Tokens array was empty");
    }

    const declarationCommand = (statement: Token[]): DeclarationNode => {
        return {
            constant: statement.at(0)!.value === "imut",
            left: {
                identifier: statement.at(1)!.value,
                value: {
                    int: Number(statement.at(3)!.value),
                },
            },
            right: {
                root: undefined,
            },
        };
    };

    const identifierCommand = (statement: Token[]): OperationNode => {
        return {
            left: {
                expression: statement.at(1)!.value.toString() as '+' | '-' | '*' | '/', // all we support for now is addition lol
                left: {
                    identifier: statement.at(0)!.value,
                } as ReferenceNode,
                right: {
                    identifier: statement.at(2)!.value,
                } as ReferenceNode,
            },
            right: {
                root: undefined,
            },
        };
    };

    const ROOT: ProgramNode = { root: undefined };

    const findNextProgramNode = () => {
        let programNode = ROOT.root as ExpressionNode;
        while (programNode.right.root !== undefined) {
            programNode = programNode.right.root!;
        }
        return programNode;
    };

    for (const statement of tokens) {
        if (statement.at(0)!.type === "Declaration") {
            const dNode: DeclarationNode = declarationCommand(statement);
            if (ROOT.root === undefined) {
                ROOT.root = dNode;
            } else {
                const nextProgramNode = findNextProgramNode();
                nextProgramNode.right.root = dNode;
            }
            continue;
        }
        if (
            statement.at(0)!.type === "Identifier" &&
            statement.at(1)?.type === "Operator" ||
            statement.at(0)!.type === "Literal" &&
            statement.at(1)?.type === "Operator"
        ) {
            const opNode = identifierCommand(statement);
            if (ROOT.root === undefined) {
                ROOT.root = opNode;
            } else {
                const nextProgramNode = findNextProgramNode();
                nextProgramNode.right.root = opNode;
            }
            continue;
        }
    }
    return ROOT;
}

// function parseRawLangTokens(tokens: string[]): ExpressionNode{
//     console.log(tokens)
//     if(tokens.length === 0) {
//         throw new Error('tokenized input is of invalid length')
//     }

//     const token = tokens.shift()
//     if(token === '#'){
//         const left = parseRawLangTokens(tokens)
//         const right = parseRawLangTokens(tokens)
//         return { type: 'root', left, right}
//     }

//     if(token === 'mut' || token === 'imut'){
//         if(tokens.length < 3) throw new Error('invalid syntax')
//         const varName = tokens.shift()!
//         tokens.shift()
//         const value = tokens.shift()!
//         return {type: 'declaration', mutable: token === 'mut', varName, value}
//     }

//     // Mathematical operations
//     if (token === '+' || token === '*') {
//         const left = parseRawLangTokens(tokens);
//         const right = parseRawLangTokens(tokens);
//         return {
//             type: 'operation',
//             operator: token,
//             left,
//             right
//         };
//     }

//     // Literals (numbers)
//     if (!isNaN(Number(token))) {
//         return {
//             type: 'literal',
//             value: token!
//         };
//     }

//     // Variable references
//     return {
//         type: 'reference',
//         varName: token!
//     };
//     // if(token === '+' || token === '*'){
//     //     console.log('math op')
//     // }

//     // console.log('ref op')
//     // // token is a number
//     // // token is some string not in quotes then its a var name
//     // // token is an operation
//     // // token is an equal sign
// }

// const AST = parseRawLangTokens(['#','mut', 'x', '=', '7', 'imut', 'y', '=', '8', 'x', '+', 'y'])
// console.log(AST)

// // For testing mathematical operations
// // const mathAST = parseRawLangTokens(['#', 'mut', 'x', '=', '7', '+', '8', '9']);
// // console.log(JSON.stringify(mathAST, null, 2));
// // console.log(mathAST)
