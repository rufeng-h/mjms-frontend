<template>
  <div>
    <PageWrapper>
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

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
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
