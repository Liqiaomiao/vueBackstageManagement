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
    :selection-type="props.selectionType"
    @tree-icon-click="handleExpand"
  >
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
          stripe: true,
          border: true,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: false,
          'max-height': '500px'
        },
        data: [],
        parents: [],
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
        tableheader: '',
        tablebody: ''
      };
    },
    computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
    },
    methods: {
      urlreset(scope) {
        let result = scope.row.resourceUrl;
        if (result == '[Null]' || result == '-') {
          result = '';
        }
        return result
      },
      getPname(scope) {
        var index = this.parents.indexOf(scope.row.resourcePid)
        if (scope.row.resourcePid) {
          return this.parents[index - 1]
        }

      },
      resetWitdth() {//重置表格宽度
        let $tablebody = this.tablebody;
        let $tableheader = this.tableheader;
        if ($tablebody.clientWidth != $tableheader.clientWidth) {
          $tableheader.style.width = $tablebody.clientWidth + 'px'
        }
      },
      resetHeight() {//设置表格高度
        let windowH = document.body.clientHeight || document.documentElement.clientHeight;
        let headerh = parseInt(document.querySelector('.el-header').clientHeight);
        let $tableheader = this.tableheader;
        this.tablebody.style.height = windowH - headerh - $tableheader.clientHeight - 40 + 'px';
      },
      handleExpand() {
        setTimeout(() => {
          this.resetWitdth()
        }, 50)

      }
    },
    mounted() {
      axios({
        url: urls.getmenu
      }).then(async (res) => {
        let menudata = res.data.obj;
        this.data = menudata;

        function flat(arr) {
          let result = [];
          arr.forEach((item) => {
            result.push(item.resourceName, item.resourceId)
          });
          return result
        }

        let last = flat(menudata);
        this.parents = last;
        await  setTimeout(() => { //表头宽度调整
          this.resetWitdth()
        }, 10)
      });
      let $table = this.$refs.table.$el;
      let tableheader = $table.querySelector('.zk-table__header-wrapper');//获取表头div
      let tablebox = $table.querySelector('.zk-table__body-wrapper'); //获取表格主体div
      this.tableheader = tableheader;
      this.tablebody = tablebox;
      this.resetHeight();
      window.onresize = () => {
        this.resetHeight()
        this.resetWitdth()
      }


    }

  }

</script>

<style scoped>

</style>
