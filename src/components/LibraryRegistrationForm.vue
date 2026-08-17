<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-3">User Information Form / Credentials</h1>

        <!-- Activity 2: HTML built-in validation -->
        <!-- novalidate + was-validated class lets us control when Bootstrap's validation styles show -->
        <form novalidate :class="{ 'was-validated': formSubmitted }" @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              required
              minlength="3"
              maxlength="20"
            />
            <div class="invalid-feedback">
              Username is required and must be between 3 and 20 characters.
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              required
              minlength="8"
              pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
            />
            <div class="invalid-feedback">
              Password must be at least 8 characters and include both letters and numbers.
            </div>
          </div>

          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="isAustralian"
              v-model="formData.isAustralian"
            />
            <label class="form-check-label" for="isAustralian">Australian Resident?</label>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining:</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              required
              minlength="10"
            ></textarea>
            <div class="invalid-feedback">Please provide a reason (at least 10 characters).</div>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" id="gender" v-model="formData.gender" required>
              <option value="" disabled>Select gender...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <div class="invalid-feedback">Please select a gender.</div>
          </div>

          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </form>

        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem"
            >
              <div class="card-header">User Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">
                  Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

// Activity 2: tracks whether we should show Bootstrap's valid/invalid styling
const formSubmitted = ref(false)

const submitForm = (event) => {
  formSubmitted.value = true

  // event.target is the <form> element; checkValidity() runs the HTML5
  // built-in validation (required, minlength, pattern, etc.)
  const form = event.target
  if (!form.checkValidity()) {
    // Invalid: stop here so Bootstrap's .was-validated styles highlight the errors
    return
  }

  // Valid: proceed with submission
  submittedCards.value.push({
    ...formData.value,
  })

  clearForm()
  formSubmitted.value = false
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
