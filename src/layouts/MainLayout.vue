<template>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">
        <navbar @openSB="isOpen = !isOpen" />
        <sidebar v-model="isOpen" :key="locale" />

        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <router-view></router-view>
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>

</template>


<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
    data: () => ({
        isOpen: true,
        loading: true
    }),
    components: {
        Navbar, Sidebar
    },
    async mounted() {
        if(!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo');
        }


        this.loading = false;
    },
    created() {
        this.$store.watch(
            state => this.$store.getters.info,
            (newValue, oldValue)=>{
                //something changed do something
                console.log(oldValue)
                console.log(newValue)
            },
            //Optional Deep if you need it
            { deep:true}
        )
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        locale() {
            return this.$store.getters.info.locale
        }        
    },
    watch: {
        error(fbError) {
            console.log(fbError);
            this.$error(messages[fbError.code] || "Что-то пошло не так");
        },
        //locale()
    }

}
</script>