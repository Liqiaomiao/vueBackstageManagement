<template>
    <div>
      <template v-for="list in this.menuList" >
        <!--循环父级-->
        <el-submenu index="1" v-if="list.children.length>0" :key="list.resourceId" :index="list.resourceName"  >
          <!--父级html-->
          <template slot="title"  style="padding-left:10px" >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ list.resourceName}}</span>
          </template>
          <!--递归的子集hmlt-->
          <Menu :menuList="list.children"></Menu>
        </el-submenu>
        <!--循环子集-->
        <el-menu-item v-else :index="list.resourceName"  :key="list.resourceId" style="padding-left: 50px;" >
          <span>{{list.resourceName}}</span>
        </el-menu-item>
      </template>
    </div>
</template>
<style>
  .el-menu--collapse  span,
  .el-menu--collapse  i.el-submenu__icon-arrow
  {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
<script>
    export default{
        name:'Menu',
        data(){
            return {

            }
        },
        methods:{

        },
        updated(){

        },
        watch:{

        },
        props:['menuList']

    }
</script>
