function isDeclarationNode(node: ExpressionNode): node is DeclarationNode {
    return "constant" in node;
}

function isOperationNode(node: ExpressionNode): node is OperationNode {
    return "left" in node && "right" in node && !("constant" in node);
}

function isLiteralNode(node: LiteralNode | ReferenceNode): node is LiteralNode {
    return "int" in node;
}

function isReferenceNode(
    node: LiteralNode | ReferenceNode,
): node is ReferenceNode {
    return "identifier" in node && !("value" in node);
}

export function interpret(AST: ProgramNode) {
    const program = [];
    let line = "";
    while (AST.root !== undefined) {
        if (isDeclarationNode(AST.root)) {
            AST.root.constant ? line += "const " : line += "let ";
            line += AST.root.left.identifier;
            line += " = ";
            line += AST.root.left.value.int;
        } else if (isOperationNode(AST.root)) {
            // Handle operation node
            const { left, right, expression } = AST.root.left;
            if (isLiteralNode(left)) {
                line += left.int
            } else if (isReferenceNode(left)) {
                line += left.identifier
            }
            line += ' ' + expression + ' '
            if (isLiteralNode(right)) {
                line += right.int
            } else if (isReferenceNode(right)) {
                line += right.identifier
            }
            // console.log("Operation:", AST.root.left.expression);
        }
        line += ";";
        program.push(line);
        line = "";
        AST.root = AST.root.right.root as ExpressionNode;
    }
    return program
}
