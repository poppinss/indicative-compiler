> **[indicative-compiler](../README.md)**

[Globals](../README.md) / [compiler/main](../modules/compiler_main.md) / [ErrorFormatterContract](compiler_main.errorformattercontract.md) /

# Interface: ErrorFormatterContract <**T**>

The error formatter to format error messages

## Type parameters

▪ **T**: *any*

## Hierarchy

* **ErrorFormatterContract**

### Index

#### Methods

* [addError](compiler_main.errorformattercontract.md#adderror)
* [toJSON](compiler_main.errorformattercontract.md#tojson)

## Methods

###  addError

▸ **addError**(`error`: string | `Error`, `field`: string, `rule`: `ParsedRule`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | string \| `Error` |
`field` | string |
`rule` | `ParsedRule` |

**Returns:** *void*

___

###  toJSON

▸ **toJSON**(): *`T`[] | null*

**Returns:** *`T`[] | null*