<template>
  <div>
    <PageWrapper title="就餐记录"> <BasicTable @register="registerTable" /> </PageWrapper
  ></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { FormProps } from '/@/components/Form';
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageMeal } from '/@/api/mjms/meal';
  import dayjs, { Dayjs } from 'dayjs';
  import { mealTableColumns } from '/@/api/mjms/model/mealModel';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
    },
    setup() {
      const formConfig: FormProps = {
        submitOnReset: false,
        labelWidth: 80,
        showAdvancedButton: false,
        compact: false,
        schemas: [
          {
            field: '[sdate, edate]',
            required: false,
            label: '起止日期',
            component: 'RangePicker',
            componentProps: {
              format: 'YYYY-MM-DD',
              allowEmpty: [false, true],
              placeholder: ['开始日期', '结束日期'],
              showTime: false,
              valueFormat: 'YYYY-MM-DD',
              disabledDate(date: Dayjs) {
                const today = dayjs(new Date());
                return today.isBefore(date) || date.isBefore(dayjs('2018-09-01', 'YYYY-MM-DD'));
              },
            },
          },
          {
            field: 'cardId',
            label: '卡号',
            required: false,
            component: 'Input',
            componentProps: {},
            colProps: {
              span: 4,
            },
          },
          {
            field: 'maxConsume',
            label: '最大消费',
            required: false,
            component: 'InputNumber',
            componentProps: {
              step: 0.5,
            },
            colProps: {
              span: 4,
            },
          },
          {
            field: 'minConsume',
            label: '最小消费',
            required: false,
            component: 'InputNumber',
            componentProps: {
              step: 0.5,
            },
            colProps: {
              span: 4,
            },
          },
        ],
      };
      const [registerTable] = useTable({
        formConfig: formConfig,
        immediate: true,
        api: pageMeal,
        title: '数据概览',
        titleHelpMessage: '温馨提示',
        columns: mealTableColumns,
        showIndexColumn: true,
        bordered: true,
        striped: true,
        showTableSetting: true,
        useSearchForm: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
