<script setup >
import { VueFinalModal } from 'vue-final-modal'
import { defineProps, defineEmits } from 'vue'

defineProps({
  title: String
  
})

const emit = defineEmits(['confirm']);
  </script>
  <template>
    <VueFinalModal
      class="coupon-modal "
      content-class="coupon-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :click-to-close="false"
    >
    <div class="flex justify-end">
      <button @click="emit('confirm')">
        <font-awesome-icon :icon="['fas', 'xmark']"  class="h-8"/>
      </button>
    </div>
      <h1>{{ title }}</h1>
      <ModalTitle />
    </VueFinalModal>
  </template>
  <style>
  .coupon-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .coupon-modal-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
    width: 90%;
    padding: 30px;
  }
  .coupon-modal-content > * + *{
    margin: 0.5rem 0;
  }
  .coupon-modal-content h1 {
    font-size: 1.375rem;
  }
 
  .dark .coupon-modal-content {
    background: #000;
  }
  </style>