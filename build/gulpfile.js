var gulp = require('gulp');
var karma = require('gulp-karma');
var gutil = require('gulp-util');


gulp.task('karma', function(){
	gulp.src('./bodus').pipe(karma({configFile: 'karma.conf.js', action: 'watch'})).on('error', gutil.log);
});

gulp.task('default', ['karma'], function(){

})