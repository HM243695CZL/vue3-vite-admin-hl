<template>
  <div class="form-designer-container">
    <fc-designer ref="designer" height="100%"/>
  </div>
</template>

<script lang="ts">

export default {
  name: 'form-designer'
}
</script>

<style scoped lang="scss">
  .form-designer-container{
    padding: 20px;
    overflow: auto;
  }
</style>
