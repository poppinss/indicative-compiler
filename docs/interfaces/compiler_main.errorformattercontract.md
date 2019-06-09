[indicative-compiler](../README.md) > [compiler/main](../modules/compiler_main.md) > [ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md)

# Interface: ErrorFormatterContract

The error formatter to format error messages

## Type parameters
#### T :  `any`
## Hierarchy

**ErrorFormatterContract**

## Index

### Methods

* [addError](compiler_main.errorformattercontract.md#adderror)
* [toJSON](compiler_main.errorformattercontract.md#tojson)

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

