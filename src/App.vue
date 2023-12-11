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
  <div>
    <h3>@axolo/json-editor-vue</h3>
    <json-editor
      v-model="json"
      class="json-editor"
      codec
      dark
      @change="console.log"
      @error="console.error"
    />
    <p>{{ json }}</p>
  </div>
</template>

<style lang="scss" scoped>
.json-editor {
  border-radius: 0.25em !important;
}
</style>
