[indicative-compiler](../README.md) › ["Validator/Compiler"](../modules/_validator_compiler_.md) › [Compiler](_validator_compiler_.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level
functions highly optimized for speed.

## Hierarchy

* **Compiler**

## Index

### Constructors

* [constructor](_validator_compiler_.compiler.md#constructor)

### Properties

* [parsedMessages](_validator_compiler_.compiler.md#parsedmessages)
* [parsedSchema](_validator_compiler_.compiler.md#parsedschema)

### Methods

* [compile](_validator_compiler_.compiler.md#compile)

## Constructors

###  constructor

\+ **new Compiler**(`schema`: Schema | ParsedTypedSchema‹TypedSchema›, `messages`: Messages, `validations`: object): *[Compiler](_validator_compiler_.compiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | Schema &#124; ParsedTypedSchema‹TypedSchema› |
`messages` | Messages |
`validations` | object |

**Returns:** *[Compiler](_validator_compiler_.compiler.md)*

## Properties

###  parsedMessages

• **parsedMessages**: *ParsedMessages*

___

###  parsedSchema

• **parsedSchema**: *ParsedSchema*

## Methods

###  compile

▸ **compile**(): *[ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[]*

Compiles the schema to an array of functions

**Returns:** *[ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[]*
