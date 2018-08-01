<template>
  <zk-table
    ref="table"
    sum-text="sum"
    index-text="#"
    :data="data"
    :columns="columns"
    :stripe="props.stripe"
    :border="props.border"
    :show-header="props.showHeader"
    :show-summary="props.showSummary"
    :show-row-hover="props.showRowHover"
    :show-index="props.showIndex"
    :tree-type="props.treeType"
    :is-fold="props.isFold"
    :expand-type="props.expandType"
    :selection-type="props.selectionType">
    <template slot="resourceUrl" scope="scope">
      {{urlreset(scope)}}
    </template>
    <template slot="resourcePid" scope="scope">
      {{getPname(scope)}}
    </template>
  </zk-table>
</template>

<script>
   import axios from 'axios'
   import {urls} from '../../apiConfig.js'
   export default {
      name: "s-menu2",
      data() {
        return {
          props: {
            stripe: true ,
            border: true,
            showHeader: true,
            showSummary: false,
            showRowHover: true,
            showIndex: false,
            treeType: true,
            isFold: true,
            expandType: false,
            selectionType: false,
          },
          data:[],
          columns: [
            {
              label: '菜单管理',
              prop: 'resourceName',
              width: '500px',
            },
            {
              label: '菜单路径',
              prop: 'resourceUrl',
              minWidth: '50px',
              type: 'template',
              template: 'resourceUrl',
            },
            {
              label: '父级菜单',
              prop: 'resourcePid',
              type: 'template',
              template: 'resourcePid',
            },
            {
              label: '同级顺序',
              prop: 'resourceOrderNum',
            },
            {
              label: '操作',
              prop: 'likes',
              minWidth: '200px',
              type: 'template',
              template: 'likes',
            },
          ],
        };
      },
      computed: {
        propList() {
          return Object.keys(this.props).map(item => ({
            name: item,
          }));
        },
      },
      methods:{
        urlreset(scope){
          let result =scope.row.resourceUrl;
          if(result=='[Null]'||result=='-'){
            result ='';
          }
          return result
        },
        getPname(scope){
          console.log(scope);
           return scope.row.resourceName
        }
      },
      mounted (){
         axios({
           url:urls.getmenu
         }).then((res)=>{
             let menudata=res.data.obj;
             this.data =menudata;
         })
      }
    }
</script>

<style scoped>

</style>
