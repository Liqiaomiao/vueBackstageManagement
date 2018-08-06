<template>
  <el-table :data="data" border class="wi100" >
    <template v-for="colConfig in colConfigs" >
      <slot :name="colConfig.slot" v-if="colConfig.slot" ></slot>
      <el-table-column v-else
                       :align="colConfig.align"
                       :prop="colConfig.prop"
                       :label="colConfig.label"
                       :key="colConfig.prop"
                       :formatter="colConfig.fmt">
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
    export default{
      props: ['colConfigs', 'data']
    }
</script>
<style lang="less">
  .wi100{
    width: 100%;
    .el-table__header,
    .el-table__body{
        width: 100%!important;
     }
  }

</style>
