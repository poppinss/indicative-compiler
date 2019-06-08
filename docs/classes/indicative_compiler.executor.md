[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [Executor](../classes/indicative_compiler.executor.md)

# Class: Executor

Executor is meant to execute the compiled functions with runtime data.

## Hierarchy

**Executor**

## Index

### Constructors

* [constructor](indicative_compiler.executor.md#constructor)

### Methods

* [exec](indicative_compiler.executor.md#exec)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Executor**(_fns: *([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[]*): [Executor](indicative_compiler.executor.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _fns | ([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[] |

**Returns:** [Executor](indicative_compiler.executor.md)

___

## Methods

<a id="exec"></a>

###  exec

▸ **exec**(data: *`any`*, Formatter: *`object`*, bail: *`boolean`*, removeAdditional: *`boolean`*): `Promise`<`any`>

Executes the compiled functions in sequence.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |
| Formatter | `object` |
| bail | `boolean` |
| removeAdditional | `boolean` |

**Returns:** `Promise`<`any`>

___

