module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); //加载所有任务
  require('time-grunt')(grunt);
  var ssInclude = require("connect-include");
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['dist/*'],
      /*image: 'dist/img',
      css: 'dist/css',
      js: 'dist/js',
      library: 'dist/library'
*/    },
    copy: {
      library: {
        files: [
          {expand: true, cwd: './public/js', src: ['**/*.*'], dest: 'dist/public/js'},
          {expand: true, cwd: './public/html', src: ['**/*.*'], dest: 'dist/public/html'},
          {expand: true, cwd: './public/css', src: ['*.css',], dest: 'dist/public/css'},
          {expand: true, cwd: './subapp', src: ['**/*.js'], dest: 'dist/subapp'},
          {expand: true, cwd: './subapp', src: ['**/*.ejs'], dest: 'dist/views'},
          {expand: true, cwd: './views', src: ['**/*.ejs'], dest: 'dist/views'},
          {expand: true, cwd: './public', src: ['favicon.png','favicon.ico'], dest: 'dist/public'}
          
        ]
      },
      image: {
        files: [
          {expand: true, cwd: './public/img', src: ['**/*.{png,jpg,jpeg,gif}'], dest: 'dist/public/img'}
        ]
      },
      font:{
        files: [
          {expand: true, cwd: './public/css/font', src: ['*.*'], dest: 'dist/public/css/font'}
        ]
      },
      json:{
        files: [
          {expand: true, cwd: './public/json', src: ['**/*.json'], dest: 'dist/json'}
        ]
      }
    },
    less:{
      development: {
        src:['./public/css/less/main.less'],
        dest: "./public/css/main.css"
      }
    },
    cssmin:{
      build: {
        files: [{
          expand: true,
          cwd: './public/css',
          src: 'main.css',
          dest: 'dist/public/css',
          ext: '.min.css',
        }]
      }
    },
    jshint:{
      options:{
        globals:{
          $: false,
          jQuery: false,
          module:false,
          exports:false,
        },
        force: true
      },
      gruntFile:{
        files:{
          src:'Gruntfile.js'
        }
      },
      publicJs:{
        files:{
          src:['./public/js/**/*.js']
        }
      },
      routeJs:{
        files:{
          src:'./routes/**/*.js'
        }
      },
      main:{
        files:{
          src:['app.js']
        }
      }
    },
    watch:{
      js: {
        files: ['./public/**/*.js'],
        tasks:['newer:uglify:build','newer:copy']
      },
      subapp_js: {
        files: ['./subapp/**/*.js'],
        tasks:['newer:copy']
      },
      less: {
        files: ['./public/**/*.less'],
        tasks: ['less2css','copy']
      },
      copyFile:{
        files: ['./public/html/**/*.*','./subapp/**/*.ejs'],
        tasks: ['newer:copy']
      }   
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files:[{
          expand:true,
          cwd: 'public/js',
          src: '**/*.js',
          dest: 'dist/public/js',
          ext: '.min.js'
        }]
      }
    }
  });

  // 默认被执行的任务列表
  grunt.registerTask('less2css', ['less','cssmin']);
  grunt.registerTask('prop', ['jshint','less2css','copy','uglify','watch']);
  grunt.registerTask('publish', ['clean','prop']);
  grunt.registerTask('default',['publish']);
};
