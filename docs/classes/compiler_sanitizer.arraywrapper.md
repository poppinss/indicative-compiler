[indicative-compiler](../README.md) > [compiler/sanitizer](../modules/compiler_sanitizer.md) > [ArrayWrapper](../classes/compiler_sanitizer.arraywrapper.md)

# Class: ArrayWrapper

Wraps an array of [SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) and executes them based upon the length of an data array at runtime.

## Hierarchy

**ArrayWrapper**

## Index

### Constructors

* [constructor](compiler_sanitizer.arraywrapper.md#constructor)

### Methods

* [exec](compiler_sanitizer.arraywrapper.md#exec)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ArrayWrapper**(_field: *`string`*, _index: *`string`*, _childSanitizations: *([SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) \| [ArrayWrapper](compiler_sanitizer.arraywrapper.md))[]*, _dotPath: *`string`[]*): [ArrayWrapper](compiler_sanitizer.arraywrapper.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _field | `string` |
| _index | `string` |
| _childSanitizations | ([SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) \| [ArrayWrapper](compiler_sanitizer.arraywrapper.md))[] |
| _dotPath | `string`[] |

**Returns:** [ArrayWrapper](compiler_sanitizer.arraywrapper.md)

___

## Methods

<a id="exec"></a>

###  exec

▸ **exec**(data: *[SanitizationDataRoot](../modules/compiler_main.md#sanitizationdataroot)*, config: *`unknown`*): `true` \| `void`

Execute series of validations for values inside an array

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | [SanitizationDataRoot](../modules/compiler_main.md#sanitizationdataroot) |
| config | `unknown` |

**Returns:** `true` \| `void`

___

