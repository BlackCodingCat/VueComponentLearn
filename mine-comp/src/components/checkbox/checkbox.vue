<template>
  <div>
    <label>
      <span>
        <input 
          type="checkbox" 
          :disabled="disabled"
          :checked="chekced"
          @change="change">
      </span>

      <!-- 标签文字 -->
      <slot></slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'iCheckbox',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: { // v-model语法糖, 默认从上级传过来的
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      // 父级修改value响应
      value(val) {
        
      }
    },
    methods: {
      change(e) {
        if(this.disabled) {
          return false;
        }

        const checked = e.target.checked; // true / false
        this.currentValue = checked;

        const value = checked ? this.trueValue : this.falseValue; // 转换一下形式
        this.$emit('input', value);
        this.$emit('on-change', value);
      }
    },
  }
</script>

<style>

</style>