<template>
  <div class="wrap">
    <vendor-filter
      :titles="titles"
      :albums="albums"
      :favorites="favorites"
      :filter="filter"
      @toggleFilter="toggleFilter"
      @toggleFavorite="toggleFavorite"
    />
    <div class="wrap__bg" />
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import { getEntities, getAlbumNameById } from '../api/index';
import VendorFilter from './vendor-filter.vue';

export default {
  components: { VendorFilter },
  data () {
    return {
      titles: [],
      albums: [],
      favorites: [],
      filter: '',
    };
  },
  computed: {
    ...mapGetters({
      getTitles: 'popup/getTitles',
      getAlbums: 'popup/getAlbums',
      getFavorites: 'popup/getFavorites',
      getFilter: 'popup/getFilter',
    }),
  },
  methods: {
    async init() {
      if (!this.getFilter) {
        const photos = await this.getPhotos();
        const titles = this.groupingByTitles(photos);

        this.initState({
          titles,
          albums: this.groupingByAlbums(photos),
          favorites: this.groupingByFavorites(titles),
          filter: 'byTitle',
        });
      }

      this.titles = JSON.parse(JSON.stringify(this.getTitles));
      this.albums = JSON.parse(JSON.stringify(this.getAlbums));
      this.favorites = JSON.parse(JSON.stringify(this.getFavorites));
      this.filter = this.getFilter;
    },

    async getPhotos() {
      let result = [];
      await getEntities().then(arr => { result = arr; });

      return result;
    },

    groupingByTitles(arr) {
      const sortedByTitle = arr.sort((current, next) => current.title.localeCompare(next.title));
      const firstCharList = new Set();

      sortedByTitle.forEach(val => {
        firstCharList.add(val.title.charAt(0));
      });

      return Array.from(firstCharList)
        .reduce(
          (result, character) => {
            const groupSize = this.getRandomInRange(5, 10);

            const photos = sortedByTitle.reduce(
              (res, photo) => {
                const cond = (
                  photo.title.charAt(0) === character
                  &&
                  res.length < groupSize
                );

                if (cond) res.push({
                  id: photo.id,
                  title: photo.title.charAt(0).toUpperCase() + photo.title.slice(1),
                  icon: photo.thumbnailUrl,
                  isFavorite: false,
                });

                return res;
              },
              [],
            );

            return [
              ...result,
              {
                character: character.toUpperCase(),
                photos,
              },
            ];
          },
          [],
        );
    },

    groupingByAlbums(arr) {
      const sortedByTitle = arr.sort((current, next) => current.title.localeCompare(next.title));
      const sortedByAlbum = arr.sort((current, next) => current.albumId < next.albumId);

      const albumIdsList = new Set();

      sortedByAlbum.forEach(val => {
        albumIdsList.add(val.albumId);
      });

      return Array.from(albumIdsList)
        .reduce(
          (result, albumId) => {
            const albumSize = this.getRandomInRange(5, 10);

            const photos = sortedByTitle.reduce(
              (res, photo) => {
                const cond = (
                  photo.albumId === albumId
                  &&
                  res.length < albumSize
                );

                if (cond) res.push({
                  id: photo.id,
                  title: photo.title.charAt(0).toUpperCase() + photo.title.slice(1),
                  icon: photo.thumbnailUrl,
                  isFavorite: false,
                });

                return res;
              },
              [],
            );

            const albumName = getAlbumNameById(albumId);

            return [
              ...result,
              {
                albumName: albumName.charAt(0).toUpperCase() + albumName.slice(1),
                photos,
              },
            ];
          },
          [],
        )
        .slice(0, 32)
        .sort((cur, next) => cur.albumName.localeCompare(next.albumName));
    },

    groupingByFavorites(arr) {
      return arr
        .map(group => ({
          ...group,
          photos: group.photos.filter(photo => photo.isFavorite),
        }))
        .filter(group => group.photos.length);
    },

    toggleFilter(filter) {
      if (filter.localeCompare(this.filter)) this.updateFilter(filter);
      else this.updateFilter('byTitle');

      this.filter = this.getFilter;
    },

    toggleFavorite(photoId) {
      const toggleInTitles = id => this.titles.map(group => ({
        ...group,
        photos: group.photos.map(photo => {
          if (photo.id === id) photo.isFavorite = !photo.isFavorite;

          return photo;
        }),
      }));
      const toggleInAlbums = id => this.albums.map(album => ({
        ...album,
        photos: album.photos.map(photo => {
          if (photo.id === id) photo.isFavorite = !photo.isFavorite;

          return photo;
        }),
      }));

      this.titles = toggleInTitles(photoId);
      this.albums = toggleInAlbums(photoId);
      this.favorites = this.groupingByFavorites(this.titles);

      this.updateTitles(
        JSON.parse(JSON.stringify(this.titles)),
      );
      this.updateAlbums(
        JSON.parse(JSON.stringify(this.albums)),
      );
      this.updateFavorites(
        JSON.parse(JSON.stringify(this.favorites)),
      );
    },

    getRandomInRange(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    ...mapMutations({
      initState: 'popup/initState',
      updateTitles: 'popup/updateTitles',
      updateAlbums: 'popup/updateAlbums',
      updateFavorites: 'popup/updateFavorites',
      updateFilter: 'popup/updateFilter',
    }),
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.wrap {
  position: relative;
  height: 100vh;
  display: flex;

  &__bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: rgba(27, 32, 79, 0.2);
  }
}
</style>
