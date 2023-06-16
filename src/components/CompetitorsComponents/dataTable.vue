<script setup>

</script>
<template>
    <div class="mt-8">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="pl-3">
              <th scope="col" class=" px-4 py-3">Nombre</th>
              <th scope="col" class=" px-4 py-3">Biografía</th>
              <th scope="col" class="">Instagram</th>
              <th scope="col" class=" px-4 py-3">Foto de perfil</th>
              <th scope="col" class=" px-4 py-3">acción</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
            <td class="px-6 py-4">
                <div class="flex items-center text-black text-base font-semibold">
                 Carlos Alexander Duarte
                </div>
              </td>
              <td class="px-2 py-4 max-w-xs p-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto vitae placeat excepturi repellat. Velit quam, incidunt suscipit vero asperiores esse dolorem nulla, ipsam optio consequatur culpa numquam sapiente eveniet necessitatibus?</td>
             
              <td>
                cduarte@gmail.com
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Online
                </div>
              </td>
              <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit user</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>