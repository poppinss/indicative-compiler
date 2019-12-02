[indicative-compiler](../README.md) › [compiler/validator](../modules/compiler_validator.md) › [Collector](compiler_validator.collector.md)

# Class: Collector

Collector collects all the errors and creates a copy of validated
data (only when `generateTree = true`).

## Hierarchy

* **Collector**

## Implements

* [CollectorContract](../interfaces/compiler_main.collectorcontract.md)

## Index

### Constructors

* [constructor](compiler_validator.collector.md#constructor)

### Properties

* [formatter](compiler_validator.collector.md#formatter)
* [hasErrors](compiler_validator.collector.md#haserrors)
* [tree](compiler_validator.collector.md#tree)

### Methods

* [getData](compiler_validator.collector.md#getdata)
* [getErrors](compiler_validator.collector.md#geterrors)
* [setError](compiler_validator.collector.md#seterror)
* [setValue](compiler_validator.collector.md#setvalue)

## Constructors

###  constructor

\+ **new Collector**(`formatter`: [ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md), `_generateTree`: boolean, `_customErrorCollector?`: [ErrorCollectorFn](../modules/compiler_main.md#errorcollectorfn)): *[Collector](compiler_validator.collector.md)*

**Parameters:**

Name | Type |
------ | ------ |
`formatter` | [ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md) |
`_generateTree` | boolean |
`_customErrorCollector?` | [ErrorCollectorFn](../modules/compiler_main.md#errorcollectorfn) |

**Returns:** *[Collector](compiler_validator.collector.md)*

## Properties

###  formatter

• **formatter**: *[ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md)*

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md).[formatter](../interfaces/compiler_main.collectorcontract.md#formatter)*

___

###  hasErrors

• **hasErrors**: *boolean* = false

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md).[hasErrors](../interfaces/compiler_main.collectorcontract.md#haserrors)*

___

###  tree

• **tree**: *any*

## Methods

###  getData

▸ **getData**(): *any*

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md)*

Returns the collected data

**Returns:** *any*

___

###  getErrors

▸ **getErrors**(): *any*

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md)*

Returns errors from the formatter

**Returns:** *any*

___

###  setError

▸ **setError**(`pointer`: string, `rule`: ParsedRule, `message?`: Message | Error): *void*

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md)*

Passes error to the error formatter for a given field and rule. Also when the
message is undefined, it will create a generic message.

**Parameters:**

Name | Type |
------ | ------ |
`pointer` | string |
`rule` | ParsedRule |
`message?` | Message &#124; Error |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`pointer`: string, `value`: any): *void*

*Implementation of [CollectorContract](../interfaces/compiler_main.collectorcontract.md)*

Set value of a given node. The function results in a noop
when `value === undefined` or the validation chain has
one or more errors.

**Parameters:**

Name | Type |
------ | ------ |
`pointer` | string |
`value` | any |

**Returns:** *void*
