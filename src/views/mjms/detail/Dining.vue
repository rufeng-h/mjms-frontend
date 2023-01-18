<template>
  <div>
    <PageWrapper>
      <a-alert
        message="温馨提示"
        :description="
          '1. 只有确认过的并且设置为可投递的简历方可进行岗位投递。' +
          `\n` +
          '2. 已确认的简历不能进行修改，如需更新简历信息，请点击“创建简历”按钮。' +
          `\n` +
          '3. 岗位投递时您可选择确认过的可投递简历进行投递，可投递简历最多可设置5个。' +
          `\n` +
          '4. 默认简历只做为当有多份可投递简历投递时默认显示在第一位。'
        "
        type="info"
        show-icon
      />
      <BasicTable @register="registerTable" />
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { FormProps } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { pageDining } from '/@/api/mjms/dining';
  import { diningTableColumns } from '/@/api/mjms/model/diningModel';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import dayjs, { Dayjs } from 'dayjs';
  import { Alert } from 'ant-design-vue';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      [Alert.name]: Alert,
    },
    setup() {
      const formConfig: FormProps = {
        submitOnReset: false,
        labelWidth: 80,
        showAdvancedButton: true,
        compact: false,
        schemas: [
          {
            field: '[sdate, edate]',
            required: false,
            label: '起止日期',
            component: 'RangePicker',
            componentProps: {
              format: 'YYYY-MM-DD',
              allowEmpty: [true, true],
              placeholder: ['开始日期', '结束日期'],
              showTime: false,
              valueFormat: 'YYYY-MM-DD',
              disabledDate(date: Dayjs) {
                const today = dayjs(new Date());
                return today.isBefore(date);
              },
            },
          },
        ],
      };
      const [registerTable] = useTable({
        formConfig: formConfig,
        immediate: true,
        api: pageDining,
        title: '数据概览',
        titleHelpMessage: '温馨提示',
        columns: diningTableColumns,
        showIndexColumn: true,
        bordered: true,
        striped: true,
        showTableSetting: true,
        useSearchForm: true,
      });

      return { registerTable };
    },
  });
</script>

<style lang="less">
  :deep(.ant-alert-description) {
    white-space: pre-wrap !important;
  }

  :deep(.ant-alert) {
    border-radius: 8px;
  }
</style>
