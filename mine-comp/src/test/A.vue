<template>
  <div>
    组件A
    <componentB></componentB>
  </div>
</template>

<script>
  import componentB from './B'
  export default {
    name: 'componentA',
    components: {componentB},
    data() {
      return {
        name: 'BlackCodingCat'
      }
    },
    methods: {
      sayHello() {
        console.log('Hello,I’m' + this.name);
        
      }
    },
  }
</script>

<style>

</style>