<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return {};
  },
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        console.log("error");
      } else {
        console.log("success");
      }
    },
  },
};
</script>
<template>
<section class="bg-white">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto flex-col">
        <div class="flex w-full items-center justify-center mb-7">
                <img class="h-10 " src="../assets/img/columbia-logo.png" alt="">
            </div>
        <form class="w-full max-w-md" @click.prevent="submitForm">
            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <font-awesome-icon :icon="['fas', 'envelope']" class="w-5 h-5 mx-3 text-black" />
                </span>

                <input v-model="email" type="email" class="block w-full py-3 text-gray-700 bg-white border  px-11 font-gerttsm  border-gray-600 focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Correo electrónico">
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <font-awesome-icon :icon="['fas', 'lock']" class="w-5 h-5 mx-3 text-black"/>
                </span>

                <input v-model="password" type="password" class="block w-full py-3 text-black bg-white border  px-11  border-gray-600 focus:border-blue-400 font-gerttsm  focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Contraseña">
            </div>

            <div class="mt-6">
                <button class="w-full px-6 py-3 text-white capitalize transition-colors duration-300 bg-black focus:ring-opacity-50 font-gerttb hover:bg-black">
                  Iniciar sesión
                  <font-awesome-icon :icon="['fas', 'arrow-right']" class=" hover:text-white transition duration-150"/>
                </button>
            </div>
        </form>
    </div>
</section>
</template>