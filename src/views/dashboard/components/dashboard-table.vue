<template>
  <el-table v-loading="loading" :data="tableData" class="table-contianer">
    <el-table-column prop="order_no" label="Order_No" min-width="200" />
    <el-table-column label="Price" width="180" align="center">
      <template #default="scope">
        ¥{{toThousandFilter(scope.row.price)}}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="scope">
        <el-tag
          :type="scope.row.status === 'success' ? 'success' : 'danger'"
          disable-transitions
        >
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { transactionList } from '@/api/remote-search.js'

const tableData = ref(null)
const loading = ref(true)
transactionList().then(({ data }) => {
  tableData.value = data.items.slice(0, 8)
  loading.value = false
}).catch(console.log)
</script>

<style lang="less" scoped>
.table-contianer {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 30px;
}
</style>
