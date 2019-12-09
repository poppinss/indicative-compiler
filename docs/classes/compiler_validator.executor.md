[indicative-compiler](../README.md) › [compiler/validator](../modules/compiler_validator.md) › [Executor](compiler_validator.executor.md)

# Class: Executor

Executor is meant to execute the compiled functions with runtime
data.

## Hierarchy

* **Executor**

## Index

### Constructors

* [constructor](compiler_validator.executor.md#constructor)

### Methods

* [exec](compiler_validator.executor.md#exec)

## Constructors

###  constructor

\+ **new Executor**(`fns`: [ValidationsRunner](compiler_validator.validationsrunner.md)‹› | [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[]): *[Executor](compiler_validator.executor.md)*

**Parameters:**

Name | Type |
------ | ------ |
`fns` | [ValidationsRunner](compiler_validator.validationsrunner.md)‹› &#124; [ArrayWrapper](compiler_validator.arraywrapper.md)‹›[] |

**Returns:** *[Executor](compiler_validator.executor.md)*

## Methods

###  exec

▸ **exec**(`data`: any, `Formatter`: object, `config`: unknown, `bail`: boolean, `removeAdditional`: boolean, `customErrorCollector?`: [ErrorCollectorFn](../modules/compiler_main.md#errorcollectorfn)): *Promise‹any›*

Executes the compiled functions in sequence.

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`Formatter` | object |
`config` | unknown |
`bail` | boolean |
`removeAdditional` | boolean |
`customErrorCollector?` | [ErrorCollectorFn](../modules/compiler_main.md#errorcollectorfn) |

**Returns:** *Promise‹any›*
