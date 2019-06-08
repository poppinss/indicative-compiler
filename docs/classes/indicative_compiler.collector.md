[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [Collector](../classes/indicative_compiler.collector.md)

# Class: Collector

Collector collects all the errors and creates a copy of validated data (only when `generateTree = true`).

## Hierarchy

**Collector**

## Implements

* [CollectorContract](../interfaces/indicative_compiler.collectorcontract.md)

## Index

### Constructors

* [constructor](indicative_compiler.collector.md#constructor)

### Properties

* [formatter](indicative_compiler.collector.md#formatter)
* [hasErrors](indicative_compiler.collector.md#haserrors)
* [tree](indicative_compiler.collector.md#tree)

### Methods

* [getData](indicative_compiler.collector.md#getdata)
* [getErrors](indicative_compiler.collector.md#geterrors)
* [setError](indicative_compiler.collector.md#seterror)
* [setValue](indicative_compiler.collector.md#setvalue)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Collector**(formatter: *[ErrorFormatterContract](../interfaces/indicative_compiler.errorformattercontract.md)*, _generateTree: *`boolean`*): [Collector](indicative_compiler.collector.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| formatter | [ErrorFormatterContract](../interfaces/indicative_compiler.errorformattercontract.md) |
| _generateTree | `boolean` |

**Returns:** [Collector](indicative_compiler.collector.md)

___

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](../interfaces/indicative_compiler.errorformattercontract.md)*

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

