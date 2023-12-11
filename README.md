# @axolo/json-editor-vue

A Simple JSON Editor of Vue.

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
  <json-editor v-model="json" codec dark />
</template>
```

## Props

|     Name     |         Type          | Default |          Description           |
| ------------ | --------------------- | ------- | ------------------------------ |
| `modelValue` | `any`                 |         | JSON string, object, array ... |
| `readonly`   | `Boolean`             | `false` | Editor readonly                |
| `dark`       | `Boolean`             | `false` | dark theme                     |
| `codec`      | `[Boolean, Array]`    | `false` | See [codec](#codec)            |
| `format`     | `[Boolean, Function]` | `false` | See [format](#format) (TODO)   |

### codec

|  Value  |                           Description                           |
| ------- | --------------------------------------------------------------- |
| `false` | default, `modelValue` is JSON string                            |
| `true`  | `[JSON.stringify, JSON.parse]`, `modelValue` is not JSON string |
| `Array` |  custom codec, Aarray of [encode, decode] (TODO)                |

### format

|   Value    |           Description           |
| ---------- | ------------------------------- |
| `false`    | default                         |
| `true`     | `JSON.stringify(json, null, 2)` |
| `Function` | custom formatter                |

## Emits

|        Name         | Parameters |       Description        |
| ------------------- | ---------- | ------------------------ |
| `update:modelValue` | json       | same type as v-model     |
| `change`            | json       | same type as v-model     |
| `error`             | error      | throw message when error |

> Yueming Fang
> 2023-12-09
