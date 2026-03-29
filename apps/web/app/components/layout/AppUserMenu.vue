<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-left text-sm shadow-sm hover:border-slate-300"
      :aria-expanded="open"
      @click.stop="open = !open"
    >
      <span
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs font-medium text-white"
      >
        GK
      </span>
      <span class="hidden sm:block">
        <span class="block font-medium text-slate-900">Gorkem</span>
        <span class="block text-xs text-slate-500">Yonetici</span>
      </span>
    </button>

    <div
      v-show="open"
      class="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-md"
      role="menu"
    >
      <button
        type="button"
        class="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
        role="menuitem"
      >
        Profil
      </button>
      <button
        type="button"
        class="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
        role="menuitem"
      >
        Hesap ayarlari
      </button>
      <hr class="my-1 border-slate-100" />
      <button
        type="button"
        class="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
        role="menuitem"
        @click="onLogout"
      >
        Cikis yap
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false);
const root = ref<HTMLElement | null>(null);
const { logout } = useAuth();
const router = useRouter();

function onLogout() {
  open.value = false;
  logout();
  router.push("/giris-yap");
}

function onDocClick(e: MouseEvent) {
  const el = root.value;
  if (!el || !open.value) return;
  if (!(e.target instanceof Node) || !el.contains(e.target)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
});
onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
});
</script>
