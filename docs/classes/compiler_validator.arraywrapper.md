[indicative-compiler](../README.md) > [compiler/validator](../modules/compiler_validator.md) > [ArrayWrapper](../classes/compiler_validator.arraywrapper.md)

# Class: ArrayWrapper

Wraps the [ValidationsRunner](compiler_validator.validationsrunner.md) and executes them based upon the length of an array at runtime.

## Hierarchy

**ArrayWrapper**

## Index

### Constructors

* [constructor](compiler_validator.arraywrapper.md#constructor)

### Properties

* [async](compiler_validator.arraywrapper.md#async)

### Methods

* [exec](compiler_validator.arraywrapper.md#exec)
* [execAsync](compiler_validator.arraywrapper.md#execasync)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ArrayWrapper**(_field: *`string`*, _index: *`string`*, _childValidators: *([ValidationsRunner](compiler_validator.validationsrunner.md) \| [ArrayWrapper](compiler_validator.arraywrapper.md))[]*, _dotPath: *`string`[]*): [ArrayWrapper](compiler_validator.arraywrapper.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _field | `string` |
| _index | `string` |
| _childValidators | ([ValidationsRunner](compiler_validator.validationsrunner.md) \| [ArrayWrapper](compiler_validator.arraywrapper.md))[] |
| _dotPath | `string`[] |

**Returns:** [ArrayWrapper](compiler_validator.arraywrapper.md)

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

▸ **exec**(data: *[ValidationDataRoot](../modules/compiler_main.md#validationdataroot)*, collector: *[CollectorContract](../interfaces/compiler_main.collectorcontract.md)*, config: *`unknown`*, bail?: *`boolean`*): `boolean`

Execute series of validations for values inside an array

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/compiler_main.md#validationdataroot) | - |
| collector | [CollectorContract](../interfaces/compiler_main.collectorcontract.md) | - |
| config | `unknown` | - |
| `Default value` bail | `boolean` | false |

**Returns:** `boolean`

___
<a id="execasync"></a>

###  execAsync

▸ **execAsync**(data: *[ValidationDataRoot](../modules/compiler_main.md#validationdataroot)*, collector: *[CollectorContract](../interfaces/compiler_main.collectorcontract.md)*, config: *`unknown`*, bail?: *`boolean`*): `Promise`<`boolean`>

Execute series of async validations for values inside an array. Same as [ArrayWrapper.exec](compiler_validator.arraywrapper.md#exec) but async.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/compiler_main.md#validationdataroot) | - |
| collector | [CollectorContract](../interfaces/compiler_main.collectorcontract.md) | - |
| config | `unknown` | - |
| `Default value` bail | `boolean` | false |

**Returns:** `Promise`<`boolean`>

___

