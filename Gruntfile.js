module.exports = function(grunt) {
	'use strict';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: {
				src: ["dist/**"]
			}
		},

		jshint: {
			options: {
				strict: true,
				node: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					console: true
				}
			},
			uses_defaults: ['js/**/*.js']
		},

		jasmine_node: {
			matchall: true,
			projectRoot: ".",
			requirejs: false,
			forceExit: true,
			jUnit: {
				report: false,
				savePath : "./dist/reports/jasmine/",
				useDotNotation: true,
				consolidate: true
			}
		},

		copy: {
			main: {
				files: [
					{
						src: ['js/**'],
						dest: 'dist/',
						filter: 'isFile'
					} // includes files in path
				]
			}
		}		
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jasmine-node');
	
	
	grunt.registerTask('default', ['clean', 'jshint', 'jasmine_node', 'copy']);	
};
