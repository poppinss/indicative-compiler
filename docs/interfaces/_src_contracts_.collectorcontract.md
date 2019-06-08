[indicative-compiler](../README.md) > ["src/contracts"](../modules/_src_contracts_.md) > [CollectorContract](../interfaces/_src_contracts_.collectorcontract.md)

# Interface: CollectorContract

Runtime collector that creates a fresh copy of validated properties and errors.

## Hierarchy

**CollectorContract**

## Implemented by

* [Collector](../classes/_src_collector_.collector.md)

## Index

### Properties

* [formatter](_src_contracts_.collectorcontract.md#formatter)
* [hasErrors](_src_contracts_.collectorcontract.md#haserrors)

### Methods

* [getData](_src_contracts_.collectorcontract.md#getdata)
* [getErrors](_src_contracts_.collectorcontract.md#geterrors)
* [setError](_src_contracts_.collectorcontract.md#seterror)
* [setValue](_src_contracts_.collectorcontract.md#setvalue)

---

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](_src_contracts_.errorformattercontract.md)*

___
<a id="haserrors"></a>

###  hasErrors

**● hasErrors**: *`boolean`*

___

## Methods

<a id="getdata"></a>

###  getData

▸ **getData**(): `any`

**Returns:** `any`

___
<a id="geterrors"></a>

###  getErrors

▸ **getErrors**(): `ReturnType`<[toJSON](_src_contracts_.errorformattercontract.md#tojson)>

**Returns:** `ReturnType`<[toJSON](_src_contracts_.errorformattercontract.md#tojson)>

___
<a id="seterror"></a>

###  setError

▸ **setError**(pointer: *`string`*, rule: *`ParsedRule`*, message: *`Message`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| pointer | `string` |
| rule | `ParsedRule` |
| message | `Message` |

**Returns:** `void`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**(pointer: *`string`*, value: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| pointer | `string` |
| value | `any` |

**Returns:** `void`

___

