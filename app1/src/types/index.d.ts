import Vue from 'vue';

export declare interface WorkflowApprove extends Vue {
  visible?: boolean
}

declare module 'vue/types/WorkflowApprove' {
    interface ComponentOptions<V extends Vue> {
      visible?: boolean
    }
}