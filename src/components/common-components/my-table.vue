<template>
  <el-table :data="data" border>
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
<style>


</style>
<script>
    export default{
      props: ['colConfigs', 'data']
    }
</script>
