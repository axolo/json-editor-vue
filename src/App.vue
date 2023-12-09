<script>
import JsonEditor from './components/json-editor.vue'

export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      json: null
    }
  }
}
</script>

<template>
  <div>
    <h3>json-editor-vue</h3>
    <json-editor v-model="json" readonly />
    <p>{{ JSON.parse(json) }}</p>
  </div>
</template>
