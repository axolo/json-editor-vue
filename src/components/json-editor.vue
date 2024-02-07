<script>
import { EditorView, basicSetup } from 'codemirror'
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
    },
    extensions: { // extensions for codemirror
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change', 'error'],
  data() {
    return {
      ref: 'axolo_' + Math.random().toString(36).slice(2),
      editor: null,
      error: false
    }
  },
  watch: {
    modelValue(value) {
      if(!this.editor) return
      this.editor.dispatch({
        changes: {
          from: 0,
          to: this.editor.state.doc.length,
          insert: this.doc(value)
        }
      })
    }
  },
  mounted() {
    this.init(this.modelValue)
  },
  methods: {
    doc(doc) {
      return this.codec === true ? JSON.stringify(doc, null, 2) : doc
    },
    init(value) {
      try {
        const parent = this.$refs[this.ref]
        const doc = this.doc(value)
        const extensions = this.dark
          ? [basicSetup, json(), oneDark, ...this.extensions]
          : [basicSetup, json(), ...this.extensions]

        this.editor = new EditorView({ doc, parent, extensions })

        if(this.readonly) {
          parent.querySelector('.cm-content').setAttribute('contenteditable', false)
        }

        this.editor.contentDOM.onblur = () => {
          try {
            const doc = this.editor.state.doc.toString()
            const val = (doc && this.codec) === true ? JSON.parse(doc) : doc
            this.$emit('update:modelValue', val)
            this.$emit('change', val)
            this.$emit('error', false)
            this.error = false
          } catch (error) {
            this.error = error
            this.$emit('error', error)
          }
        }
      } catch(error) {
        this.error = error
        this.$emit('error', error)
      }
    }
  }
}
</script>

<template>
  <div class="axolo-json-editor">
    <div class="tip">
      <div v-if="placeholder" class="placeholder">{{ placeholder }}</div>
      <div v-if="error" class="error">Error</div>
    </div>
    <div :ref="ref" class="editor" />
  </div>
</template>

<style lang="scss" scoped>
.axolo-json-editor {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 0.25em;
  .editor {
    :deep(.cm-content) {
      font-family: Consolas, 'Courier New', Courier, monospace;
      font-size: 0.9em;
    }
  }
  .tip {
    background-color: #eee;
    padding: 0 0.5em;
    line-height: 2;
    font-size: 0.85em;
    display: flex;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    .placeholder {
      color: #999;
      font-style: italic;
    }
    .error {
      color: #f00;
      font-weight: bold;
    }
  }
}
</style>
