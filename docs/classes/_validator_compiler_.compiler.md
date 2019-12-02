[indicative-compiler](../README.md) › ["Validator/Compiler"](../modules/_validator_compiler_.md) › [Compiler](_validator_compiler_.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level
functions highly optimized for speed.

## Hierarchy

* **Compiler**

## Index

### Constructors

* [constructor](_validator_compiler_.compiler.md#constructor)

### Methods

* [compile](_validator_compiler_.compiler.md#compile)

## Constructors

###  constructor

\+ **new Compiler**(`schema`: Schema, `messages`: Messages, `_validations`: object): *[Compiler](_validator_compiler_.compiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | Schema |
`messages` | Messages |
`_validations` | object |

**Returns:** *[Compiler](_validator_compiler_.compiler.md)*

## Methods

###  compile

▸ **compile**(): *[ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[]*

Compiles the schema to an array of functions

**Returns:** *[ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[]*
