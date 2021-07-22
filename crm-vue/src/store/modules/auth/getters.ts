
import { GetterTree } from "vuex";
import { IRootState } from "@/store/register";
import { AuthGettersTypes, AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";
import { User } from "@/interfaces/User";
export const getters: GetterTree<AuthStateTypes, IRootState> &

  AuthGettersTypes = {
  getCurrentUser(state: AuthStateTypes): null | User {
    return state.user;
  },
  getToken(state: AuthStateTypes): string | null {
    return state.token;
  },
  isUserLoggedIn(state: AuthStateTypes): boolean {
    return state.isLoggedIn;
  }
};
