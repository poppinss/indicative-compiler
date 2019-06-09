[indicative-compiler](../README.md) > [compiler/validator](../modules/compiler_validator.md) > [Collector](../classes/compiler_validator.collector.md)

# Class: Collector

Collector collects all the errors and creates a copy of validated data (only when `generateTree = true`).

## Hierarchy

**Collector**

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

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Collector**(formatter: *[ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md)*, _generateTree: *`boolean`*): [Collector](compiler_validator.collector.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| formatter | [ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md) |
| _generateTree | `boolean` |

**Returns:** [Collector](compiler_validator.collector.md)

___

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md)*

___
<a id="haserrors"></a>

###  hasErrors

**● hasErrors**: *`boolean`* = false

___
<a id="tree"></a>

###  tree

**● tree**: *`any`*

___

## Methods

<a id="getdata"></a>

###  getData

▸ **getData**(): `any`

Returns the collected data

**Returns:** `any`

___
<a id="geterrors"></a>

###  getErrors

▸ **getErrors**(): `any`

Returns errors from the formatter

**Returns:** `any`

___
<a id="seterror"></a>

###  setError

▸ **setError**(pointer: *`string`*, rule: *`ParsedRule`*, message?: *`Message`*): `void`

Passes error to the error formatter for a given field and rule. Also when the message is undefined, it will create a generic message.

**Parameters:**

| Name | Type |
| ------ | ------ |
| pointer | `string` |
| rule | `ParsedRule` |
| `Optional` message | `Message` |

**Returns:** `void`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**(pointer: *`string`*, value: *`any`*): `void`

Set value of a given node. The function results in a noop when `value === undefined` or the validation chain has one or more errors.

**Parameters:**

| Name | Type |
| ------ | ------ |
| pointer | `string` |
| value | `any` |

**Returns:** `void`

___

