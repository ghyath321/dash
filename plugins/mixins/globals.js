import Vue from 'vue'
import { mapGetters } from 'vuex'

const VARS = {
    install (Vue, Options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    URL: 'url',
                    CATEGORIES: 'categories',
                    CITIES:'cities',
                    FEATURES:'features'
                })
            }
        })
    }
}

Vue.use(VARS);