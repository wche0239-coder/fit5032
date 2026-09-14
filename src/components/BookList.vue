<template>
  <div class="mt-5">
    <h3>Books with ISBN &gt; 1000</h3>
    <ul class="list-group mt-3" v-if="books.length > 0">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="book in books"
        :key="book.id"
      >
        <span
          ><strong>{{ book.name }}</strong> (ISBN: {{ book.isbn }})</span
        >
      </li>
    </ul>
    <p v-else class="text-muted mt-3">No books found matching the criteria.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '@/Firebase/init'
import { collection, query, where, getDocs } from 'firebase/firestore'

const books = ref([])

// Asynchronously query books that meet the criteria.
const fetchBooks = async () => {
  try {
    // Construct a query for records in the `books` collection where `isbn > 1000`.
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))

    const querySnapshot = await getDocs(q)
    const booksArray = []

    querySnapshot.forEach((doc) => {
      booksArray.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

// Automatically execute the query when the component mounts.
onMounted(() => {
  fetchBooks()
})
</script>
