<template>
  <div>
    <el-card>
      <h1>{{id ? '编辑' : '新建'}}分类</h1>
      <el-form label-width="100px">
        <el-form-item>
          <el-select v-model="model.parent" filterable placeholder="请选择父级分类">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="model.name" @keyup.enter.native="save"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createCate, getCateInfo, editCate, getCate } from "@/http";
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {
        name: "",
        parent: ""
      },
      options: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await editCate({ id: this.id, name: this.model.name});
      } else {
        res = await createCate(this.model);
      }
      res = res.data;
      if (res.code == 200) {
        this.$message.success(res.msg);
        setTimeout(() => {
          this.$router.push({ name: "List" });
        }, 3000);
      } else {
        this.$message.error(res.msg);
      }
    },
    async getCate() {
      const { data: res } = await getCateInfo(this.id);
      const { code, data, msg } = res;
      if (code == 200) {
        const { name } = data;
        this.model.name = name;
      } else {
        this.$message.error(msg);
      }
    },
    async getOptionList() {
      const { data:res } = await getCate();
      if (res.code == 200) {
        this.options = res.data.filter(item => item.parent == undefined);
      } else {
        this.$message.error('获取父级分类失败,请重试')
      }
    }
  },
  created() {
    this.id && this.getCate();
    this.getOptionList();
  }
};
</script>

<style lang='scss' scoped>
h1 {
  text-align: center;
}
.el-form-item:last-of-type {
  display: flex;
  justify-content: flex-end;
}
</style>
