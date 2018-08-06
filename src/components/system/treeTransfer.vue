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
        :props="defaultProps"
        @check-change="handleCheckChange"
      >
      </el-tree>
    </div>
    <div class="btns_container">
      <el-button icon="el-icon-arrow-right" circle @click="handleChecked1"></el-button>
      <el-button icon="el-icon-arrow-left"  circle></el-button>
    </div>
    <div class="right">
      <el-tree
        :data="dataright"
        default-expand-all
        node-key="id"
        :props="defaultProps">
      </el-tree>
    </div>
  </div>


</template>

<script>
  import {transfer} from "../../data/transfer";

  export default {
    name: "treeTransfer",
    data() {
      return {
        data2: transfer.data2,
        dataright: [],
        datachecked:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch:{

    },
    methods:{
      handleCheckChange(a,b,c){

      },
      handleChecked1(){
        let checkedNodes=this.$refs.tree.getCheckedNodes();
        let halfCheckedNodes=this.$refs.tree.getHalfCheckedNodes();
        if(checkedNodes.length>0){
          function matchtree(arr) {
            var result =[];
            arr.forEach((item,index)=>{
              if(!item.children){
                if(checkedNodes.includes(item)){//找到匹配节点
                  result.push({
                    id:item.id,
                    label:item.label
                  });
                }
              }
              else{
                let  obj={
                  id: item.id,
                  label: item.label,
                  children: matchtree(item.children)
                }
                if(obj.children.length>0){
                  result.push(obj);
                }
              }

            });

            return result
          }

          let result = matchtree(transfer.data2)

          this.dataright=result
        }else{
         this.dataright=[];
          this.$message({
            showClose: true,
            message: '请先选择需要分配的项',
            type: 'warning'
          });
        }


      }

    } ,
     updated(){

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
