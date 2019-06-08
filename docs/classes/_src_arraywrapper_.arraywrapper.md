[indicative-compiler](../README.md) > ["src/ArrayWrapper"](../modules/_src_arraywrapper_.md) > [ArrayWrapper](../classes/_src_arraywrapper_.arraywrapper.md)

# Class: ArrayWrapper

## Hierarchy

**ArrayWrapper**

## Index

### Constructors

* [constructor](_src_arraywrapper_.arraywrapper.md#constructor)

### Properties

* [async](_src_arraywrapper_.arraywrapper.md#async)

### Methods

* [exec](_src_arraywrapper_.arraywrapper.md#exec)
* [execAsync](_src_arraywrapper_.arraywrapper.md#execasync)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ArrayWrapper**(_field: *`string`*, _index: *`string`*, _childValidators: *([ValidationsRunner](_src_validationsrunner_.validationsrunner.md) \| [ArrayWrapper](_src_arraywrapper_.arraywrapper.md))[]*, _dotPath: *`string`[]*): [ArrayWrapper](_src_arraywrapper_.arraywrapper.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _field | `string` |
| _index | `string` |
| _childValidators | ([ValidationsRunner](_src_validationsrunner_.validationsrunner.md) \| [ArrayWrapper](_src_arraywrapper_.arraywrapper.md))[] |
| _dotPath | `string`[] |

**Returns:** [ArrayWrapper](_src_arraywrapper_.arraywrapper.md)

___

## Properties

<a id="async"></a>

###  async

**● async**: *`boolean`* =  !!this._childValidators.find((validator) => validator.async)

A boolean to know if any of the children inside the wrapper has async validators.

___

## Methods

<a id="exec"></a>

###  exec

▸ **exec**(data: *[ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot)*, collector: *[Collector](_src_collector_.collector.md)*, bail?: *`boolean`*): `boolean`

Execute series of validations for values inside an array

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot) | - |
| collector | [Collector](_src_collector_.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `boolean`

___
<a id="execasync"></a>

###  execAsync

▸ **execAsync**(data: *[ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot)*, collector: *[Collector](_src_collector_.collector.md)*, bail?: *`boolean`*): `Promise`<`boolean`>

Execute series of async validations for values inside an array. Same as [ArrayWrapper.exec](_src_arraywrapper_.arraywrapper.md#exec) but async.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot) | - |
| collector | [Collector](_src_collector_.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `Promise`<`boolean`>

___

