**[indicative-compiler](../README.md)**

[Globals](../README.md) › [compiler/main](../modules/compiler_main.md) › [CollectorContract](compiler_main.collectorcontract.md)

# Interface: CollectorContract

Runtime collector that creates a fresh copy of validated
properties and errors.

## Hierarchy

* **CollectorContract**

## Implemented by

* [Collector](../classes/compiler_validator.collector.md)

## Index

### Properties

* [formatter](compiler_main.collectorcontract.md#formatter)
* [hasErrors](compiler_main.collectorcontract.md#haserrors)

### Methods

* [getData](compiler_main.collectorcontract.md#getdata)
* [getErrors](compiler_main.collectorcontract.md#geterrors)
* [setError](compiler_main.collectorcontract.md#seterror)
* [setValue](compiler_main.collectorcontract.md#setvalue)

## Properties

###  formatter

• **formatter**: *[ErrorFormatterContract](compiler_main.errorformattercontract.md)*

___

###  hasErrors

• **hasErrors**: *boolean*

## Methods

###  getData

▸ **getData**(): *any*

**Returns:** *any*

___

###  getErrors

▸ **getErrors**(): *ReturnType‹[toJSON](compiler_main.errorformattercontract.md#tojson)›*

**Returns:** *ReturnType‹[toJSON](compiler_main.errorformattercontract.md#tojson)›*

___

###  setError

▸ **setError**(`pointer`: string, `rule`: ParsedRule, `message`: Message | Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pointer` | string |
`rule` | ParsedRule |
`message` | Message \| Error |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`pointer`: string, `value`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`pointer` | string |
`value` | any |

**Returns:** *void*