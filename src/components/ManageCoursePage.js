import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";
import courseStore from "../stores/CourseStore";
import CourseForm from "./CourseForm";
import authorStore from "../stores/AuthorStore";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    courseStore.addChangeListener(onCourseChange);

    if (authors.length === 0) loadAuthors();

    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      const searchedCourse = courseStore.getCourseBySlug(slug);
      if (searchedCourse) {
        setCourse(searchedCourse);
      } else {
        props.history.push("/not-found");
      }
    }
    return () => {
      courseStore.removeChangeListener(onCourseChange);
      authorStore.removeChangeListener(onAuthorChange); // cleanup on unmount
    };
  }, [courses.length, authors.length, props.match.params.slug, props.history]);

  function onCourseChange() {
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
