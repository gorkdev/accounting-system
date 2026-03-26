import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  modules: ["@vueuse/motion/nuxt"],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl:
        import.meta.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
      motion: {
        directives: {
          "pop-bottom": {
            initial: { scale: 0, opacity: 0, y: 100 },
            visible: { scale: 1, opacity: 1, y: 0 },
          },
        },
      },
    },
  },
});
