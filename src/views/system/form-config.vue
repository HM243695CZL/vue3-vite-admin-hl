<template>
  <div class="form-config-container h100">
    <form-create v-model="value" :rule="rule" v-model:api="fApi" :option="options"/>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from 'vue';

export default {
  name: 'form-config',
  setup() {
    const state = reactive({
      // 实例对象
      fApi:{},
      // 表单数据
      value: {
        goods_name: '1234',
        label: [2]
      },
      // 组件参数配置
      options:{
        onSubmit:(formData, fApi)=>{
          console.log(formData);
          console.log(fApi);
        },
        resetBtn:true
      },
      // 表单生成规则
      rule:[
        {
          type:'input',
          field:'goods_name',
          title:'商品名称',
          value:'form-create'
        },
        {
          type:'checkbox',
          field:'label',
          title:'标签',
          value:[0,1,2,3],
          options: [
            {label:'好用',value:0},
            {label:'快速',value:1},
            {label:'高效',value:2},
            {label:'全能',value:3},
          ]
        }
      ]
    });
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  .form-config-container{
    padding: 20px;
    overflow: auto;
  }
</style>
