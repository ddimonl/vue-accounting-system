<template>
  <table class="history-table">
    <!--debug: sort={{currentSort}}, dir={{currentSortDir}}-->
    <thead>
      <tr>
        <th>#</th>
        <th @click="sort('amount')">{{ 'Amount' | localize }}</th>
        <th @click="sort('date')">{{ 'Date' | localize }}</th>
        <th @click="sort('categoryName')">{{ 'Category' | localize }}</th>
        <th @click="sort('type')">{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
        <th>{{ 'Delete' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in sortedRecords" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Title_Record'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
        <td>
          <button
            v-tooltip="'Delete'"
            class="btn-small btn"
            @click="deleteRecord(record)"
          >
            <i class="material-icons">delete</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'history-table',
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    //recordsLoc: [],
    currentSort: 'date',
    currentSortDir: 'asc'
  }),
  methods: {
    sort(sortParam) {
      if(sortParam === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortParam
    },
    async deleteRecord(record) {
      try {    
        await this.$store.dispatch('deleteRecordById', record.id)
        this.$emit('deleted', record.id)
        this.$message('Запись успешно удалена')
        const bill =
            record.type === 'income'
              ? this.$store.getters.info.bill - record.amount
              : this.$store.getters.info.bill + record.amount

        await this.$store.dispatch('updateInfo', { bill })
      } catch (e) {}
    }
  },
  computed: {
    sortedRecords() {
      return this.records.sort((a,b) => {
      let modifier = 1
      if(this.currentSortDir === 'desc') modifier = -1
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
      return 0;
    });
    }
  },
  mounted() {
    //this.recordsLoc = this.records
  }
}
</script>

<style>
  .history-table th {
    cursor: pointer;
  }
</style>


