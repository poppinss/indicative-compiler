[indicative-compiler](../README.md) › [compiler/validator](../modules/compiler_validator.md) › [ArrayWrapper](compiler_validator.arraywrapper.md)

# Class: ArrayWrapper

Wraps the [ValidationsRunner](compiler_validator.validationsrunner.md) and executes them based upon the length of
an array at runtime.

## Hierarchy

* **ArrayWrapper**

## Index

### Constructors

* [constructor](compiler_validator.arraywrapper.md#constructor)

### Properties

* [async](compiler_validator.arraywrapper.md#async)

### Methods

* [exec](compiler_validator.arraywrapper.md#exec)
* [execAsync](compiler_validator.arraywrapper.md#execasync)

## Constructors

###  constructor

\+ **new ArrayWrapper**(`field`: string, `index`: string, `childrenValidators`: [ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[], `dotPath`: string[]): *[ArrayWrapper](compiler_validator.arraywrapper.md)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | string |
`index` | string |
`childrenValidators` | [ValidationsRunner](compiler_validator.validationsrunner.md)‹› &#124; [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[] |
`dotPath` | string[] |

**Returns:** *[ArrayWrapper](compiler_validator.arraywrapper.md)*

## Properties

###  async

• **async**: *boolean* =  !!this.childrenValidators.find((validator) => validator.async)

A boolean to know if any of the children inside the wrapper
has async validators.

## Methods

###  exec

▸ **exec**(`data`: [ValidationDataRoot](../modules/compiler_main.md#validationdataroot), `collector`: [CollectorContract](../interfaces/compiler_main.collectorcontract.md), `config`: unknown, `bail`: boolean, `bailOnEachField?`: boolean): *boolean*

Execute series of validations for values inside an array

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [ValidationDataRoot](../modules/compiler_main.md#validationdataroot) | - |
`collector` | [CollectorContract](../interfaces/compiler_main.collectorcontract.md) | - |
`config` | unknown | - |
`bail` | boolean | false |
`bailOnEachField` | boolean | - |

**Returns:** *boolean*

___

###  execAsync

▸ **execAsync**(`data`: [ValidationDataRoot](../modules/compiler_main.md#validationdataroot), `collector`: [CollectorContract](../interfaces/compiler_main.collectorcontract.md), `config`: unknown, `bail`: boolean, `bailOnEachField?`: boolean): *Promise‹boolean›*

Execute series of async validations for values inside an array. Same
as [ArrayWrapper.exec](compiler_validator.arraywrapper.md#exec) but async.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [ValidationDataRoot](../modules/compiler_main.md#validationdataroot) | - |
`collector` | [CollectorContract](../interfaces/compiler_main.collectorcontract.md) | - |
`config` | unknown | - |
`bail` | boolean | false |
`bailOnEachField` | boolean | - |

**Returns:** *Promise‹boolean›*
