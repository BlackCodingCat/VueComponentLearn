<template>
  <input type="text" 
    :value="currentValue" 
    @input="handleInput" 
    @blur="handleBlur" />
</template>

<script>
import Emitter from './../../mixins/emitter';
export default {
  name: 'iInput',
  props: {
    value: {
      type: String,
      default: ''
    } // value用来接收传过来的默认值，不传则为空？
  },
  mixins: [Emitter],
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value: {
      handler(value) {
        this.currentValue = value;
      }
    }
  },
  methods: {
    // input框有输入时即会触发
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', this.currentValue); // 修改绑定值  与父元素的v-model一起用，  === > 详情看v-model原理
      this.dispatch('iFormItem','on-form-change',this.currentValue);
    },
    // input框失去焦点时触发
    handleBlur() {
        this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
    }
  }
};
</script>

<style>
</style>