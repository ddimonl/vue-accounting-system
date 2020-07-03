<template>
  <div>
    <div class="page-title">
      <h3>{{ 'createNewRecord' | localize }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{ 'NoCategories' | localize }}
      <router-link to="/categories">{{ 'createNewRecord' | localize }}</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>{{ 'ChooseCat' | localize }}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type">
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type">
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">
          {{ 'MinValue' | localize }}
          {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{ 'Label_Description' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >{{ 'Wrong_Description' | localize }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Btn_Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Title_Record')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    description: { required },
    amount: { minValue: minValue(1) }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            type: this.type,
            description: this.description,
            date: new Date().toJSON()
          })

          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        )
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

