<template>
  <div
    class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <form class="space-y-6" action="#" method="POST">
        <div class="relative -space-y-px rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300"
          />
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <InputText
              autocomplete="email"
              required
              class="w-full rounded-b-none focus:z-10 relative"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <FloatLabel>
              <Password
                v-model="form.password"
                toggleMask
                class="w-full border-t-none"
              />
              <label for="username">Password</label>
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
              class="font-semibold text-green-600 hover:text-green-500"
              >Forgot password?</a
            >
          </div>
        </div>

        <div>
          <Button
            type="submit"
            class="w-full bg-green-400 border-green-600 hover:bg-green-300 text-center flex items-center justify-center text-md text-green-700"
          >
            Sign in
          </Button>
        </div>
      </form>

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
import { reactive } from 'vue';
const form = reactive({
  email: '',
  password: '',
  checked: false,
});
</script>
