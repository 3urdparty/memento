<template>
  <div
    class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm space-y-10">
      <div>
        <div class="flex items-center justify-center">
          <Logo class="w-10 h-10 text-green-400" />
        </div>
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-slate-400"
        >
          Sign in to your account
        </h2>
      </div>
      <div class="space-y-6">
        <div class="relative space-y-3 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-md" />
          <div>
            <label for="email-address" class="sr-only">Email address</label>

            <FloatLabel>
              <InputText
                autocomplete="email"
                required
                v-model="form.username"
                class="w-full focus:z-10 relative"
              />
              <label for="username">Email</label>
            </FloatLabel>
          </div>
          <div>
            <FloatLabel>
              <Password
                v-model="form.password"
                toggleMask
                required
                :feedback="false"
                class="w-full"
              />
              <label for="password">Password</label>
            </FloatLabel>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Checkbox
              :binary="true"
              class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
              v-model="form.checked"
            />
            <label
              for="remember-me"
              class="ml-3 block text-sm leading-6 text-slate-200"
              >Remember me</label
            >
          </div>

          <div class="text-sm leading-6">
            <a
              href="#"
              class="font-semibold text-green-400/90 hover:text-green-500"
              >Forgot password?</a
            >
          </div>
        </div>

        <div>
          <Button
            @click="authenticate"
            class="w-full bg-green-400 border-green-600 hover:bg-green-300 text-center flex items-center justify-center text-md text-green-700"
          >
            Sign in
          </Button>
        </div>
      </div>

      <p class="text-center text-sm leading-6 text-gray-400">
        Not a member?
        {{ ' ' }}
        <a
          href="#"
          class="font-semibold text-green-500 hover:text-green-300 transition"
          >Sign up today</a
        >
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import Checkbox from 'primevue/checkbox';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Logo from '@/assets/Logo.svg?component';
import { reactive } from 'vue';
import { AuthService } from '@/services/AuthService';
import { useAuth } from '@/composables/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
const form = reactive({
  username: 'mustafa.y.elagib@gmail.com',
  password: 'Password123+',
  checked: false,
});
const { setUser, user } = useAuth();
const router = useRouter();
const toast = useToast();
const authenticate = () => {
  AuthService.login(form)
    .then((response) => {
      console.log(response.data.user);
      setUser(response.data.user);
      router.push('/');
      toast.add({
        severity: 'success',
        summary: 'Login Success',
        detail: 'Welcome back, ' + response.data.user.name,
        life: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.add({
        severity: 'error',
        summary: 'Login Error',
        detail: 'Invalid credentials',
        life: 3000,
      });
    });
};
</script>
