import { AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";
let token = localStorage.getItem("token");
export const state: AuthStateTypes = {
    token: token,
    isLoading: false,
    isLoggedIn: token != null
};
