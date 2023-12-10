<script>
import { basicSetup, EditorView } from 'codemirror'
import { json }  from '@codemirror/lang-json'
import { EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'

export default {
  props: {
    modelValue: { // String = JSON string, other = Object | Array ...
    },
    readonly: { // true = readOnly
      type: Boolean,
      default: false
    },
    dark: { // true = dark theme, false = light theme
      type: Boolean,
      default: false
    },
    format: { // true = pretty print, false = compact, Function = custom formatter
      type: [Boolean, Function],
      default: false
    },
    codec: { // true = [JSON.stringify, JSON.parse], Array = [stringify, parse]
      type: [Boolean, Array],
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'error'],
  mounted() {
    // extensions
    const extensions = [
      basicSetup,
      json(),
      EditorState.readOnly.of(this.readonly)
    ]
    if (this.dark) extensions.push(oneDark)

    const editor = new EditorView({
      extensions,
      doc: this.modelValue,
      parent: this.$refs.jsonEditor,
      ...this.$attrs
    })

    editor.contentDOM.onblur = () => {
      const doc = editor.state.doc.toString()
      this.$emit('update:modelValue', doc)
      this.$emit('change', doc)
    }
  }
}
</script>

<template>
  <div ref="jsonEditor" class="axolo-json-editor-vue" />
</template>

<style lang="scss" scoped>
.axolo-json-editor-vue {
  .cm-editor {
    .cm-content {
      font-family: Consolas, 'Courier New', Courier, monospace !important;
    }
  }
}
</style>
