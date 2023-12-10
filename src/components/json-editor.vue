<script>
import { basicSetup, EditorView } from 'codemirror'
import { json }  from '@codemirror/lang-json'
import { EditorState } from '@codemirror/state'

export default {
  props: {
    modelValue: { // String = JSON string, other = Object | Array ...
    },
    theme: { // light = default, dark = OneDark
      type: String
    },
    readonly: { // true = readOnly
      type: Boolean,
      default: false
    },
    codec: { // true = [JSON.stringify, JSON.parse], Array = [stringify, parse]
      type: [Boolean, Array],
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'error'],
  mounted() {
    const editor = new EditorView({
      doc: this.modelValue,
      parent: this.$refs.jsonEditor,
      extensions: [
        basicSetup,
        json(),
        EditorState.readOnly.of(this.readonly)
      ],
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
