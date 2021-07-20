import { AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";

export const state: AuthStateTypes = {
    user: null,
    token: localStorage.getItem("token"),
    isLoading: false,
    isLoggedIn: false
};
