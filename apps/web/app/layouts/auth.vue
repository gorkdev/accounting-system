<template>
  <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center space-y-1">
        <NuxtLink
          to="/"
          class="text-lg font-semibold text-slate-900 hover:text-slate-700"
        >
          Muhasebe
        </NuxtLink>
        <p class="text-sm text-slate-600">Islemlerinizi guvenle yonetin</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <slot />
      </div>

      <p class="text-center text-xs text-slate-500">
        &copy; {{ year }} Muhasebe. Tum haklari saklidir.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
