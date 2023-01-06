<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";
const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const switchVariant = async (variant) => {
  let variantIds = [];
  let desiredVariantId = variant.id;
  let otherVariantIds = props.data.product.options
    .filter((item) => item.groupId !== variant.groupId)
    .map((item) => item.id);
  variantIds.push(desiredVariantId);
  variantIds.push(...otherVariantIds);
  const { data: productId, error } = await useAsyncData("selectedVariant", () =>
    $fetch("/api/search-variant", {
      body: {
        ids: variantIds,
        parentId: props.data.product?.parentId || props.data.product.id,
      },
      method: "POST",
    })
  );
  if (!error.value) {
    router.push(`/product/${productId.value}`);
  } else {
    console.log(error.value);
  }
};
</script>

<template>
  <div v-if="data?.configurator?.length > 0" class="mt-6">
    <div class="mb-2.5 border-b pb-2.5 flex justify-between items-center">
      <h2 class="text-xs uppercase tracking-widest">Configurator</h2>
    </div>
    <div class="space-y-6">
      <template
        v-for="configurator in data.configurator"
        :key="configurator.id"
      >
        <div v-if="configurator.displayType === 'color'">
          <h3 class="text-xs uppercase tracking-widest mb-2.5">
            {{ configurator.translated.name }}
          </h3>
          <div class="w-[260px] gap-2 flex flex-wrap">
            <div
              v-for="option in configurator.options"
              :key="option.id"
              class="w-5 h-5 rounded-full border relative group cursor-pointer flex items-center justify-center"
              @click="switchVariant(option)"
              :class="{
                'border-2 border-black':
                  data.product.options.findIndex(
                    (item) => item.id === option.id
                  ) !== -1,
              }"
              :style="{ backgroundColor: option.colorHexCode }"
            >
              <CheckIcon
                class="w-2.5"
                v-if="
                  data.product.options.findIndex(
                    (item) => item.id === option.id
                  ) !== -1
                "
              />
              <span
                class="absolute top-full left-0 mt-1 bg-black text-xs text-white px-2 py-1 hidden group-hover:block z-20 whitespace-nowrap"
                >{{ option.translated.name }}</span
              >
            </div>
          </div>
        </div>
        <div v-else>
          <h3 class="text-xs uppercase tracking-widest mb-2.5">
            {{ configurator.translated.name }}
          </h3>
          <div class="grid grid-cols-2 max-w-sm gap-2.5">
            <div
              v-for="option in configurator.options"
              :key="option.id"
              class="border px-4 py-2 cursor-pointer hover:bg-gray-100 hover:shadow-sm text-sm"
              @click="switchVariant(option)"
              :class="{
                'border-2 border-black':
                  data.product.options.findIndex(
                    (item) => item.id === option.id
                  ) !== -1,
              }"
            >
              {{ option.translated.name }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
