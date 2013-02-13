/*global module:false*/
module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['lib/*.js','test/specs/*.js','test/webroot/js/app/*.js']
    },
    jasmine: {
        all: {
            src: 'test/jasmine_runner.html',
            errorReporting: true
        }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'save build'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        define: true,
        requirejs: true,
        require: true,
        describe: true,
        it: true,
        jasmine: true,
        expect: true
      }
    },
    uglify: {},
    shell: {
        phantom: {
            command: 'casperjs ~/dev/symposia/test/casper/customlogging.js',
            stdout: true
        }
    }
  });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jasmine-task');
  // Default task.
  grunt.registerTask('default','lint concat min');
  grunt.registerTask('build','jasmine');
  grunt.registerTask('save','shell');

};
