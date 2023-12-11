<script>
import { basicSetup, EditorView } from 'codemirror'
import { json }  from '@codemirror/lang-json'
import { EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'

export default {
  props: {
    modelValue: { // JSON string, object, array ...
    },
    readonly: { // true = EditorState.readOnly.of(true)
      type: Boolean,
      default: false
    },
    codec: { // true = [JSON.stringify, JSON.parse], Array = [decode, encode]
      type: [Boolean, Array],
      default: false
    },
    dark: { // true = dark theme, false = light theme
      type: Boolean,
      default: false
    },
    format: { // true = pretty, false = keep it, Function = custom
      type: [Boolean, Function],
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'error'],
  data() {
    return {
      editor: null
    }
  },
  // watch: {
  //   modelValue(value) {
  //     this.editor?.destroy()
  //     this.init(value)
  //   }
  // },
  mounted() {
    this.init(this.modelValue)
  },
  methods: {
    init(value) {
      try {
        const doc = this.codec === true ? JSON.stringify(value, null, 2) : value

        const extensions = [
          basicSetup,
          json(),
          EditorState.readOnly.of(this.readonly)
        ]

        if (this.dark) {
          extensions.push(oneDark)
        }

        this.editor = new EditorView({
          extensions,
          doc,
          parent: this.$refs.jsonEditor,
          ...this.$attrs
        })

        this.editor.contentDOM.onblur = () => {
          try {
            const doc = this.editor.state.doc.toString()
            const val = this.codec === true ? JSON.parse(doc) : doc
            this.$emit('update:modelValue', val)
            this.$emit('change', val)
          } catch (error) {
            this.$emit('error', error)
          }
        }
      } catch(error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>

<template>
  <div ref="jsonEditor" class="axolo-json-editor" />
</template>
