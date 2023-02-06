<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register">
        <template #activaty_des="{ model, field }">
          <a-input-group compact>
            <a-select v-model:value="model['activaty_type']" class="pay-select">
              <a-select-option value="huiyi">会议</a-select-option>
              <a-select-option value="wanhui">晚会</a-select-option>
              <a-select-option value="xuncha">巡查</a-select-option>
              <a-select-option value="jieri">节日</a-select-option>
              <a-select-option value="tufa">突发</a-select-option>
            </a-select>
            <a-input class="pay-input" v-model:value="model[field]" />
          </a-input-group>
        </template>
      </BasicForm>
    </div>
    <h3>说明</h3>
    <h4>目前仍缺少活动对餐厅人流量影响的相关数据，无法为模型赋予适宜的权重因子。</h4>
    <h5
      >活动的提前上报，一是为了实时地更新预测值，使其更为准确；二是为了收集数据，为之后的模型改进做准备。</h5
    >
    <p>
      因此，请在活动描述时尽量着重说明该活动对上班人流量大致影响（增多/集中/减少/...），这将有助于数据的量化统计。
    </p>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas } from './data';
  import { Select, Input, Divider } from 'ant-design-vue';
  export default defineComponent({
    name: 'Report',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      BasicForm,
      [Select.name]: Select,
      // eslint-disable-next-line vue/no-unused-components
      ASelectOption: Select.Option,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
    },
    emits: ['next'],
    setup(_, { emit }) {
      const [register, { validate }] = useForm({
        labelWidth: 100,
        schemas: step1Schemas,
        actionColOptions: {
          span: 14,
        },
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          const values = await validate();
          emit('next', values);
        } catch (error) {}
      }
      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 450px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      line-height: 32px;
      color: @text-color;
    }

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      line-height: 22px;
      color: @text-color;
    }

    p {
      color: @text-color;
    }
  }

  .pay-select {
    width: 20%;
  }

  .pay-input {
    width: 70%;
  }
</style>
