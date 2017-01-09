module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),

		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			'gp-github-source-url': {
				src: [
					'assets/js/src/gp-github-source-url.js'
				],
				dest: 'assets/js/gp-github-source-url.js'
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'assets/js/src/**/*.js',
				'assets/js/test/**/*.js'
			],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				globals: {
					exports: true,
					jQuery:  false,
					GPGitHubSourceUrl: false,
					module:  false
				}
			}
		},

		uglify: {
			all: {
				files: {
					'assets/js/gp-github-source-url.min.js': ['assets/js/gp-github-source-url.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},

		test:   {
			files: ['assets/js/test/**/*.js']
		},

		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,

				cwd: 'assets/css/src/',
				src: ['gp-github-source-url.css'],

				dest: 'assets/css/',
				ext: '.min.css'
			}
		},

		watch:  {

			styles: {
				files: ['assets/css/src/*.css'],
				tasks: ['cssmin'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},

		clean: {
			main: ['release/<%= pkg.version %>']
		},

		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!assets/css/src/**',
					'!assets/js/src/**',
					'!img/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/'
			}
		},

		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/gp-github-sourceurl.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: 'gp-github-source-url/'
			}
		},

		makepot: {
			main: {
				options: {
					type: 'wp-plugin',
					potHeaders: {
						'report-msgid-bugs-to': '<%= pkg.homepage %>',
						'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
					}
				}
			}
		},

		checktextdomain: {
			options:{
				text_domain: '<%= pkg.name %>',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src:  [
					'**/*.php', // Include all files
					'!node_modules/**' // Exclude node_modules/
				],
				expand: true
			}
		},

		po2mo: {
			files: {
				src: 'languages/*.po',
				expand: true
			}
		},

	} );

	// Load other tasks
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	grunt.loadNpmTasks( 'grunt-po2mo' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );

	// Default task.
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'cssmin'] );

	grunt.registerTask( 'translate', ['checktextdomain', 'makepot', 'po2mo'] );
	grunt.registerTask( 'build', ['default', 'clean', 'translate', 'copy', 'compress'] );

	grunt.util.linefeed = '\n';
};
