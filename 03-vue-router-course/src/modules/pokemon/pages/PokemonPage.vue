<template>
  <h1>
    Pokemon: <span>#{{ id }}</span>
  </h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <h2>{{ pokemon.name }}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // id: this.$route.params.id,
      pokemon: null,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.id}`
        );
        const pokemon = await response.json();
        this.pokemon = pokemon;
      } catch (error) {
        this.$router.push('/');
        console.log('Nothing to do here');
      }
    },
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
};
</script>
