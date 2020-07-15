import Vue from 'vue'
const axios = Vue.axios
export const createCate = (obj) => axios.post('cate',obj)
export const getCate = () => axios.get('cate')
export const getCateInfo = id => axios.get(`cate/${id}`)
export const editCate = obj => axios.put(`cate/${obj.id}`,{name:obj.name})
export const removeCate = id => axios.delete(`cate/${id}`)