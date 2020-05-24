<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'iForm',
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: {
                type: Object
            },
            rules: {
                type: Object
            }
        },
        data() {
            return {
                fields: [], // 用来缓存所有实例
            }
        },
        methods: {
            // 公开方法： 全部重置数据
            resetFields() {
                this.fields.forEach(field => {
                    field.resetField();
                })
            },

            // 公开方法： 校验全部
            validate(callback) {
                return new Promise(resolve => {
                    let valid = true;
                    let count = 0;
                    this.fields.forEach(field => {
                        // 传空是为了校验每一个规则
                        field.validate('', errors => {
                            if(errors) {
                                valid = false;
                            }
                            if(++count === this.fields.length) {
                                // 全部完成
                                resolve(valid);

                                // 可以直接执行回调函数
                                if(typeof callback === 'function') {
                                    callback(valid);
                                }
                            }
                        })
                    })
                })
            }
        },
        created() {
            this.$on('on-form-item-add', (field) => {
                if(field) this.fields.push(field);
                console.log(this.fields);
                
            });
            this.$on('on-form-item-remove', (field) => {
                if(field) this.fields.splice(this.fields.indexOf(field), 1);
            })
        },
    }
</script>

<style>

</style>