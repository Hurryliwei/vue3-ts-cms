<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <hy-table :userList="userList" :prop-list="userPropConfig">
      <template #enable="scoped">
        {{ scoped.row.enable ? '启用' : '停用' }}
      </template>
      <template #roleId="scoped">
        <span>{{ idMapToRole(scoped.row.roleId) }}</span>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search/index'
import hyTable from '@/base-ui/table/index'

import { searchFormConfig, userPropConfig } from './config'
export default defineComponent({
  components: { PageSearch, hyTable },
  name: 'user',
  setup() {
    const store = useStore()

    store.dispatch('system/getPageListAciton', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const idMapToRole = (id: number) => {
      const roleList = [
        { id: 1, name: '超级管理员' },
        { id: 3, name: '运营' },
        { id: 4, name: '人事' }
      ]
      for (const role of roleList) {
        if (role.id === id) {
          return role.name
        }
      }
    }

    const userList = computed(() => store.state.system.userList)

    return {
      searchFormConfig,
      userPropConfig,
      idMapToRole,
      userList
    }
  }
})
</script>

<style scoped></style>
