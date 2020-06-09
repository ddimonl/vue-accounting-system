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
export default {
    props: ['value'],
    data: () => ({
        links: [
            {title: 'Счет', url: '/', exact: true},
            {title: 'История', url: '/history'},
            {title: 'Планирование', url: '/planning'},
            {title: 'Новая запись', url: '/record'},
            {title: 'Категории', url: '/categories'}
        ]
    })
}
</script>

