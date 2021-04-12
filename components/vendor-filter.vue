<template>
  <div class="vendor-filter">
    <div class="vendor-filter__header">
      <div class="vendor-filter__title">
        Фильтр:
        <span
          :class="['vendor-filter__name', filter.localeCompare('byAlbum') ? '' : 'active']"
          @click="$emit('toggleFilter', 'byAlbum')"
        >По альбомам</span>
        <span
          :class="['vendor-filter__name', filter.localeCompare('byFavorite') ? '' : 'active']"
          @click="$emit('toggleFilter', 'byFavorite')"
        >Избранное</span>
      </div>
    </div>
    <div class="vendor-filter__scroll-wrap">
      <div class="vendor-filter__scroll">
        <div v-if="!filter.localeCompare('byTitle')" class="by-title vendor-filter__list">
          <div
            v-for="(group, idx) in titles"
            :key="idx"
            class="vendor-filter__item"
          >
            <div class="vendor-filter__item-name">{{ group.character }}</div>
            <div class="vendor-filter__item-content">
              <div
                v-for="photo in group.photos"
                :key="photo.id"
                class="vendor-filter__photo"
              >
                <img
                  class="vendor-filter__photo-icon"
                  :src="photo.icon"
                  :alt="photo.title"
                />
                <div class="vendor-filter__photo-name">{{ photo.title }}</div>
                <!--suppress NpmUsedModulesInstalled -->
                <img
                  class="vendor-filter__photo-favorite-icon"
                  :src="photo.isFavorite ? require('@/static/img/fav_filled.png') : require('@/static/img/fav_empty.png')"
                  alt="Favorite"
                  @click="$emit('toggleFavorite', photo.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="!filter.localeCompare('byAlbum')" class="by-album vendor-filter__list">
          <div
            v-for="(album, idx) in albums"
            :key="idx"
            class="vendor-filter__item"
          >
            <div class="vendor-filter__item-name">{{ album.albumName }}</div>
            <div class="vendor-filter__item-content">
              <div
                v-for="photo in album.photos"
                :key="photo.id"
                class="vendor-filter__photo"
              >
                <img
                  class="vendor-filter__photo-icon"
                  :src="photo.icon"
                  :alt="photo.title"
                />
                <div class="vendor-filter__photo-name">{{ photo.title }}</div>
                <!--suppress NpmUsedModulesInstalled -->
                <img
                  class="vendor-filter__photo-favorite-icon"
                  :src="photo.isFavorite ? require('@/static/img/fav_filled.png') : require('@/static/img/fav_empty.png')"
                  alt="Favorite"
                  @click="$emit('toggleFavorite', photo.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="!filter.localeCompare('byFavorite')" class="by-favorite vendor-filter__list">
          <div
            v-for="(group, idx) in favorites"
            :key="idx"
            class="vendor-filter__item"
          >
            <div class="vendor-filter__item-name">{{ group.character }}</div>
            <div class="vendor-filter__item-content">
              <div
                v-for="photo in group.photos"
                :key="photo.id"
                class="vendor-filter__photo"
              >
                <img
                  class="vendor-filter__photo-icon"
                  :src="photo.icon"
                  :alt="photo.title"
                />
                <div class="vendor-filter__photo-name">{{ photo.title }}</div>
                <!--suppress HtmlUnknownTarget -->
                <img
                  class="vendor-filter__photo-favorite-icon"
                  src="@/static/img/cross.png"
                  alt="Favorite"
                  @click="$emit('toggleFavorite', photo.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: { type: Array, required: true },
    albums: { type: Array, required: true },
    favorites: { type: Array, required: true },
    filter: { type: String, required: true },
  },
  data () {
    return {};
  },
  computed: {},
  methods: {
    medId() {
      this.$emit('toggleFilter', this.medId);
    },
  },
};
</script>

<style lang="scss">
.vendor-filter {
  font-weight: 700;
  font-family: Open Sans, Roboto, sans-serif;
  width: 1300px;
  height: 600px;
  margin: auto;
  padding: 3.6rem 4.8rem 6rem;
  font-size: 1.2rem;
  background: #ffffff;
  border-radius: 1.2rem;
  box-sizing: border-box;

  &__header {
    margin: 0 0 1.5rem;
  }

  &__title {
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 1.9rem;
  }

  &__name {
    margin: 0 0.5rem;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;

    &.active {
      color: #0000ff;
    }
  }

  &__scroll-wrap {
    overflow: hidden;
  }

  &__scroll {
    width: 100%;
    max-height: 46rem;
    overflow-y: auto;
  }

  &__scroll::-webkit-scrollbar {
    width: 0;
  }

  &__list {
    position: relative;
    margin-top: 10px;
    column-count: 4;
    column-gap: 40px;
  }

  &__item {
    margin-bottom: 32px;
    -webkit-column-break-inside: avoid;
  }

  &__item-name {
    margin-bottom: 8px;
    padding-left: 20px;
  }

  &__photo {
    height: 38px;
    padding: 0 16px 0 4px;
    margin-bottom: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #f7f8f9;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__photo-icon {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    border-radius: 8px;
  }

  &__photo-name {
    margin-right: 16px;
    flex: 1;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  &__photo-favorite-icon {
    height: 16px;
    width: 16px;
    position: relative;
    right: 0;
    cursor: pointer;
  }
}
</style>
