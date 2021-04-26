const gulp = require('gulp');
const babel = require('gulp-babel');
var ts = require("gulp-typescript");
tsProject = ts.createProject("tsconfig.json");

gulp.task('build:graphql', () =>
  gulp.src('./src/server/**/*.graphql').pipe(gulp.dest('./dist/'))
);

gulp.task('build:ts', () =>
  gulp
    .src('./src/server/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('./dist/'))
);

// 定义 default 任务
gulp.task("default", gulp.series("build:graphql", "build:ts"));

if (process.env.NODE_ENV !== 'production') {
  gulp.watch('./src/serve/**/*.ts', gulp.series('default'));
}
