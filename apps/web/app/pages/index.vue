<template>
  <div aria-hidden="true" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { isLoggedIn } = useAuth();

await navigateTo(isLoggedIn.value ? "/ozet" : "/giris-yap", { replace: true });
</script>
