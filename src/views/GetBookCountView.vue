<template>
  <div class="container mt-5">
    <h1>Book Counter</h1>
    <button class="btn btn-primary" @click="getBookCount">Get Book Count</button>

    <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
    <p v-else-if="error" class="mt-3 text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    //  URL
    const response = await axios.get('http://127.0.0.1:5001/fit5032-lib/us-central1/countBooks')
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count: ', err)
    count.value = null
    error.value = 'error'
  }
}
</script>
