[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [ErrorFormatterContract](../interfaces/indicative_compiler.errorformattercontract.md)

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

* [addError](indicative_compiler.errorformattercontract.md#adderror)
* [toJSON](indicative_compiler.errorformattercontract.md#tojson)

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

