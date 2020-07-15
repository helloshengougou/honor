<template>
  <div>
    <el-card>
      <h1>分类列表</h1>
      <el-table :data="cateList" style="width: 100%">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push(`/cate/edit/${scope.row._id}`)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCate, removeCate } from "@/http";
export default {
  data() {
    return {
      cateList: []
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await getCate();
      // console.log(res)
      const { code, msg, data } = res;
      if (code == 200) {
        this.$message.success(msg);
        this.cateList = data;
      } else {
        this.$message.error(msg);
      }
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const { data: res } = await removeCate(row._id);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
        this.getCateList();
      });
    }
  },
  created() {
    this.getCateList();
  }
};
</script>

<style lang='scss' scoped>
</style>
