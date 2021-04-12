import md5 from 'js-md5';

export const getEntities = () => fetch('http://jsonplaceholder.typicode.com/photos')
  .then(res => res.json());

export const getAlbumNameById = albumId => md5(`Album - ${albumId}`).substring(0, 10);
