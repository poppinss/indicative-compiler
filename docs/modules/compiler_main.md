**[indicative-compiler](../README.md)**

[Globals](../README.md) › [compiler/main](compiler_main.md)

# External module: compiler/main

## Index

### Classes

* [TreeWalker](../classes/compiler_main.treewalker.md)

### Interfaces

* [CollectorContract](../interfaces/compiler_main.collectorcontract.md)
* [ErrorFormatterContract](../interfaces/compiler_main.errorformattercontract.md)

### Type aliases

* [ArrayWrapper](compiler_main.md#arraywrapper)
* [ConsumerFn](compiler_main.md#consumerfn)
* [SanitizationDataRoot](compiler_main.md#sanitizationdataroot)
* [SanitizationDefination](compiler_main.md#sanitizationdefination)
* [SanitizeFunction](compiler_main.md#sanitizefunction)
* [ValidateFunction](compiler_main.md#validatefunction)
* [ValidationDataRoot](compiler_main.md#validationdataroot)
* [ValidationDefination](compiler_main.md#validationdefination)

## Type aliases

###  ArrayWrapper

Ƭ **ArrayWrapper**: *function*

Array wrapper to wrap children nodes of inside a wildcard
or indexed array

#### Type declaration:

▸ (`index`: string, `field`: string, `children`: T | U[], `dotPath`: string[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`index` | string |
`field` | string |
`children` | T \| U[] |
`dotPath` | string[] |

___

###  ConsumerFn

Ƭ **ConsumerFn**: *function*

Tree node consumer called by the [TreeWalker](../classes/compiler_main.treewalker.md)

#### Type declaration:

▸ (`field`: string, `type`: "literal" | "object" | "array", `rules`: ParsedRule[], `dotPath`: string[], `pointer`: string): *T*

**Parameters:**

Name | Type |
------ | ------ |
`field` | string |
`type` | "literal" \| "object" \| "array" |
`rules` | ParsedRule[] |
`dotPath` | string[] |
`pointer` | string |

___

###  SanitizationDataRoot

Ƭ **SanitizationDataRoot**: *Pick‹[ValidationDataRoot](compiler_main.md#validationdataroot), Exclude‹keyof ValidationDataRoot, "pointer" | "arrayPointer"››*

Shape of sanitizer data root.

___

###  SanitizationDefination

Ƭ **SanitizationDefination**: *object*

Shape of sanitization defination

#### Type declaration:

___

###  SanitizeFunction

Ƭ **SanitizeFunction**: *function*

Shape of sanitization function.

#### Type declaration:

▸ (`data`: [SanitizationDataRoot](compiler_main.md#sanitizationdataroot), `field`: string, `args`: any[], `config`: unknown): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [SanitizationDataRoot](compiler_main.md#sanitizationdataroot) |
`field` | string |
`args` | any[] |
`config` | unknown |

___

###  ValidateFunction

Ƭ **ValidateFunction**: *function*

Shape of validation function

#### Type declaration:

▸ (`data`: [ValidationDataRoot](compiler_main.md#validationdataroot), `field`: string, `args`: any[], `config`: unknown): *boolean | Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ValidationDataRoot](compiler_main.md#validationdataroot) |
`field` | string |
`args` | any[] |
`config` | unknown |

___

###  ValidationDataRoot

Ƭ **ValidationDataRoot**: *object*

The data object passed to all validation functions.

#### Type declaration:

___

###  ValidationDefination

Ƭ **ValidationDefination**: *object*

Shape of validation defination

#### Type declaration: