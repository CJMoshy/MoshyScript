type ExpressionNode = DeclarationNode | OperationNode;

interface DeclarationNode {
    readonly constant: boolean;
    readonly left: IdentifierNode;
    readonly right: ProgramNode;
}

// interface StringNode{

// }

interface NumberNode {
    readonly int: number;
}

type LiteralNode = NumberNode; // | StringNode ...

interface IdentifierNode {
    readonly identifier: string;
    readonly value: NumberNode;
}

interface ReferenceNode {
    readonly identifier: string;
}

interface OperationNode {
    readonly left: AdditionNode | SubtractionNode | MultiplicationNode | DivisionNode;
    readonly right: ProgramNode;
}

interface AdditionNode {
    readonly expression: "+";
    readonly left: LiteralNode | ReferenceNode;
    readonly right: LiteralNode | ReferenceNode;
}

interface SubtractionNode {
    readonly expression: "-";
    readonly left: LiteralNode | ReferenceNode;
    readonly right: LiteralNode | ReferenceNode;
}

interface MultiplicationNode {
    readonly expression: "*";
    readonly left: LiteralNode | ReferenceNode;
    readonly right: LiteralNode | ReferenceNode;
}

interface DivisionNode {
    readonly expression: "/";
    readonly left: LiteralNode | ReferenceNode;
    readonly right: LiteralNode | ReferenceNode;
}

interface ProgramNode {
    root: ExpressionNode | undefined; // FIX
}
