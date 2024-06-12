import { UserService } from "@/services/UserService";
import { UserDocument } from "@backend/users/schemas/user.schema";
import { createGlobalState, useLocalStorage, useStorage } from "@vueuse/core";
import { computed, reactive, ref } from "vue"
import { useRouter } from "vue-router";

export const useAuth = () => {
  const router = useRouter()
  const user = useStorage<UserDocument | null>('user', null, sessionStorage, {
    serializer: {
      read: JSON.parse,
      write: JSON.stringify
    }
  });

  const setUser = (newUser: UserDocument) => {
    user.value = newUser;
  }

  const isAuthenticated = computed(() => !!user.value)
  const logout = () => {
    console.log('Logging out')
    user.value = null;
    router.push('/login')
  }
  return { user, isAuthenticated, setUser, logout }
}
