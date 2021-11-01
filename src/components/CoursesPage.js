import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAuthors } from "../actions/authorActions";
import { deleteCourse, loadCourses } from "../actions/courseActions";
import authorStore from "../stores/AuthorStore";
import courseStore from "../stores/CourseStore";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onCourseChange);
    authorStore.addChangeListener(onAuthorChange);
    if (courses.length === 0) loadCourses();
    if (authors.length === 0) loadAuthors();
    return () => {
      courseStore.removeChangeListener(onCourseChange);
      authorStore.removeChangeListener(onAuthorChange); // cleanup on unmount
    };
  }, [courses.length, authors.length]);

  function onCourseChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
