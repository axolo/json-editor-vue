<script>
import JsonEditor from './components/json-editor.vue'

export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      json: JSON.stringify({
        required: true,
        message: 'please input content'
      }, null, 2)
    }
  },
  methods: {
    change(json) {
      console.log('string', json)
      console.log('parse:', JSON.parse(json))
    }
  }
}
</script>

<template>
  <div>
    <h3>json-editor-vue</h3>
    <json-editor
      v-model="json"
      class="json-editor"
      placeholder="json-editor-vue"
      @change="change"
    />
    <p>{{ JSON.parse(json) }}</p>
  </div>
</template>

<style scoped>
.json-editor {
  border: 1px solid #eee;
  border-radius: 0.25em;
}
</style>
