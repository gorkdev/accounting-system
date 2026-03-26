<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl flex items-center gap-2 font-bold mb-4" v-motion-roll-top>System Status
      <CakeIcon class="h-7 w-7 text-emerald-400" />
    </h1>
    <p v-motion-pop-bottom>frontend: {{ withEmoji("calisiyor") }}</p>
    <p v-motion-roll-bottom>backend: {{ withEmoji(backendStatus) }}</p>
    <p v-motion-roll-left>prisma: {{ withEmoji(prismaStatus) }}</p>
    <p v-motion-roll-right>db: {{ withEmoji(dbStatus) }}</p>
    <p v-if="reason">reason: {{ reason }}</p>

  </div>
</template>

<script setup lang="ts">
import { CakeIcon } from '@heroicons/vue/24/solid';

function withEmoji(status: string) {
  if (status === "calisiyor") return "calisiyor ✅";
  if (status === "calismiyor") return "calismiyor ❌";
  return status;
}

const backendStatus = ref("kontrol ediliyor");
const prismaStatus = ref("kontrol ediliyor");
const dbStatus = ref("kontrol ediliyor");
const reason = ref("");

onMounted(async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch<{
      backend: string;
      prisma?: string;
      db?: string;
      reason?: string;
    }>(`${config.public.apiBaseUrl}/`);

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
