<template>
  <component
    :is="isLink ? NuxtLink : 'button'"
    :type="isLink ? undefined : type"
    :to="isLink ? to : undefined"
    :class="buttonClass"
    :disabled="!isLink && (disabled || loading)"
    v-bind="forwardedAttrs"
  >
    <slot name="left-icon" />
    <span v-if="loading" class="animate-spin">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <slot />
    <slot name="right-icon" />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, resolveComponent } from "vue";

defineOptions({ inheritAttrs: false });

type ColorVariant = "primary" | "secondary" | "danger" | "warning" | "success";
type StyleVariant = "solid" | "outline" | "ghost";

const props = withDefaults(
  defineProps<{
    variant?: StyleVariant;
    color?: ColorVariant;
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    type?: "button" | "submit" | "reset";
    to?: string;
  }>(),
  {
    variant: "solid",
    color: "primary",
    size: "md",
    loading: false,
    disabled: false,
    block: false,
    type: "button",
    to: undefined,
  },
);

const attrs = useAttrs();

const NuxtLink = resolveComponent("NuxtLink");

const isLink = computed(() => !!props.to);

type ColorConfig = {
  solid: string;
  outline: string;
  ghost: string;
  focus: string;
};

const colorConfigs: Record<ColorVariant, ColorConfig> = {
  primary: {
    solid:
      "bg-emerald-600 text-white shadow-md shadow-emerald-900/30 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-emerald-300 disabled:text-white/50 disabled:shadow-none",
    outline:
      "border-2 border-emerald-500/80 text-emerald-400 hover:bg-emerald-500/10 disabled:border-emerald-300/50 disabled:text-emerald-300/50",
    ghost:
      "text-emerald-400/90 hover:bg-emerald-500/10 disabled:text-emerald-300/50",
    focus: "focus-visible:outline-emerald-400",
  },
  secondary: {
    solid:
      "bg-slate-700 text-white shadow-md shadow-slate-900/30 hover:bg-slate-600 active:bg-slate-800 disabled:bg-slate-400 disabled:text-white/50 disabled:shadow-none",
    outline:
      "border-2 border-slate-500/80 text-slate-400 hover:bg-slate-500/10 disabled:border-slate-300/50 disabled:text-slate-300/50",
    ghost:
      "text-slate-400/90 hover:bg-slate-500/10 disabled:text-slate-300/50",
    focus: "focus-visible:outline-slate-400",
  },
  danger: {
    solid:
      "bg-red-600 text-white shadow-md shadow-red-900/30 hover:bg-red-500 active:bg-red-700 disabled:bg-red-400 disabled:text-white/50 disabled:shadow-none",
    outline:
      "border-2 border-red-500/80 text-red-400 hover:bg-red-500/10 disabled:border-red-300/50 disabled:text-red-300/50",
    ghost: "text-red-400/90 hover:bg-red-500/10 disabled:text-red-300/50",
    focus: "focus-visible:outline-red-400",
  },
  warning: {
    solid:
      "bg-amber-500 text-white shadow-md shadow-amber-900/30 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-400 disabled:text-white/50 disabled:shadow-none",
    outline:
      "border-2 border-amber-500/80 text-amber-400 hover:bg-amber-500/10 disabled:border-amber-300/50 disabled:text-amber-300/50",
    ghost:
      "text-amber-400/90 hover:bg-amber-500/10 disabled:text-amber-300/50",
    focus: "focus-visible:outline-amber-400",
  },
  success: {
    solid:
      "bg-green-600 text-white shadow-md shadow-green-900/30 hover:bg-green-500 active:bg-green-700 disabled:bg-green-400 disabled:text-white/50 disabled:shadow-none",
    outline:
      "border-2 border-green-500/80 text-green-400 hover:bg-green-500/10 disabled:border-green-300/50 disabled:text-green-300/50",
    ghost:
      "text-green-400/90 hover:bg-green-500/10 disabled:text-green-300/50",
    focus: "focus-visible:outline-green-400",
  },
};

const variantClass = computed(() => colorConfigs[props.color][props.variant]);

const focusClass = computed(() => colorConfigs[props.color].focus);

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "rounded-lg px-3 py-1.5 text-sm";
    case "lg":
      return "rounded-xl px-6 py-3 text-base";
    default:
      return "rounded-lg px-4 py-2 text-sm font-medium";
  }
});

const blockClass = computed(() => (props.block ? "w-full" : ""));

const baseClass =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const buttonClass = computed(() => {
  const extra = attrs.class;
  return [
    baseClass,
    variantClass.value,
    sizeClass.value,
    focusClass.value,
    blockClass,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
});

const forwardedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs;
  return rest;
});
</script>
