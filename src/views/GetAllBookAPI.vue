<template>
  <pre><code>{{ jsondata }}</code></pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)

// Call the getAllBooks Cloud Function and return only response.data (JSON)
const getAllBookAPI = async () => {
  try {
    const response = await axios.get('https://us-central1-fit5032-lib.cloudfunctions.net/getAllBooks')
    return response.data
  } catch (error) {
    console.error('Error fetching books: ', error)
    return { error: 'Failed to fetch books' }
  }
}

onMounted(async () => {
  jsondata.value = await getAllBookAPI()
})
</script>
