/**
 * ESLint rule: a module-level `'use server'` file may only export async functions.
 *
 * Why this exists: React's server-actions transform strips every non-function
 * export from a `'use server'` module across the server/client boundary. A
 * Client Component that imports such a value (e.g. a `const` array of options)
 * receives `undefined` at runtime and crashes on first use — and neither
 * `tsc`, unit tests, nor `next build` catch it (it only throws at render).
 * The rule makes the mistake a lint error at the source, so the bad export
 * never lands.
 *
 * Allowed exports from a module-level `'use server'` file:
 *   - `export async function foo() {}`
 *   - `export const foo = async () => {}` / `async function () {}`
 *   - type-only exports (`export type`, `export interface`) — fully erased
 *
 * Flagged:
 *   - `export const X = [...]` / objects / strings / non-async functions
 *   - `export function X()` (non-async), `export class X {}`, `export enum X {}`
 *   - `export default <non-async-function>`
 *   - `export { x }` where `x` is a local non-async value (best effort)
 *
 * Put the shared constants/types in a plain module and import them where needed.
 */

/** True for an async function/arrow node. */
function isAsyncFunction(node) {
  return (
    !!node &&
    (node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression') &&
    node.async === true
  )
}

const MESSAGE =
  "A 'use server' module may only export async functions. '{{name}}' is a {{kind}}, which is stripped " +
  'across the server/client boundary and becomes undefined for any Client Component that imports it. ' +
  'Move it to a plain (non-"use server") module and import it where needed.'

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Disallow non-async-function exports from a module-level 'use server' file (they break across the RSC boundary)."
    },
    schema: [],
    messages: { nonAsyncExport: MESSAGE }
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()
    let isUseServerModule = false

    function report(node, name, kind) {
      context.report({ node, messageId: 'nonAsyncExport', data: { name, kind } })
    }

    return {
      Program(node) {
        // Only a module-level directive prologue counts. Inline `'use server'`
        // inside a function body is a different (allowed) feature.
        const first = node.body[0]
        isUseServerModule =
          !!first &&
          first.type === 'ExpressionStatement' &&
          first.directive === 'use server'
      },

      ExportNamedDeclaration(node) {
        if (!isUseServerModule) return
        if (node.exportKind === 'type') return // `export type { ... }`

        const decl = node.declaration
        if (decl) {
          if (decl.type === 'TSInterfaceDeclaration' || decl.type === 'TSTypeAliasDeclaration') {
            return // erased at compile time — safe
          }
          if (decl.type === 'VariableDeclaration') {
            for (const d of decl.declarations) {
              if (!isAsyncFunction(d.init)) {
                report(d, d.id?.name ?? 'value', 'non-async value')
              }
            }
            return
          }
          if (decl.type === 'FunctionDeclaration' && !decl.async) {
            report(decl, decl.id?.name ?? 'function', 'non-async function')
            return
          }
          if (decl.type === 'ClassDeclaration') {
            report(decl, decl.id?.name ?? 'class', 'class')
            return
          }
          if (decl.type === 'TSEnumDeclaration') {
            report(decl, decl.id?.name ?? 'enum', 'enum (runtime value)')
            return
          }
          return
        }

        // `export { a, b }` (no source). Best-effort: resolve each local binding.
        if (!node.source && node.specifiers?.length) {
          const scope = sourceCode.getScope ? sourceCode.getScope(node) : context.getScope()
          for (const spec of node.specifiers) {
            if (spec.exportKind === 'type') continue
            const localName = spec.local?.name
            if (!localName) continue
            const variable = scope.references
              ? findVariable(scope, localName)
              : null
            if (!variable) continue // imported / cross-module — can't tell, skip
            const def = variable.defs?.[0]
            if (!def) continue
            if (def.type === 'FunctionName' && def.node.async) continue
            if (def.type === 'FunctionName' && !def.node.async) {
              report(spec, localName, 'non-async function')
              continue
            }
            if (def.type === 'Variable') {
              if (!isAsyncFunction(def.node.init)) {
                report(spec, localName, 'non-async value')
              }
              continue
            }
            if (def.type === 'ClassName') {
              report(spec, localName, 'class')
            }
          }
        }
      },

      ExportDefaultDeclaration(node) {
        if (!isUseServerModule) return
        const d = node.declaration
        if (isAsyncFunction(d)) return
        // A bare identifier default (`export default foo`) may point at an async
        // function; skip to avoid false positives. Flag obvious non-functions.
        if (d.type === 'Identifier') return
        if (
          d.type === 'FunctionDeclaration' ||
          d.type === 'FunctionExpression' ||
          d.type === 'ArrowFunctionExpression'
        ) {
          report(node, 'default', 'non-async function')
          return
        }
        report(node, 'default', 'non-async value')
      }
    }
  }
}

/** Walk up scope chain to resolve a variable by name. */
function findVariable(scope, name) {
  let s = scope
  while (s) {
    const found = s.variables.find((v) => v.name === name)
    if (found) return found
    s = s.upper
  }
  return null
}

export default rule
