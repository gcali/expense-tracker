import { Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { State } from '@/vuex/store';

export abstract class StoreVue extends Vue {
    public $store!: Store<State>;
}
