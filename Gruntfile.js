var config = require('./config');

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: config.email,
                password: config.password,
                branch: config.branch,
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });


    grunt.registerTask('default', ['screeps']);
};