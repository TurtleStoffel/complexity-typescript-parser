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
  console.log(`Command Line Arguments: ${Deno.args}`);
  // Read input, otherwise default to main.ts
  const filename = Deno.args[0] || "main.ts";
  console.log(`Parsing file: ${filename}`);
  const sourceFile = ts.createSourceFile(
    filename,
    Deno.readTextFileSync(filename),
    ts.ScriptTarget.ES2015,
    true
  );

  parse(sourceFile);
}
