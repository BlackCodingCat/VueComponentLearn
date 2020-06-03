<template>
  <div class="home">
      <!-- <form-test></form-test> -->
      <componentA></componentA>
  </div>
</template>

<script>
// import FormTest from './../test/form-test'
import componentA from '@/test/A.vue'
export default {
    name: 'Home',
    components: {
        // FormTest
        componentA
    }
}
</script>
