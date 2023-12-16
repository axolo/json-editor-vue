<script>
// import JsonEditor from '../dist' // test npm publish
import JsonEditor from './components/json-editor.vue'

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
  <div class="json-editor">
    <h3>@axolo/json-editor-vue</h3>
    <json-editor
      v-model="json"
      codec
      dark
      placeholder="please input json"
      @change="console.log"
      @error="console.error"
    />
    <p>{{ json }}</p>
  </div>
</template>

<style lang="scss">
.json-editor {
  .cm-editor {
    border: 1px solid #eee;
    border-radius: 0.25em;
    .cm-scroller {
      border-radius: 0.25em;
      font-family: Consolas, monospace;
      font-size: 0.9em;
    }
  }
}
</style>
