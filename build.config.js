module.exports = {
  jekyll: {
    default: '_config.yml'
  },
  views: [
    './_(includes|layouts)/**/*.html',
    './_ltu-components/(src|example-pages)/**/*.html',
    './_ltu-components/example-pages/*.html',
    './_docs/**/*.md',
    './assets/**/*.scss',
  ],
  scripts: {
    src: './_ltu-components/src/**/*.js',
    dests: [
      './_site/ltu-components/dist/js/ds-ltu.js',
      './_ltu-components/dist/js/ds-ltu.js',
    ]
  },
  styles: {
    ltuPatterns: {
      src: [
        './_ltu-components/src/**/*.scss',
      ],
      entryPoint: './_ltu-components/src/ds-ltu.scss',
      dests: [
        './_ltu-components/dist/css',
        './_site/ltu-components/dist/css',
      ]
    },
    ltuLegacy: {
      src: './_ltu-components/legacy/**/*.scss',
      entryPoint: './_ltu-components/legacy/ltu-legacy.scss',
      dests: [
        './_ltu-components/dist/css',
        './_site/ltu-components/dist/css',
      ]
    },
  },
  browserSync: {
    open: true,
    ghostMode: false,
    server: {
      baseDir: './_site',
    },
    port: 4000
  }
}
