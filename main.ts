import ts from "npm:typescript";

function parse(sourceFile: ts.SourceFile) {
  console.log(`Parsing: ${sourceFile.fileName}`);

  ts.forEachChild(sourceFile, parseNode);
}

function parseNode(node: ts.Node) {
  const stringifiedNodeKind = ts.SyntaxKind[node.kind];
  console.log(`Parsing Node of kind ${stringifiedNodeKind}`);

  if (node.kind === ts.SyntaxKind.ImportDeclaration) {
    const importDeclaration = node as ts.ImportDeclaration;
    console.log(`Importing module: ${importDeclaration.moduleSpecifier.getText()}`);
  }
}

if (import.meta.main) {
  const sourceFile = ts.createSourceFile(
    "main.ts",
    Deno.readTextFileSync("main.ts"),
    ts.ScriptTarget.ES2015,
    true
  );

  parse(sourceFile);
}
