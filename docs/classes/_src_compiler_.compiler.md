[indicative-compiler](../README.md) > ["src/Compiler"](../modules/_src_compiler_.md) > [Compiler](../classes/_src_compiler_.compiler.md)

# Class: Compiler

Compiles rules and messages schema to an array of top level functions highly optimized for speed.

## Hierarchy

**Compiler**

## Index

### Constructors

* [constructor](_src_compiler_.compiler.md#constructor)

### Methods

* [compile](_src_compiler_.compiler.md#compile)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Compiler**(schema: *`Schema`*, messages: *`Messages`*, _validations: *`object`*): [Compiler](_src_compiler_.compiler.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schema | `Schema` |
| messages | `Messages` |
| _validations | `object` |

**Returns:** [Compiler](_src_compiler_.compiler.md)

___

## Methods

<a id="compile"></a>

###  compile

▸ **compile**(): ([ValidationsRunner](_src_validationsrunner_.validationsrunner.md) \| [ArrayWrapper](_src_arraywrapper_.arraywrapper.md))[]

Compiles the schema to an array of functions

**Returns:** ([ValidationsRunner](_src_validationsrunner_.validationsrunner.md) \| [ArrayWrapper](_src_arraywrapper_.arraywrapper.md))[]

___

