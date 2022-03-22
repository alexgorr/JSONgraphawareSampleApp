import { createApp } from 'vue'
import App from './components/App.vue'
import {createStore } from 'vuex'
import {appStore} from './interfaces';
import { PropType } from "vue";

const store = createStore<appStore>({
    state: 
    {
        JsonObj: []
    }
  });

  //to explore from console
(window as any)["vueapp"] = createApp(App).use(store).mount('#app');
//to explore from console