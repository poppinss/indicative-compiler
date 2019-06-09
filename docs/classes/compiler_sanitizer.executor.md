[indicative-compiler](../README.md) > [compiler/sanitizer](../modules/compiler_sanitizer.md) > [Executor](../classes/compiler_sanitizer.executor.md)

# Class: Executor

Executor is meant to execute the compiled functions with runtime data.

## Hierarchy

**Executor**

## Index

### Constructors

* [constructor](compiler_sanitizer.executor.md#constructor)

### Methods

* [exec](compiler_sanitizer.executor.md#exec)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Executor**(_fns: *([SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) \| [ArrayWrapper](compiler_sanitizer.arraywrapper.md))[]*): [Executor](compiler_sanitizer.executor.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _fns | ([SanitizationsRunner](compiler_sanitizer.sanitizationsrunner.md) \| [ArrayWrapper](compiler_sanitizer.arraywrapper.md))[] |

**Returns:** [Executor](compiler_sanitizer.executor.md)

___

## Methods

<a id="exec"></a>

###  exec

▸ **exec**(data: *`any`*, config: *`unknown`*): `any`

Executes the compiled functions in sequence.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |
| config | `unknown` |

**Returns:** `any`

___

