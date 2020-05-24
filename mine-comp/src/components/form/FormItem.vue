<template>
  <div>
    <label v-if="label" :class="{'i-form-item-label-required' : isRequired}">{{label}}:</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">{{validateMessage}}</div>
    </div>
  </div>
</template>

<script>
import Emitter from "./../../mixins/emitter";
import AsyncValidator from "async-validator";
export default {
  name: "iFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      isRequired: false,
      validateState: "", // 校验状态
      validateMessage: "", // 校验错误信息
      initialValue: "", // 初始值
    };
  },
  computed: {
    // 从Form的model中动态获得当前表单组件的数据
    fieldValue() { 
      return this.form.model[this.prop];
    }
  },
  methods: {
    setRules() {
      // 设置label
      let rules = this.getRules();
      if(rules.length) {
        this.isRequired = rules.some(rule => rule.required === true); // 只要其中有一项为true则返回true,需要设置label的必填前缀
      }

      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },

    // 重置数据
    // 重置有问题  
    resetField() {
      // this.validateState = '';
      // this.validateMessage = '';

      console.log(this.form.model[this.prop]);
      this.form.model[this.prop] = this.initialValue;
      
      // this.form.model[this.prop] = this.initialValue;
    },

    // 从Form的rules属性中获取当前组件的rule规则
    // 返回值为数组，每一项的校验规则就是一个数组
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },

    // 只支持blur和change,所以过滤出符合要求的rule规则
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },

    /**
     * 校验数据
     */
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger); // 过滤后的满足trigger条件的规则

      // 没有相关规则直接返回校验结果为true  
      if(!rules || rules.length === 0) {
        return true;
      }

      // 进行校验
      // 设置状态为校验中
      this.validateState = 'validating';

      // 调用async-validator库进行校验
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue; // 用户输入值
      
      validator.validate(model, {firstFields: true}, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      })
    },

    onFieldBlur() {
      // 进行校验
      this.validate('blur');
    },
    onFieldChange() {
      // 进行校验
      this.validate('change');
    }
  },
  mounted() {
    // 如果没有传入prop，则无需校验，也就无需缓存到Form中
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;

      // 监听表单控件中的触发校验规则的自定义事件
      this.setRules();
    }
  },
  beforeDestroy() {
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-remove", this);
    }
  }
};
</script>

<style>
label {
  margin-right: 10px;
}
.i-form-item-label-required::before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>