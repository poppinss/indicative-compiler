[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [ArrayWrapper](../classes/indicative_compiler.arraywrapper.md)

# Class: ArrayWrapper

Wraps the [ValidationsRunner](indicative_compiler.validationsrunner.md) and executes them based upon the length of an array at runtime.

## Hierarchy

**ArrayWrapper**

## Index

### Constructors

* [constructor](indicative_compiler.arraywrapper.md#constructor)

### Properties

* [async](indicative_compiler.arraywrapper.md#async)

### Methods

* [exec](indicative_compiler.arraywrapper.md#exec)
* [execAsync](indicative_compiler.arraywrapper.md#execasync)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ArrayWrapper**(_field: *`string`*, _index: *`string`*, _childValidators: *([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[]*, _dotPath: *`string`[]*): [ArrayWrapper](indicative_compiler.arraywrapper.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _field | `string` |
| _index | `string` |
| _childValidators | ([ValidationsRunner](indicative_compiler.validationsrunner.md) \| [ArrayWrapper](indicative_compiler.arraywrapper.md))[] |
| _dotPath | `string`[] |

**Returns:** [ArrayWrapper](indicative_compiler.arraywrapper.md)

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

▸ **exec**(data: *[ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot)*, collector: *[Collector](indicative_compiler.collector.md)*, bail?: *`boolean`*): `boolean`

Execute series of validations for values inside an array

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot) | - |
| collector | [Collector](indicative_compiler.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `boolean`

___
<a id="execasync"></a>

###  execAsync

▸ **execAsync**(data: *[ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot)*, collector: *[Collector](indicative_compiler.collector.md)*, bail?: *`boolean`*): `Promise`<`boolean`>

Execute series of async validations for values inside an array. Same as [ArrayWrapper.exec](indicative_compiler.arraywrapper.md#exec) but async.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot) | - |
| collector | [Collector](indicative_compiler.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `Promise`<`boolean`>

___

