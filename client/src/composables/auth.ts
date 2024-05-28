import { UserService } from "@/services/UserService";
import { computed, reactive, ref } from "vue"

export const useAuth = () => {

  const user = ref(null);


  const isAuthenticated = computed(() => !!user)
  return { user, isAuthenticated }
}
