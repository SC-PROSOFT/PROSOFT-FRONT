<template>
  <v-simple-table dense>
    <template>
      <thead>
        <tr>
          <th
            v-for="(item, index) of data.headers"
            :key="index"
            :style="item.width"
            class="text-left"
          >
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.desserts" :key="item.name">
          <td v-for="(dato, index) of item" :key="index">{{ format(dato) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "List",
  props: {
    data: {
      headers: Array,
      desserts: Array,
    },
  },
  data: () => ({}),

  methods: {
    format(dato) {
      return typeof dato === "object" ? Object.values(dato).join("") : dato;
    },
  },
  mounted() {
    console.log(this.data);
  },
};
</script>

<style>
</style>