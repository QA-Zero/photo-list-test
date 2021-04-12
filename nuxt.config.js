export default {
  mode: 'spa',

  head: {
    title: 'CC',
    meta: [
      { charset: 'utf-8' },
    ],
  },

  plugins: [{ src: '~/plugins/persistedState.client.js' }],

  buildModules: [],
};
