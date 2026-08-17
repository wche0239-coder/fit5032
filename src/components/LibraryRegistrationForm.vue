<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-3">User Information Form / Credentials</h1>

        <!-- Activity 3.1: HTML built-in validation attributes removed. -->
        <!-- Validation is now handled entirely in Vue (see <script setup>). -->
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="isAustralian"
              v-model="formData.isAustralian"
              @change="() => validateResident(true)"
            />
            <label class="form-check-label" for="isAustralian">Australian Resident?</label>
            <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining:</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              class="form-select"
              id="gender"
              v-model="formData.gender"
              @blur="() => validateGender(true)"
              @change="() => validateGender(true)"
            >
              <option value="" disabled>Select gender...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
          </div>

          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </form>

        <!-- Activity 4.3: submitted records now shown in a PrimeVue DataTable -->
        <div class="mt-5" v-if="submittedCards.length">
          <DataTable :value="submittedCards" tableStyle="min-width: 40rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column header="Australian Resident">
              <template #body="slotProps">
                {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
              </template>
            </Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

// Activity 3.2: object to store each field's error message (null = no error)
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

// Activity 3.3: Username validation
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

// Activity 3.7: Password validation
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character'
  } else {
    errors.value.password = null
  }
}

// Activity 3.11: Australian Resident validation (self-practice)
const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'You must confirm your residency status'
  } else {
    errors.value.resident = null
  }
}

// Activity 3.11: Gender validation (self-practice)
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender'
  } else {
    errors.value.gender = null
  }
}

// Activity 3.11: Reason validation (self-practice)
const validateReason = (blur) => {
  if (formData.value.reason.trim().length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters'
  } else {
    errors.value.reason = null
  }
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      ...formData.value,
    })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
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
