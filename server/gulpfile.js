const gulp=require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
 
gulp.task("server", function() {
    nodemon({
        script: './server.js',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    })
    gulp.watch('server.js').on("change", reload);
});
