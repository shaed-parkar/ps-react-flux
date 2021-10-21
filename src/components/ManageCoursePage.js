import React from "react";

const ManageCoursePage = (props) => {
  return (
    <>
      <h2>Manage Course</h2>
      <div>{props.match.params.slug}</div>
    </>
  );
};

export default ManageCoursePage;
