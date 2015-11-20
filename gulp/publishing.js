// gulp
var gulp = require('gulp');
var options = gulp.options;
var paths = gulp.paths;
// plugins
var rsync = require('gulp-rsync');

gulp.task('deploy', ['build'], function() {
  gulp.src(paths.dist)
    .pipe(rsync({
      root: paths.dist,
      destination: options.destination || paths.deploy,
      hostname: options.hostname || undefined,
      recursive: true,
    }));
});
