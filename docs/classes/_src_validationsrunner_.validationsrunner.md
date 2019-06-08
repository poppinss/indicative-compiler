[indicative-compiler](../README.md) > ["src/ValidationsRunner"](../modules/_src_validationsrunner_.md) > [ValidationsRunner](../classes/_src_validationsrunner_.validationsrunner.md)

# Class: ValidationsRunner

Validations runner to run a series on validations on a given field based upon the defined rules.

## Hierarchy

**ValidationsRunner**

## Index

### Constructors

* [constructor](_src_validationsrunner_.validationsrunner.md#constructor)

### Properties

* [async](_src_validationsrunner_.validationsrunner.md#async)

### Methods

* [exec](_src_validationsrunner_.validationsrunner.md#exec)
* [execAsync](_src_validationsrunner_.validationsrunner.md#execasync)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ValidationsRunner**(_field: *`string`*, _type: *"literal" \| "object" \| "array"*, _dotPath: *`string`[]*, rules: *`ParsedRule`[]*, validations: *`object`*, _fieldMessages: *`ParsedRulesMessages`*, _genericMessages: *`ParsedRulesMessages`*): [ValidationsRunner](_src_validationsrunner_.validationsrunner.md)

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

**Returns:** [ValidationsRunner](_src_validationsrunner_.validationsrunner.md)

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

▸ **exec**(data: *[ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot)*, collector: *[Collector](_src_collector_.collector.md)*, bail?: *`boolean`*): `boolean`

Executes all the validations on a given field synchronously. Run [ValidationsRunner.execAsync](_src_validationsrunner_.validationsrunner.md#execasync) if want to execute asynchronously.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot) | - |
| collector | [Collector](_src_collector_.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `boolean`

___
<a id="execasync"></a>

###  execAsync

▸ **execAsync**(data: *[ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot)*, collector: *[Collector](_src_collector_.collector.md)*, bail?: *`boolean`*): `Promise`<`boolean`>

Executes all the validations on a given field asynchronously. Run [ValidationsRunner.exec](_src_validationsrunner_.validationsrunner.md#exec) if want to execute synchronously.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | [ValidationDataRoot](../modules/_src_contracts_.md#validationdataroot) | - |
| collector | [Collector](_src_collector_.collector.md) | - |
| `Default value` bail | `boolean` | false |

**Returns:** `Promise`<`boolean`>

___

