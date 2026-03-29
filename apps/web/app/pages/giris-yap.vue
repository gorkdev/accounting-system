<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold text-slate-900">Giris yap</h1>
      <p class="mt-1 text-sm text-slate-600">
        Hesabiniza erismek icin bilgilerinizi girin
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-1">
        <label for="email" class="block text-sm font-medium text-slate-700"
          >E-posta</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="ornek@sirket.com"
        />
      </div>
      <div class="space-y-1">
        <div class="flex items-center justify-between gap-2">
          <label for="password" class="text-sm font-medium text-slate-700"
            >Sifre</label
          >
          <a href="#" class="text-xs text-slate-600 hover:text-slate-900"
            >Unuttum</a
          >
        </div>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="********"
        />
      </div>

      <label class="flex items-center gap-2 text-sm text-slate-600">
        <input
          v-model="remember"
          type="checkbox"
          class="rounded border-slate-300 text-slate-900 focus:ring-slate-300"
        />
        Beni hatirla
      </label>

      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>

      <button
        type="submit"
        class="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        :disabled="pending"
      >
        <span v-if="pending">Giris yapiliyor...</span>
        <span v-else>Giris yap</span>
      </button>
    </form>

    <p class="text-center text-sm text-slate-600">
      Hesabiniz yok mu?
      <span class="text-slate-400">Kayit (yakinda)</span>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

useHead({
  title: "Giris — Muhasebe",
});

const email = ref("");
const password = ref("");
const remember = ref(true);
const pending = ref(false);
const errorMsg = ref("");

const { login } = useAuth();
const router = useRouter();

async function onSubmit() {
  errorMsg.value = "";
  pending.value = true;
  await new Promise((r) => setTimeout(r, 400));
  try {
    if (!email.value.includes("@")) {
      errorMsg.value = "Gecerli bir e-posta girin.";
      return;
    }
    if (password.value.length < 4) {
      errorMsg.value = "Sifre en az 4 karakter olmali.";
      return;
    }
    login();
    await router.replace("/ozet");
  } finally {
    pending.value = false;
  }
}
</script>
