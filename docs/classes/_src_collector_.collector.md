[indicative-compiler](../README.md) > ["src/Collector"](../modules/_src_collector_.md) > [Collector](../classes/_src_collector_.collector.md)

# Class: Collector

Collector collects all the errors and maintains a copy of validated data.

## Hierarchy

**Collector**

## Implements

* [CollectorContract](../interfaces/_src_contracts_.collectorcontract.md)

## Index

### Constructors

* [constructor](_src_collector_.collector.md#constructor)

### Properties

* [formatter](_src_collector_.collector.md#formatter)
* [hasErrors](_src_collector_.collector.md#haserrors)
* [tree](_src_collector_.collector.md#tree)

### Methods

* [getData](_src_collector_.collector.md#getdata)
* [getErrors](_src_collector_.collector.md#geterrors)
* [setError](_src_collector_.collector.md#seterror)
* [setValue](_src_collector_.collector.md#setvalue)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Collector**(formatter: *[ErrorFormatterContract](../interfaces/_src_contracts_.errorformattercontract.md)*, _generateTree: *`boolean`*): [Collector](_src_collector_.collector.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| formatter | [ErrorFormatterContract](../interfaces/_src_contracts_.errorformattercontract.md) |
| _generateTree | `boolean` |

**Returns:** [Collector](_src_collector_.collector.md)

___

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](../interfaces/_src_contracts_.errorformattercontract.md)*

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

Consumes an error for a given data pointer and rule.

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

