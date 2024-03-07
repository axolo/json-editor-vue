# @axolo/json-editor-vue

A simple JSON editor of Vue based on [CodeMirror](https://codemirror.net/) Version 6.

## Install

```bash
npm i @axolo/json-editor-vue
```

## Usage

```vue
<script>
import JsonEditor from '@axolo/json-editor-vue'

export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      json: {
        required: true,
        message: 'please input content'
      }
    }
  }
}
</script>

<template>
  <json-editor
    v-model="json"
    codec
    dark
    placeholder="please input json"
    @change="console.log"
    @error="console.error"
  />
</template>
```

## Props

|     Name      |         Type          | Default |            Description             |
| ------------- | --------------------- | ------- | ---------------------------------- |
| `modelValue`  | `any`                 |         | JSON string, object, array ...     |
| `placeholder` | `String`              |         | placeholder                        |
| `readonly`    | `Boolean`             | `false` | readonly                           |
| `dark`        | `Boolean`             | `false` | dark theme as oneDark              |
| `codec`       | `[Boolean, Array]`    | `false` | See [codec](#codec)                |
| `format`      | `[Boolean, Function]` | `false` | See [format](#format) (TODO)       |
| `extensions`  | `Array`               | `[]`    | extra codemirror extensions (TODO) |

### codec

|  Value  |                           Description                           |
| ------- | --------------------------------------------------------------- |
| `false` | default, do nothing, `modelValue` is JSON string                |
| `true`  | `[JSON.stringify, JSON.parse]`, `modelValue` is not JSON string |
| `Array` | custom codec, Aarray of [encode, decode] (TODO)                 |

### format

|   Value    |           Description           |
| ---------- | ------------------------------- |
| `false`    | default, do nothing             |
| `true`     | `JSON.stringify(json, null, 2)` |
| `Function` | custom formatter                |

## Emits

|        Name         | Parameters |           Description            |
| ------------------- | ---------- | -------------------------------- |
| `update:modelValue` | json       | update modelValue                |
| `change`            | json       | value of modelValue              |
| `error`             | error      | throw error or `false` when blur |

> Yueming Fang
> 2023-12-09
