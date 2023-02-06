import { FormSchema } from '/@/components/Form';
import dayjs, {Dayjs} from "dayjs";

const peopelNumOptions: LabelValueOptions = [
  {
    label: '小于100',
    value: '1',
  },
  {
    label: '100-300',
    value: '2',
  },
  {
    label: '300-500',
    value: '3',
  },
  {
    label: '大于500',
    value: '4',
  },
];

// @ts-ignore
export const step1Schemas: FormSchema[] = [
  {
    field: 'people_name',
    component: 'Input',
    label: '填报人',
    required: true,
    componentProps: {},
    colProps: {
      span: 24,
    },
  },
  {
    field: 'activaty_name',
    component: 'Input',
    label: '活动名称',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'activaty_des',
    component: 'InputGroup',
    label: '活动描述',
    required: true,
    slot: 'activaty_des',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'activaty_type',
    component: 'Input',
    label: '',
    defaultValue: 'huiyi',
    show: false,
  },
  {
    field: '[sdate, edate]',
    component: 'RangePicker',
    label: '活动日期',
    required: true,
    componentProps: {
      format: 'YYYY-MM-DD',
      allowEmpty: [false, false],
      placeholder: ['开始日期', '结束日期'],
      showTime: false,
      valueFormat: 'YYYY-MM-DD',
      disabledDate(date: Dayjs) {
        const today = dayjs(new Date());
        return today.isBefore(date) || date.isBefore(dayjs('2022-01-01', 'YYYY-MM-DD'));
      },
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'time',
    component: 'TimePicker',
    label: '具体时间',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'number_people',
    component: 'Select',
    label: '涉及人员数量',
    required: true,
    componentProps: {
      options: peopelNumOptions,
    },
    colProps: {
      span: 24,
    },
  },
];
