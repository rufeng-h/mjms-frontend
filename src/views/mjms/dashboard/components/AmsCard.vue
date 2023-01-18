<template
  ><Card hoverable>
    <div class="py-4 px-4 flex justify-between items-center">
      <Icon icon="fluent-mdl2:breakfast" :size="40" />
      {{ dn?.amsBreakfast }}
      {{ bfError }}
      <CountTo
        :startVal="1"
        :endVal="dn.amsBreakfast"
        class="text-2xl"
        v-if="dn !== null && dn.amsBreakfast !== undefined"
      />
    </div>
  </Card>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { computed, defineComponent, PropType, toRefs } from 'vue';
  import { Dining } from '/@/api/mjms/model/diningModel';
  import { CountTo } from '/@/components/CountTo';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    components: { Card, CountTo, Icon },
    props: {
      dn: {
        type: Object as Nullable<PropType<Dining>>,
        required: true,
      },
      prevDn: {
        type: Object as Nullable<PropType<Dining>>,
        required: true,
      },
    },
    setup(props) {
      const bfError = computed(() => {
        if (props.prevDn && props.dn && props.dn.amsBreakfast) {
          return (props.dn.amsBreakfast - props.prevDn.amsBreakfast) / props.prevDn.amsBreakfast;
        }
        return undefined;
      });
      const lnError = computed(() => {
        if (props.prevDn && props.dn && props.dn.amsLunch) {
          return (props.dn.amsLunch - props.prevDn.amsLunch) / props.prevDn.amsLunch;
        }
        return undefined;
      });
      const dnError = computed(() => {
        if (props.prevDn && props.dn && props.dn.amsDinner) {
          return (props.dn.amsDinner - props.prevDn.amsDinner) / props.prevDn.amsDinner;
        }
        return undefined;
      });
      return {
        ...toRefs(props),
        bfError,
        lnError,
        dnError,
      };
    },
  });
</script>
