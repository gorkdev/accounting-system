<template>
  <div class="flex min-h-screen flex-col bg-slate-50 md:flex-row">
    <LayoutAppSidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <LayoutAppTopBar />
      <main class="flex-1 overflow-auto p-4 md:p-6">
        <div class="mx-auto max-w-6xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
