<template>
    <div>
        <i-form :model="formValidate" :rules="rulesValidate" ref="form">
            <i-form-item label="姓名" prop="name">
                <i-input v-model="formValidate.name"></i-input>
            </i-form-item>
            <i-form-item label="邮箱" prop="mail">
                <i-input v-model="formValidate.mail"></i-input>
            </i-form-item>
        </i-form>
        <button @click="handleSubmit">提交</button>
        <button @click="handleReset">重置</button>
    </div>
</template>

<script>
    import iForm from './../components/form/Form';
    import iFormItem from './../components/form/FormItem';
    import iInput from './../components/input/input';
    export default {
        name: 'FormTest',
        components: {
            iForm,
            iFormItem,
            iInput
        },
        data() {
            return {
                formValidate: {
                    name: '',
                    mail: ''
                },
                rulesValidate: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {required: true, message: '用户名不能为空', trigger: 'change'}
                    ],
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                // 第一种方法，直接执行回调
                // this.$refs.form.validate(valid => {
                //     if(valid) {
                //         window.alert('提交成功');
                //     }else {
                //         window.alert('提交失败');
                //     }
                // })

                // 第二种方法 promise
                const validate = this.$refs.form.validate();

                validate.then((valid) => {
                    if(valid) {
                        window.alert('提交成功');
                    }else {
                        window.alert('表单校验失败');
                    }
                })
            },
            handleReset() {
                this.$refs.form.resetFields();
            }
        },
    }
</script>

<style>

</style>