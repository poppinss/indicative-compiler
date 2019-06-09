[indicative-compiler](../README.md) > [compiler/validator](../modules/compiler_validator.md) > [Compiler](../classes/compiler_validator.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level functions highly optimized for speed.

## Hierarchy

**Compiler**

## Index

### Constructors

* [constructor](compiler_validator.compiler.md#constructor)

### Methods

* [compile](compiler_validator.compiler.md#compile)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Compiler**(schema: *`Schema`*, messages: *`Messages`*, _validations: *`object`*): [Compiler](compiler_validator.compiler.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schema | `Schema` |
| messages | `Messages` |
| _validations | `object` |

**Returns:** [Compiler](compiler_validator.compiler.md)

___

## Methods

<a id="compile"></a>

###  compile

▸ **compile**(): ([ValidationsRunner](compiler_validator.validationsrunner.md) \| [ArrayWrapper](compiler_validator.arraywrapper.md))[]

Compiles the schema to an array of functions

**Returns:** ([ValidationsRunner](compiler_validator.validationsrunner.md) \| [ArrayWrapper](compiler_validator.arraywrapper.md))[]

___

