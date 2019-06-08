[indicative-compiler](../README.md) > ["src/Executor"](../modules/_src_executor_.md) > [Executor](../classes/_src_executor_.executor.md)

# Class: Executor

Executor is meant to execute the compiled functions with runtime data.

## Hierarchy

**Executor**

## Index

### Constructors

* [constructor](_src_executor_.executor.md#constructor)

### Methods

* [exec](_src_executor_.executor.md#exec)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Executor**(_fns: *([ArrayWrapper](_src_arraywrapper_.arraywrapper.md) & [ValidationsRunner](_src_validationsrunner_.validationsrunner.md))[]*): [Executor](_src_executor_.executor.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _fns | ([ArrayWrapper](_src_arraywrapper_.arraywrapper.md) & [ValidationsRunner](_src_validationsrunner_.validationsrunner.md))[] |

**Returns:** [Executor](_src_executor_.executor.md)

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

