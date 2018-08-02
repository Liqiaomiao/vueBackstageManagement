<template>
  <div>
    <el-button size="small" type="primary" class="mb15" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <zk-table
      class="mt15"
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
      <template slot="resourceUrl" slot-scope="scope">
        {{urlreset(scope)}}
      </template>
      <template slot="resourcePid" slot-scope="scope">
        {{getPname(scope)}}
      </template>
      <template slot="myac" slot-scope="scope">
        <el-button plain size="small" >编辑</el-button>
      </template>
    </zk-table>

    <!--添加-->
    <el-dialog
      title="菜单管理添加"
      :visible.sync="dialogVisible"
      width="580px"
      :append-to-body="true"
      top="25vh"
      :before-close="handleClose">
      <div style="width:65%;margin: 0 auto; ">
        <el-form  ref="form" size="small" label-width="80px" :rules="rules" :model="form" >
          <el-form-item label="菜单名称" prop="label">
            <el-input v-model="form.label" ></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="resourceUrl">
            <el-input v-model="form.resourceUrl"></el-input>
          </el-form-item>
          <el-form-item label="父级节点" prop="resourcePid">
            <el-cascader
              expand-trigger="hover"
              :options="data"
              v-model="form.resourcePid"
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="激活状态" prop="state">
            <el-select v-model="form.state" placeholder="请选择激活状态">
              <el-option label="有效" value="shanghai"></el-option>
              <el-option label="无效" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="同级顺序" prop="resourceOrderNum">
            <el-input v-model="form.resourceOrderNum"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  import {urls} from '../../apiConfig.js'
  export default {
    name: "s-menu2",
    data() {
      return {
        dialogVisible: false,
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
            prop: 'label',
            width: '500px',
          },
          {
            label: '菜单路径',
            prop: 'resourceUrl',
            minWidth: '100px',
            type: 'template',
            template: 'resourceUrl',
          },
          {
            label: '父级菜单',
            prop: 'resourcePid',
            type: 'template',
            minWidth: '100px',
            template: 'resourcePid',
          },
          {
            label: '同级顺序',
            prop: 'resourceOrderNum',
            minWidth: '100px',
          },
          {
            label: '操作',
            prop: 'myac',
            minWidth: '20px',
            type: 'template',
            template: 'myac',
            align:'center',
            headerAlign:'center'
          },
        ],
        tableheader: '',
        tablebody: '',
        form:{
          label:'',
          resourceUrl:'',
          resourcePid:[],
          state:'',
          resourceOrderNum:"",
        },

        rules:{
          label:[
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
          resourceUrl:[
            { required: true, message: '请选择激活状态', trigger: 'change' },
          ],
          resourcePid:[
            { required: true, message: '请选择激活状态', trigger: 'change' },
          ],
          state:[
            { required: true, message: '请选择激活状态', trigger: 'change' },
          ],
          resourceOrderNum:[
            { required: true, message: '请输入同级顺序', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],


        }
      }
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
        this.tablebody.style.height = windowH - headerh - $tableheader.clientHeight - 80 + 'px';
      },
      handleExpand() { //鼠标单击树形icon
        setTimeout(() => {
          this.resetWitdth()
        }, 50)

      },
      handleAdd(){
         this.dialogVisible=true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
  .zk-table{font-size: 14px;color:#606266}
</style>
