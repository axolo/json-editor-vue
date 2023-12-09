<script>
import { basicSetup, EditorView } from 'codemirror'
import { json }  from '@codemirror/lang-json'

export default {
  props: {
    modelValue: {},
    theme: {
      type: String,
      default: 'light'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    codec: {
      type: [Boolean, Array],
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  mounted() {
    const editor = new EditorView({
      readOnly: this.readonly,
      doc: this.modelValue,
      extensions: [basicSetup, json()],
      parent: this.$refs.jsonEditor
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