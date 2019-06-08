[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [Compiler](../classes/indicative_compiler.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level functions highly optimized for speed.

## Hierarchy

**Compiler**

## Index

### Constructors

* [constructor](indicative_compiler.compiler.md#constructor)

### Methods

* [compile](indicative_compiler.compiler.md#compile)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Compiler**(schema: *`Schema`*, messages: *`Messages`*, _validations: *`object`*): [Compiler](indicative_compiler.compiler.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schema | `Schema` |
| messages | `Messages` |
| _validations | `object` |

**Returns:** [Compiler](indicative_compiler.compiler.md)

___

## Methods

<a id="compile"></a>

###  compile

▸ **compile**(): ([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[]

Compiles the schema to an array of functions

**Returns:** ([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[]

___

