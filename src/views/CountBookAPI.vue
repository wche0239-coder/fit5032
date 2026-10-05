<template>
  <pre><code>{{ jsondata }}</code></pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)

// Call the Cloud Function and return only response.data (JSON)
const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://countbooks-re4yrwdxoa-uc.a.run.app')
    return response.data
  } catch (error) {
    console.error('Error fetching book count: ', error)
    return { error: 'Failed to fetch book count' }
  }
}

// No button needed for an API service: fetch data as soon as the page loads
onMounted(async () => {
  jsondata.value = await getBookCountAPI()
})
</script>
