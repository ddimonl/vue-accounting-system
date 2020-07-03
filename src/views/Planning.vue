<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">{{ 'createNewRecord' | localize }}</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{ 'Of' | localize }} {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <!-- <transition name="bounce"> -->
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
         <!--  </transition> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Title_Planning')
    }
  },
  data: () => ({
    categories: [],
    loading: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на' : 'Осталось'
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>


<style>
@-webkit-keyframes progress-bar {
   0% { width: 0; }
}
@-moz-keyframes progress-bar {
   0% { width: 0; }
}
@keyframes progress-bar {
   0% { width: 0; }
}

.progress > div { 
  -webkit-animation: progress-bar 1.6s;
  -moz-animation: progress-bar 1.6s;
  animation: progress-bar 1.6s;
}
</style>
