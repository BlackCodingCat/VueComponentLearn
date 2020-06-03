<template>
  <div>组件B</div>
</template>

<script>
import { findComponentUpward } from "../util/assist";
export default {
  name: "componentB",
  mounted() {
    const compA = findComponentUpward(this, "componentA");
    if (compA) {
      console.log(compA.name);
      compA.sayHello();
    } else {
      throw "未找到compA";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>