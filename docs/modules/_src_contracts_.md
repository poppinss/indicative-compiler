[indicative-compiler](../README.md) > ["src/contracts"](../modules/_src_contracts_.md)

# External module: "src/contracts"

## Index

### Interfaces

* [CollectorContract](../interfaces/_src_contracts_.collectorcontract.md)
* [ErrorFormatterContract](../interfaces/_src_contracts_.errorformattercontract.md)

### Type aliases

* [ArrayWrapper](_src_contracts_.md#arraywrapper)
* [ConsumerFn](_src_contracts_.md#consumerfn)
* [ValidateFunction](_src_contracts_.md#validatefunction)
* [ValidationDataRoot](_src_contracts_.md#validationdataroot)
* [ValidationDefination](_src_contracts_.md#validationdefination)

---

## Type aliases

<a id="arraywrapper"></a>

###  ArrayWrapper

**Ƭ ArrayWrapper**: *`function`*

Array wrapper to wrap children nodes of inside a wildcard or indexed array

#### Type declaration
▸(index: *`string`*, field: *`string`*, children: *(`T` \| `U`)[]*, dotPath: *`string`[]*): `U`

**Parameters:**

| Name | Type |
| ------ | ------ |
| index | `string` |
| field | `string` |
| children | (`T` \| `U`)[] |
| dotPath | `string`[] |

**Returns:** `U`

___
<a id="consumerfn"></a>

###  ConsumerFn

**Ƭ ConsumerFn**: *`function`*

Tree node consumer called by the [TreeWalker](../classes/_src_treewalker_.treewalker.md)

#### Type declaration
▸(field: *`string`*, type: *"literal" \| "object" \| "array"*, rules: *`ParsedRule`[]*, dotPath: *`string`[]*, pointer: *`string`*): `T`

**Parameters:**

| Name | Type |
| ------ | ------ |
| field | `string` |
| type | "literal" \| "object" \| "array" |
| rules | `ParsedRule`[] |
| dotPath | `string`[] |
| pointer | `string` |

**Returns:** `T`

___
<a id="validatefunction"></a>

###  ValidateFunction

**Ƭ ValidateFunction**: *`function`*

Shape of validation function

#### Type declaration
▸(data: *[ValidationDataRoot](_src_contracts_.md#validationdataroot)*, field: *`string`*, args: *`any`[]*): `boolean` \| `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | [ValidationDataRoot](_src_contracts_.md#validationdataroot) |
| field | `string` |
| args | `any`[] |

**Returns:** `boolean` \| `Promise`<`boolean`>

___
<a id="validationdataroot"></a>

###  ValidationDataRoot

**Ƭ ValidationDataRoot**: *`object`*

The data object passed to all validation functions.

#### Type declaration

___
<a id="validationdefination"></a>

###  ValidationDefination

**Ƭ ValidationDefination**: *`object`*

Shape of validation defination

#### Type declaration

___

