<template>
  <div class="treeTransfer">
    <div class="left">
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>
    <div class="btns_container">
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
    </div>
    <div class="right"></div>
  </div>


</template>

<script>
  import {transfer} from "../../data/transfer";

  export default {
    name: "treeTransfer",
    data() {
      return {
        data2: transfer.data2,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .treeTransfer {
    display: flex;
    & > .left,
    & > .right {
      width: 300px;
      border: 1px solid #eee;
      border-radius: 3px;
      min-height: 500px;
    }
    & > .btns_container {
      display: flex;
      flex-direction:column;
      justify-content: center;
      margin: 0 10px;
      &>.el-button{
        width: 46px;
        height: 46px;
        margin-bottom: 20px;
        margin-left: 0 ;
      }
    }

  }
</style>
