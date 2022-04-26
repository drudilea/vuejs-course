<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input
          v-show="false"
          ref="imageSelector"
          type="file"
          accept="image/png, image/jpeg"
          @change="onSelectedImage"
        />
        <button
          v-if="this.entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />

    <div class="d-flex flex-column px-2 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>

    <Fab :icon="'fa-save'" @on:click="saveEntry" />

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import uploadImage from "../helpers/uploadImage";

import getDayMonthYear from "../helpers/getDayMonthYear";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;

      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
          picture: null,
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Wait a second please...",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.file);
      this.entry.picture = picture;

      if (this.entry.id) {
        // Update entry
        await this.updateEntry(this.entry);
      } else {
        // Create entry
        const id = await this.createEntry(this.entry);

        this.$router.push({ name: "entry", params: { id } });
      }

      this.file = null;
      this.localImage = null;

      Swal.fire("Saved!", "Your entry has been saved.", "success");
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Yes, delete it!",
      });
      if (isConfirmed) {
        new Swal({
          title: "Wait a second please...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        await this.deleteEntry(this.entry.id);

        this.$router.push({ name: "no-entry" });

        Swal.fire("Deleted!", "", "success");
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.entry.picture = null;
        this.localImage = null;
        this.file = null;
        return;
      }
      const reader = new FileReader();
      this.file = file;

      reader.onload = () => {
        this.localImage = reader.result;
      };

      reader.readAsDataURL(this.file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  font-size: 20px;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  bottom: 150px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  position: fixed;
  right: 20px;
  width: 200px;
}
</style>