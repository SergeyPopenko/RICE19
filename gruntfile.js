"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    // Очищаем папку build
    clean: {
      build: ["build"]
    },

    // Вставка файлов html
    includereplace: {
      html: {
        src: "*.html",
        dest: "build/",
        expand: true,
        cwd: "src/"
      }
    },

    // Вставка файлов css
    inline: {
      dist: {
        src: "build/index.html",
        dest: "build/index.html"
      }
    },

    // Копируем файлы из папки source в папку build
    copy: {
      js: {
        expand: true,
        cwd: "src/js/",
        src: ["**"],
        dest: "build/js/",
      },
      font: {
        expand: true,
        cwd: "src/fonts/",
        src: ["**", "!font.less", "!font.scss"],
        dest: "build/fonts/"
      },
      img: {
        files: [
          {
            expand: true,
            cwd: "src/img/_blocks",
            src: ["**"],
            dest: "build/img/"
          },
          {
            expand: true,
            cwd: "src/img/favicon",
            src: ["**"],
            dest: "build/img/favicon"
          }
        ]
      },
      php: {
        expand: true,
        cwd: "src/",
        src: ["*.php"],
        dest: "build/"
      }
    },

    // Улучшаем LESS файл (отступы, порядок свойств и прочее)
    csscomb: {
      style: {
        expand: true,
        src: ["src/**/*.less"]
      }
    },

    // Конвертируем LESS файлы в CSS
    less: {
      style: {
        files: {
          "build/css/main.css": "src/less/main.less"
        }
      }
    },

    // Добавляем префиксы
    autoprefixer: {
      options: {
        browsers: ["last 5 version", "ie 10"]
      },
      style: {
        src: "build/css/main.css"
      }
    },

    // Объединяем медиа-выражения
    cmq: {
      style: {
        files: {
          "build/css/main.css": ["build/css/main.css"]
        }
      }
    },

    // Минимизиурем CSS
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/main.css": ["build/css/main.css"]
        }
      }
    },

    // Объединяем несколько JS файлов
    concat: {
      start: {
        src: ["src/_blocks/**/*.js"],
        dest: "build/js/script.js"
      }
    },

    // Минимизируем js файлы
    uglify: {
      start: {
        files: {
          "build/js/script.js": ["build/js/script.js"]
        }
      }
    },

    // Минимизируем html
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: [{
          expand: true,
          cwd: "build/",
          src: ["**/*.html"],
          dest: "build/"
        }]
      }
    },

    // Минимизируем картинки
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg}"]
        }]
      }
    },

    // Склеиваем svg в спрайт
    svgstore: {
      options: {
        svg: {
          style: "display:none"
        }
      },
      symbols: {
        files: {
          "build/img/svg/symbols.svg": ["src/img/svg/*.svg"]
        }
      }
    },

    // Минимизируем svg
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/**/*.svg", "!build/img/svg/symbols.svg"]
        }]
      },
    },

    // Синхронизация браузера
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/"
          ]
        },
        options: {
          server: "build/",
          watchTask: true
        }
      }
    },

    // Отслеживаем изенения в указанных файлах и выполняем описанные действия
    watch: {
      style: {
        files: ["src/_blocks/**/*.less", "src/less/**/*"],
        tasks: ["style"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ["src/js/**/*.js", "src/_blocks/**/*.js"],
        tasks: ["js"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ["src/img/**/*"],
        tasks: ["copy:img"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      imagesBlock: {
        files: ["src/_blocks/img/**/*.{png,jpg,svg}"],
        tasks: ["copy:imgBlocks"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      svg: {
        files: ["src/img/svg/"],
        tasks: ["symbols", "includereplace:html"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ["src/**/*.html"],
        tasks: ["includereplace:html"],
        options: {
          spawn: false,
          livereload: true
        },
      },
      font: {
        files: ["src/fonts/**/*"],
        tasks: ["copy:font", "style"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // Мета-таск - передаем в массиве последовательность запуска тасков
  grunt.registerTask("production", [
    "clean",
    // "csscomb",
    "style",
    "cmq",
    "csso",
    "concat",
    "uglify",
    "copy",
    "imagemin",
    "symbols",
    "includereplace"
  ]);

  grunt.registerTask("build", [
    "clean",
    "style",
    "concat",
    "copy",
    "svgstore",
    "includereplace",
    "serve"
  ]);

  grunt.registerTask("serve", [
    "browserSync",
    "watch"
  ]);

  grunt.registerTask("symbols", [
    "svgstore",
    "svgmin"
  ]);

  grunt.registerTask("js", [
    "concat",
    "copy:js"
  ]);

  grunt.registerTask("style", [
    "less",
    "autoprefixer"
  ]);
}
