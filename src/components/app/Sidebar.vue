<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
            <router-link v-for="item in links" :key="item.title"
            tag="li"
            active-class="active"
            :to="item.url"
            :exact="item.exact">
                <a href="#" class="waves-effect waves-orange pointer">{{item.title}}</a>
            </router-link>


            <!--<li>
                <a href="#" class="waves-effect waves-orange pointer">Счет</a>
            </li>
            <li>
                <a href="#" class="waves-effect waves-orange pointer">История</a>
            </li>
            <li>
                <a href="#" class="waves-effect waves-orange pointer">Планирование</a>
            </li>
            <li>
                <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>
            </li>
            <li>
                <a href="#" class="waves-effect waves-orange pointer">Категории</a>
            </li>-->
        </ul>
</template>


<script>
import localizeFilter from '@/filters/localize.filter'

export default {
    props: ['value'],
    data: () => ({
        links: [
            {title: localizeFilter("Menu_Bill"), url: '/', exact: true},
            {title: localizeFilter("Menu_History"), url: '/history'},
            {title: localizeFilter("Menu_Planning"), url: '/planning'},
            {title: localizeFilter("Menu_NewRecord"), url: '/record'},
            {title: localizeFilter("Menu_Categories"), url: '/categories'}
        ]
    })
}
</script>

