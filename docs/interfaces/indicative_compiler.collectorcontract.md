[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [CollectorContract](../interfaces/indicative_compiler.collectorcontract.md)

# Interface: CollectorContract

Runtime collector that creates a fresh copy of validated properties and errors.

## Hierarchy

**CollectorContract**

## Implemented by

* [Collector](../classes/indicative_compiler.collector.md)

## Index

### Properties

* [formatter](indicative_compiler.collectorcontract.md#formatter)
* [hasErrors](indicative_compiler.collectorcontract.md#haserrors)

### Methods

* [getData](indicative_compiler.collectorcontract.md#getdata)
* [getErrors](indicative_compiler.collectorcontract.md#geterrors)
* [setError](indicative_compiler.collectorcontract.md#seterror)
* [setValue](indicative_compiler.collectorcontract.md#setvalue)

---

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](indicative_compiler.errorformattercontract.md)*

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

▸ **getErrors**(): `ReturnType`<[toJSON](indicative_compiler.errorformattercontract.md#tojson)>

**Returns:** `ReturnType`<[toJSON](indicative_compiler.errorformattercontract.md#tojson)>

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

