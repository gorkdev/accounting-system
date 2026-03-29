<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">Ozet</h1>
        <p class="mt-1 text-sm text-slate-600">
          Hos geldiniz. Sistem durumu ve kisa metrikler asagida.
        </p>
      </div>
      <button
        type="button"
        class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        @click="onLogout"
      >
        Cikis yap
      </button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="card in summaryCards"
        :key="card.title"
        class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
          {{ card.title }}
        </p>
        <p class="mt-2 text-xl font-semibold tabular-nums text-slate-900">
          {{ card.value }}
        </p>
        <p class="mt-1 text-xs text-slate-500">{{ card.hint }}</p>
      </div>
    </div>

    <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-base font-semibold text-slate-900">Sistem durumu</h2>
      <p class="mt-1 text-sm text-slate-600">
        API ve veritabani baglantisi (gelistirme kontrolu)
      </p>
      <ul class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <li class="flex justify-between gap-4">
          <span class="text-slate-600">Backend</span>
          <span class="font-medium tabular-nums text-slate-900">{{
            withEmoji(backendStatus)
          }}</span>
        </li>
        <li class="flex justify-between gap-4">
          <span class="text-slate-600">Prisma</span>
          <span class="font-medium tabular-nums text-slate-900">{{
            withEmoji(prismaStatus)
          }}</span>
        </li>
        <li class="flex justify-between gap-4">
          <span class="text-slate-600">Veritabani</span>
          <span class="font-medium tabular-nums text-slate-900">{{
            withEmoji(dbStatus)
          }}</span>
        </li>
      </ul>
      <p v-if="reason" class="mt-3 text-xs text-red-600">{{ reason }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ApiRootHealthResponse } from "@accounting/types";

definePageMeta({
  layout: "app",
  middleware: ["auth"],
});

useHead({
  title: "Ozet — Muhasebe",
});

function withEmoji(status: string) {
  if (status === "calisiyor") return "calisiyor";
  if (status === "calismiyor") return "calismiyor";
  return status;
}

const backendStatus = ref("kontrol ediliyor");
const prismaStatus = ref("kontrol ediliyor");
const dbStatus = ref("kontrol ediliyor");
const reason = ref("");

const summaryCards = [
  { title: "Aylik ciro", value: "—", hint: "Veri baglaninca" },
  { title: "Bekleyen faturalar", value: "—", hint: "Taslak / onay" },
  { title: "Cari bakiye", value: "—", hint: "Net" },
  { title: "KDV ozeti", value: "—", hint: "Donem" },
];

const { logout } = useAuth();
const router = useRouter();

function onLogout() {
  logout();
  router.replace("/giris-yap");
}

onMounted(async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch<ApiRootHealthResponse>(
      `${config.public.apiBaseUrl}/`,
    );

    backendStatus.value = response.backend ?? "bilinmiyor";
    prismaStatus.value = response.prisma ?? "bilinmiyor";
    dbStatus.value = response.db ?? "bilinmiyor";
    reason.value = response.reason ?? "";
  } catch (error) {
    backendStatus.value = "calismiyor";
    prismaStatus.value = "bilinmiyor";
    dbStatus.value = "bilinmiyor";
    reason.value = error instanceof Error ? error.message : "Bilinmeyen hata";
  }
});
</script>
