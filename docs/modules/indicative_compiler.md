[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md)

# External module: indicative-compiler

## Index

### Classes

* [ArrayWrapper](../classes/indicative_compiler.arraywrapper.md)
* [Collector](../classes/indicative_compiler.collector.md)
* [Compiler](../classes/indicative_compiler.compiler.md)
* [Executor](../classes/indicative_compiler.executor.md)
* [TreeWalker](../classes/indicative_compiler.treewalker.md)
* [ValidationsRunner](../classes/indicative_compiler.validationsrunner.md)

### Interfaces

* [CollectorContract](../interfaces/indicative_compiler.collectorcontract.md)
* [ErrorFormatterContract](../interfaces/indicative_compiler.errorformattercontract.md)

### Type aliases

* [ArrayWrapper](indicative_compiler.md#arraywrapper-1)
* [ConsumerFn](indicative_compiler.md#consumerfn)
* [ValidateFunction](indicative_compiler.md#validatefunction)
* [ValidationDataRoot](indicative_compiler.md#validationdataroot)
* [ValidationDefination](indicative_compiler.md#validationdefination)

---

## Type aliases

<a id="arraywrapper-1"></a>

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

Tree node consumer called by the [TreeWalker](../classes/indicative_compiler.treewalker.md)

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
▸(data: *[ValidationDataRoot](indicative_compiler.md#validationdataroot)*, field: *`string`*, args: *`any`[]*): `boolean` \| `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | [ValidationDataRoot](indicative_compiler.md#validationdataroot) |
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

