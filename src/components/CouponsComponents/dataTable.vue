<script></script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="pl-3">
          <th scope="col" class="px-6 py-3">Código</th>
          <th scope="col" class="px-6 py-3">Fecha de vencimiento</th>
          <th scope="col" class="">País</th>
          <th scope="col" class="px-6 py-3">Estado</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="">
              <div class="text-base font-semibold text-code">Uuxj8ie5</div>
            </div>
          </th>
          <td class="px-6 py-4">6/07/2023 10:00:00</td>

          <td>El Salvador</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              Activo
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="font-medium flex">
              <span class="pr-3">
                <font-awesome-icon
                  icon="fa-solid fa-eye"
                  class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
              /></span>
              <span class="pr-3">
                <font-awesome-icon
                  icon="fa-solid fa-pencil"
                  class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
              /></span>
              <span class="pr-3">
                <font-awesome-icon
                  icon="fa-solid fa-trash"
                  class="w-4 h-4  hover:text-black transition duration-150 cursor-pointer"
              /></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
