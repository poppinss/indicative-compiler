[indicative-compiler](../README.md) > [indicative-compiler](../modules/indicative_compiler.md) > [ValidationsRunner](../classes/indicative_compiler.validationsrunner.md)

# Class: ValidationsRunner

Runs a series of validations on a given field. This class is feeded with the computed nodes generated via [TreeWalker](indicative_compiler.treewalker.md).

## Hierarchy

**ValidationsRunner**

## Index

### Constructors

* [constructor](indicative_compiler.validationsrunner.md#constructor)

### Properties

* [async](indicative_compiler.validationsrunner.md#async)

### Methods

* [exec](indicative_compiler.validationsrunner.md#exec)
* [execAsync](indicative_compiler.validationsrunner.md#execasync)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ValidationsRunner**(_field: *`string`*, _type: *"literal" \| "object" \| "array"*, _dotPath: *`string`[]*, rules: *`ParsedRule`[]*, validations: *`object`*, _fieldMessages: *`ParsedRulesMessages`*, _genericMessages: *`ParsedRulesMessages`*): [ValidationsRunner](indicative_compiler.validationsrunner.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| _field | `string` |
| _type | "literal" \| "object" \| "array" |
| _dotPath | `string`[] |
| rules | `ParsedRule`[] |
| validations | `object` |
| _fieldMessages | `ParsedRulesMessages` |
| _genericMessages | `ParsedRulesMessages` |

**Returns:** [ValidationsRunner](indicative_compiler.validationsrunner.md)

___

## Properties

<a id="async"></a>

###  async

**● async**: *`boolean`* = false

We toggle this flag then creating the `_validations` object

___

## Methods

<a id="exec"></a>

###  exec

▸ **exec**(data: *[ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot)*, collector: *[Collector](indicative_compiler.collector.md)*, bail?: *`boolean`*): `boolean`

Executes all the validations on a given field synchronously. Run [ValidationsRunner.execAsync](indicative_compiler.validationsrunner.md#execasync) if want to execute asynchronously.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot) | - |
| collector | [Collector](indicative_compiler.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `boolean`

___
<a id="execasync"></a>

###  execAsync

▸ **execAsync**(data: *[ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot)*, collector: *[Collector](indicative_compiler.collector.md)*, bail?: *`boolean`*): `Promise`<`boolean`>

Executes all the validations on a given field asynchronously. Run [ValidationsRunner.exec](indicative_compiler.validationsrunner.md#exec) if want to execute synchronously.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/indicative_compiler.md#validationdataroot) | - |
| collector | [Collector](indicative_compiler.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `Promise`<`boolean`>

___

