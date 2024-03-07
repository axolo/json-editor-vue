<script>
import JsonEditor from './components/json-editor.vue'
// import JsonEditor from '../dist' // test npm publish

export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      dark: true,
      readonly: false,
      text: false,
      json: {
        required: true,
        message: 'please input content'
      }
    }
  },
  methods: {
    doc() {
      this.text = !this.text
      this.json = this.text ? [
        { first: 'Yueming', last: 'Fang' },
        { first: 'Da', last: 'Fang' }
      ] : {
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

    <div>
      <button @click="doc">change json</button>
    </div>

    <json-editor
      v-model="json"
      codec
      :dark="dark"
      :readonly="readonly"
      placeholder="please input json"
      @change="console.log"
      @error="console.error"
    />

    <p>{{ json }}</p>
  </div>
</template>

<style lang="scss">
.json-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
