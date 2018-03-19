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
                    src: '**/*',
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
            }
    })
    grunt.registerTask('build', [
        'copy:dist' 
    ])
    grunt.registerTask('dev', ['build', 'watch']);

    grunt.registerTask('copyVersion' , 'copy version from package.json to sarine.viewer.unifiedassets.config' , function (){
        var packageFile = grunt.file.readJSON(target + 'package.json');
        var configFileName = target + packageFile.name + '.config';
        var copyFile = null;
        if (grunt.file.exists(configFileName))
            copyFile = grunt.file.readJSON(configFileName);
        
        if (copyFile == null)
            copyFile = {};

        copyFile.version = packageFile.version;
        grunt.file.write(configFileName , JSON.stringify(copyFile));
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
