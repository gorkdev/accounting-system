<template>
  <header
    class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3"
  >
    <div class="flex flex-wrap items-center gap-2 text-xs">
      <span
        class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700"
      >
        Demo Sirket A.S.
      </span>
      <span
        class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600"
      >
        {{ currentPeriod }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="hidden rounded-md border border-transparent px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 sm:inline"
        aria-label="Bildirimler"
      >
        Bildirim
      </button>
      <LayoutAppUserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
const currentPeriod = computed(() => {
  const d = new Date();
  return `${d.getFullYear()} / Q${Math.floor(d.getMonth() / 3) + 1}`;
});
</script>
