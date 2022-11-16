<template>
  <div class="designer-container">
    <fc-designer ref="designer"/>
    <div class="btn-box text-center">
      <el-button type="default" @click="clickCancel(false)">取消</el-button>
      <el-button type="primary" @click="clickSave">保存</el-button>
    </div>
    <DesignerModal
      ref="designerModalRef"
      @refreshList="clickCancel(true)"
    />
  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import DesignerModal from './designerModal.vue';
  import {ElMessage} from 'element-plus';

  const emits = defineEmits([
      'back'
  ]);
  const designer = ref();
  const designerModalRef = ref();
  const clickCancel = (refresh: boolean) => {
    emits('back', refresh);
  };
  // 回显表单
  const setRule = (rule: string) => {
    designer.value.setRule(rule);
  };
  const clickSave = () => {
    if (designer.value.getJson() === '[]') {
      ElMessage.error('至少添加一个组件');
      return false;
    }
    designerModalRef.value.openDialog(designer.value.getJson());
  };
  defineExpose({
    setRule
  })
</script>

<style scoped lang="scss">
  .designer-container{
    .btn-box{
      position: fixed;
      bottom: 30px;
      left: 50%;
    }
  }
</style>
