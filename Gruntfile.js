module.exports = function ( grunt ) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        'browserify': {
            dist: {
                options: {
                    transform: [
                        ['babelify', { /* babel options go here */ }]
                    ]
                },
                files: {
                    './dist/app.js': './src/main.js'
                }
            }
        },
        'copy': {
            main: {
                files: [
                    { expand: true, src: ['lib/**'], dest: 'dist/' },
                    { expand: true, cwd: 'src/', src: ['**', '!*.js'], dest: 'dist/' }
                ]
            }
        },
        'clean': {
            dist: ['dist']
        }
    });

    grunt.registerTask('default', ['clean:dist', 'browserify', 'copy:main']);
}
