> **[indicative-compiler](../README.md)**

[Globals](../README.md) / [compiler/sanitizer](../modules/compiler_sanitizer.md) / [Compiler](compiler_sanitizer.compiler.md) /

# Class: Compiler

Compiles rules and messages schema to an array of top level
functions highly optimized for speed.

## Hierarchy

* **Compiler**

### Index

#### Constructors

* [constructor](compiler_sanitizer.compiler.md#constructor)

#### Methods

* [compile](compiler_sanitizer.compiler.md#compile)

## Constructors

###  constructor

\+ **new Compiler**(`schema`: `Schema`, `_sanitizations`: object): *[Compiler](compiler_sanitizer.compiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | `Schema` |
`_sanitizations` | object |

**Returns:** *[Compiler](compiler_sanitizer.compiler.md)*

## Methods

###  compile

▸ **compile**(): *[SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) | [ArrayWrapper](compiler_sanitizer.arraywrapper.md)[]*

Compiles the schema to an array of functions

**Returns:** *[SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) | [ArrayWrapper](compiler_sanitizer.arraywrapper.md)[]*