<template>
  <div class="container mt-5">
    <h2>Add New Book</h2>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN:</label>
        <input
          type="number"
          id="isbn"
          v-model.number="isbn"
          class="form-control"
          placeholder="Enter numeric ISBN"
          required
        />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Book Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="form-control"
          placeholder="Enter book title"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <hr class="my-4" />

    <!--Embed the book list component  -->
    <BookList ref="bookListRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '@/Firebase/init'
import { collection, addDoc } from 'firebase/firestore'
// Import the newly created BookList component.
import BookList from '@/components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const bookListRef = ref(null)

const addBook = async () => {
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value,
    })

    alert('Book added successfully!')

    // clear form
    isbn.value = null
    name.value = ''

    // Retrigger list refresh
    if (bookListRef.value && bookListRef.value.fetchBooks) {
      bookListRef.value.fetchBooks()
    }
  } catch (error) {
    console.error('Error adding book: ', error)
    alert('Error adding book: ' + error.message)
  }
}
</script>
