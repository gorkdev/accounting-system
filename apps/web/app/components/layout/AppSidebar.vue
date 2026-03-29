<template>
  <aside
    class="relative z-10 flex w-full shrink-0 flex-col border-b border-slate-200 bg-white md:w-56 md:shrink-0 md:self-stretch md:border-b-0 md:border-r md:overflow-y-auto md:min-h-screen"
  >
    <div class="border-b border-slate-100 p-4">
      <p class="text-sm font-semibold text-slate-900">Muhasebe</p>
      <p class="text-xs text-slate-500">Yonetim paneli</p>
    </div>

    <nav class="space-y-6 p-3">
      <div v-for="group in navGroups" :key="group.label">
        <p class="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {{ group.label }}
        </p>
        <ul class="space-y-0.5">
          <li v-for="item in group.items" :key="`${group.label}-${item.label}`">
            <NuxtLink
              v-if="!item.disabled"
              :to="item.to"
              class="block rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
              active-class="bg-slate-100 font-medium text-slate-900"
            >
              {{ item.label }}
            </NuxtLink>
            <span
              v-else
              class="block cursor-not-allowed rounded-md px-2 py-2 text-sm text-slate-400"
              title="Yakinda"
            >
              {{ item.label }}
              <span class="text-[10px] text-slate-400">(soon)</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>

    <div class="border-t border-slate-100 p-3">
      <p class="px-2 text-[11px] text-slate-400">Yardim</p>
      <a
        href="#"
        class="mt-1 block rounded-md px-2 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        Dokumantasyon
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navGroups = [
  {
    label: "Genel",
    items: [{ to: "/ozet", label: "Ozet", disabled: false }],
  },
  {
    label: "Muhasebe",
    items: [
      { to: "#", label: "Islemler", disabled: true },
      { to: "#", label: "Faturalar", disabled: true },
      { to: "#", label: "Raporlar", disabled: true },
    ],
  },
  {
    label: "Sistem",
    items: [{ to: "#", label: "Ayarlar", disabled: true }],
  },
];
</script>
