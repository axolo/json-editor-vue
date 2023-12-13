<script>
import { basicSetup } from 'codemirror'
import { EditorView, placeholder } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { json }  from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

export default {
  props: {
    modelValue: { // JSON string, object, array ...
    },
    readonly: { // true = EditorState.readOnly.of(true)
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
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
      ref: 'axolo_' + Math.random().toString(36).slice(2),
      editor: null
    }
  },
  // watch: {
  //   modelValue(value) {
  //     if(!this.editor) return
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
        const parent = this.$refs[this.ref]
        const basic = [
          basicSetup,
          EditorState.readOnly.of(this.readonly),
          placeholder(this.placeholder),
          json()
        ]
        const extensions = this.dark ? [...basic, oneDark] : basic

        this.editor = new EditorView({ doc, parent, extensions })
        this.editor.contentDOM.onblur = () => {
          try {
            const doc = this.editor.state.doc.toString()
            const val = this.codec === true ? JSON.parse(doc) : doc
            this.$emit('update:modelValue', val)
            this.$emit('change', val)
            this.$emit('error', false)
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
  <div :ref="ref" class="axolo-json-editor" />
</template>
