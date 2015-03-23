'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		// sass: {
		// 	dist: {
		// 		options: {
		// 			style: 'expanded', // expanded or nested or compact or compressed
		// 			loadPath: '<%= app %>/bower_components/foundation/scss',
		// 			compass: true,
		// 			quiet: true
		// 		},
		// 		files: {
		// 			'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
		// 		}
		// 	}
		// },


		sass: {
        options: {
            style: 'expanded',
            includePaths: ['<%= app %>/bower_components/foundation/scss']
        },
        dist: {
            files: {
                '<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
            }
        }
    },


		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= app %>/',
					src: ['**/*.jade', '!**/header.jade', '!**/footer.jade', '!includes/*.jade'],
					ext: '.html',
					dest: '<%= app %>/'
				}]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['*.html', '!**/*.scss', '!includes', '!bower_components/**', '*.png', '*.xml', '*.ico', '*.json'],
					dest: '<%= dist %>/'
				}]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			js: ['<%= dist %>/js/app.min.js', '!<%= app %>/js/*.js'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: ['<%= app %>/scss/**/*.scss', '<%= app %>/scss/**/*.sass'],
				tasks: ['sass']
			},
			jade: {
				files: '<%= app %>/**/*.jade',
				tasks: ['jade']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		uncss: {
		  dist: {
		    files: {
		      'app/css/app.css': ['app/index.html']
		    }
		  }
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.jade'
				],
				exclude: [
					'modernizr',
					'jquery-placeholder',
					'foundation'
				]
			}
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'dist/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'dist/css',
		      ext: '.min.css'
		    }]
		  }
		},
		autoprefixer: {
	    options: {
	      browsers: ['last 2 versions', 'ie 8', 'ie 9']
	    },
	    single_file: {
	    	src: '<%= dist %>/css/app.min.css',
	    	dest: '<%= dist %>/css/app.min.css'
	    }
	  },

	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('compile-jade', ['jade']);
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);


	grunt.registerTask('default', ['compile-jade', 'compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);

	grunt.registerTask('publish', ['compile-jade', 'compile-sass', 'uncss:dist', 'clean:dist', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin', 'autoprefixer']);

};
