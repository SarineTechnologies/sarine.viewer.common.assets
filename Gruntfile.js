'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var target = grunt.option('target') || "";
    var config = {};
	config.dist = decideDist();

    grunt.initConfig({
        config: grunt.file.readJSON(target + "package.json"),
        copy: {
            dist: {
                files: [{
                    cwd: 'app',
                    src: ['**/*','!fonts/**','!img/**'],
                    dest: config.dist.root,
                    expand: true
                }]
            }
        },
         watch: {
                options: {
                    interrupt: true
                },
                scripts: {
                    files: [target + 'coffee/<%= config.name %>.coffee'],
                    tasks: ['build'],
                    options: {
                        spawn: false,
                    }
                }
            },
        uglify: {
                minify_files: {
                    options: {
                        sourceMap: true,
                        sourceMapIncludeSources: true
                    },
                    files: [{
                        expand: true,
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: 'app',
                        cwd: 'app',
                        rename: function (dst, src) {
                          return dst + '/' + src.replace('.js', '.min.js');
                        }
                      }]
                }
         },
            
    })
    grunt.registerTask('build', [
        'uglify:minify_files',
        'copy:dist',
        'copyVersion'
    ])
    grunt.registerTask('dev', ['build', 'watch']);

    grunt.registerTask('copyVersion' , 'copy version from package.json to sarine.viewer.common.assets.config' , function (){
        var packageFile = grunt.file.readJSON(target + 'package.json');
        var configFileName = packageFile.name + '.config';
        var copyFile = null;
        if (grunt.file.exists(configFileName))
            copyFile = grunt.file.readJSON(configFileName);
        
        if (copyFile == null)
            copyFile = {};

        copyFile.version = packageFile.version;
        grunt.file.write(config.dist.root+configFileName , JSON.stringify(copyFile));
        grunt.log.writeln(config.dist+configFileName);
    });



    function decideDist()
    {
        if(process.env.buildFor == 'deploy')
        {
            grunt.log.writeln("dist is github folder");

            return {
                root: 'app/dist/'
            }
        }
        else
        {
            grunt.log.writeln("dist is local");

            return {
                root: '../../../dist/content/viewers/atomic/v1/assets/'
            }
        }
    }


};
