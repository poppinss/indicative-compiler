[indicative-compiler](../README.md) > [compiler/main](../modules/compiler_main.md) > [CollectorContract](../interfaces/compiler_main.collectorcontract.md)

# Interface: CollectorContract

Runtime collector that creates a fresh copy of validated properties and errors.

## Hierarchy

**CollectorContract**

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

---

## Properties

<a id="formatter"></a>

###  formatter

**● formatter**: *[ErrorFormatterContract](compiler_main.errorformattercontract.md)*

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

▸ **getErrors**(): `ReturnType`<[toJSON](compiler_main.errorformattercontract.md#tojson)>

**Returns:** `ReturnType`<[toJSON](compiler_main.errorformattercontract.md#tojson)>

___
<a id="seterror"></a>

###  setError

▸ **setError**(pointer: *`string`*, rule: *`ParsedRule`*, message: *`Message` \| `Error`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| pointer | `string` |
| rule | `ParsedRule` |
| message | `Message` \| `Error` |

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

