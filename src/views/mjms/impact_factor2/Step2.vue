<template>
  <div class="step2">
    <a-alert message="请核对活动信息，上报后将实时影响预测结果。" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="填报人"> xxx </a-descriptions-item>
      <a-descriptions-item label="活动名称"> xxx </a-descriptions-item>
      <a-descriptions-item label="活动类型"> xxx </a-descriptions-item>
      <a-descriptions-item label="活动描述"> xxx </a-descriptions-item>
      <a-descriptions-item label="活动日期">xxx</a-descriptions-item>
      <a-descriptions-item label="具体时间">xxx</a-descriptions-item>
      <a-descriptions-item label="活动涉及人员数量">xxx</a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Alert, Divider, Descriptions } from 'ant-design-vue';

  export default defineComponent({
    components: {
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    emits: ['next', 'prev'],
    setup(_, { emit }) {
      const [register, { validate, setProps }] = useForm({
        labelWidth: 80,
        actionColOptions: {
          span: 14,
        },
        resetButtonOptions: {
          text: '上一步',
        },
        submitButtonOptions: {
          text: '提交',
        },
        resetFunc: customResetFunc,
        submitFunc: customSubmitFunc,
      });

      async function customResetFunc() {
        emit('prev');
      }

      async function customSubmitFunc() {
        try {
          const values = await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            emit('next', values);
          }, 1500);
        } catch (error) {}
      }

      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .step2 {
    width: 450px;
    margin: 0 auto;
  }
</style>
