<template>
    <div>
      <template v-for="list in this.menuList" >
        <!--循环父级-->
        <el-submenu index="1" v-if="list.children" :key="list.value" :index="list.label"  >
          <!--父级html-->
          <template slot="title"  style="padding-left:10px" >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ list.label}}</span>
          </template>
          <!--递归的子集hmlt-->
          <Menu :menuList="list.children"></Menu>
        </el-submenu>
        <!--循环子集-->
        <el-menu-item v-else :index="list.label"  :key="list.value" style="padding-left: 50px;" >
          <span>{{list.label}}</span>
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
