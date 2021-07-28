import { IRootState } from "./store/register";
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $store: Store<IRootState>;
    }
}
