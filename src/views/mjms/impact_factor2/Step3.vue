<template>
  <div class="step3">
    <a-result status="success" title="操作成功" sub-title="已成功上报">
      <template #extra>
        <a-button type="primary" @click="redo"> 再次填报 </a-button>
      </template>
    </a-result>
    <div class="desc-wrap">
      <a-descriptions :column="1" class="mt-5">
        <a-descriptions-item label="填报人"> xxx </a-descriptions-item>
        <a-descriptions-item label="活动名称"> xxx </a-descriptions-item>
        <a-descriptions-item label="活动类型"> xxx </a-descriptions-item>
        <a-descriptions-item label="活动描述"> xxx </a-descriptions-item>
        <a-descriptions-item label="活动日期">xxx</a-descriptions-item>
        <a-descriptions-item label="具体时间">xxx</a-descriptions-item>
        <a-descriptions-item label="活动涉及人员数量">xxx</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Result, Descriptions } from 'ant-design-vue';
  export default defineComponent({
    components: {
      [Result.name]: Result,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    emits: ['redo'],
    setup(_, { emit }) {
      return {
        redo: () => {
          emit('redo');
        },
      };
    },
  });
</script>
<style lang="less" scoped>
  .step3 {
    width: 600px;
    margin: 0 auto;
  }

  .desc-wrap {
    padding: 24px 40px;
    margin-top: 24px;
    background-color: @background-color-light;
  }
</style>
