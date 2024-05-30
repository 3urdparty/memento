<template>
  <div
    class="bg-green-400/70 rounded-lg pb-1.5 text-white w-full shadow-lg shadow-slate-900/90 p-0"
  >
    <div
      class="bg-slate-800 rounded-lg text-white/80 p-0 divide-y divide-gray-200 overflow-hidden"
    >
      <div class="px-4 py-5 sm:px-6" v-if="$slots['header']">
        <slot name="header" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
