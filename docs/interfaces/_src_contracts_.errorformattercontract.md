[indicative-compiler](../README.md) > ["src/contracts"](../modules/_src_contracts_.md) > [ErrorFormatterContract](../interfaces/_src_contracts_.errorformattercontract.md)

# Interface: ErrorFormatterContract

The error formatter to format error messages

## Type parameters
#### T :  `any`
## Hierarchy

**ErrorFormatterContract**

## Implemented by

* [ErrorFormatter](../classes/_test_helpers_errorformatter_.errorformatter.md)

## Index

### Methods

* [addError](_src_contracts_.errorformattercontract.md#adderror)
* [toJSON](_src_contracts_.errorformattercontract.md#tojson)

---

## Methods

<a id="adderror"></a>

###  addError

▸ **addError**(field: *`string`*, message: *`string`*, rule: *`ParsedRule`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| field | `string` |
| message | `string` |
| rule | `ParsedRule` |

**Returns:** `void`

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `T`[]

**Returns:** `T`[]

___

