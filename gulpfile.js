import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

export const minifyCSS = () => {
  return gulp
    .src("public/styles.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public"));
};

export default minifyCSS;
