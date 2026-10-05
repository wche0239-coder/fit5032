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
import { ref, onMounted, onUnmounted } from 'vue'
import db from '@/Firebase/init'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const books = ref([])
let unsubscribe = null

onMounted(() => {
  const q = query(collection(db, 'books'), where('isbn', '>', 1000))

  //
  unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      books.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    },
    (error) => {
      console.error('Error listening to books: ', error)
    },
  )
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>
