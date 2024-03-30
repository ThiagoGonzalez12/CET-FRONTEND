import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import VueAwesomePaginate from "vue-awesome-paginate";

import App from "./App.vue";
import router from "./router";
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
app.use(VueAwesomePaginate);

app.mount("#app");
