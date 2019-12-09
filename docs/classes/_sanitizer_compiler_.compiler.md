[indicative-compiler](../README.md) › ["Sanitizer/Compiler"](../modules/_sanitizer_compiler_.md) › [Compiler](_sanitizer_compiler_.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level
functions highly optimized for speed.

## Hierarchy

* **Compiler**

## Index

### Constructors

* [constructor](_sanitizer_compiler_.compiler.md#constructor)

### Methods

* [compile](_sanitizer_compiler_.compiler.md#compile)

## Constructors

###  constructor

\+ **new Compiler**(`schema`: Schema, `sanitizations`: object): *[Compiler](_sanitizer_compiler_.compiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | Schema |
`sanitizations` | object |

**Returns:** *[Compiler](_sanitizer_compiler_.compiler.md)*

## Methods

###  compile

▸ **compile**(): *[SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md)‹› | [ArrayWrapper](compiler_sanitizer.arraywrapper.md)‹›[]*

Compiles the schema to an array of functions

**Returns:** *[SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md)‹› | [ArrayWrapper](compiler_sanitizer.arraywrapper.md)‹›[]*
