import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "d-element";
import "d-element/dist/index.css";

createApp(App).use(ToyElement).mount("#app");
