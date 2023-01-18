<template
  ><Card hoverable>
    <div class="py-4 px-4 flex justify-between items-center">
      <Icon icon="fluent-mdl2:breakfast" :size="30" />
      {{ dn?.amsBreakfast }}
      {{ bfVary }}
      <CountTo
        :startVal="1"
        :endVal="dn.amsBreakfast"
        class="text-xl"
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
      const bfVary = computed(() => {
        if (props.prevDn && props.dn && props.dn.amsBreakfast) {
          return (props.dn.amsBreakfast - props.prevDn.amsBreakfast) / props.prevDn.amsBreakfast;
        }
        return undefined;
      });
      const lnVary = computed(() => {
        if (props.prevDn && props.dn && props.dn.realLunch) {
          return (props.dn.realLunch - props.prevDn.realLunch) / props.prevDn.realLunch;
        }
        return undefined;
      });
      const dnVary = computed(() => {
        if (props.prevDn && props.dn && props.dn.realDinner) {
          return (props.dn.realDinner - props.prevDn.realDinner) / props.prevDn.realDinner;
        }
        return undefined;
      });
      return {
        ...toRefs(props),
        bfVary,
        lnVary,
        dnVary,
      };
    },
  });
</script>
