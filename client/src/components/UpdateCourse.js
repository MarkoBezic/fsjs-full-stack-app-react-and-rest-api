import React, { useState } from "react";
import Form from "./Form";

const UpdateCourse = (props) => {
  const { context } = props;
  const courseToUpdate = context.course;

  const [errors, setErrors] = useState([]);
  const [courseTitle, setCourseTitle] = useState(courseToUpdate.title);
  const [courseDescription, setCourseDescription] = useState(
    courseToUpdate.description
  );
  const [estimatedTime, setEstimatedTime] = useState(
    courseToUpdate.estimatedTime
  );
  const [materialsNeeded, setMaterialsNeeded] = useState(
    courseToUpdate.materialsNeeded
  );

  const cancel = () => {
    props.history.push("/");
  };

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "courseTitle") {
      setCourseTitle(value);
    } else if (name === "courseDescription") {
      setCourseDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    }
  };

  const submitUpdateCourse = () => {
    const authUser = context.authenticatedUser;
    const { emailAddress, id } = authUser;
    const { password } = context;
    const courseId = courseToUpdate.id;

    const course = {
      id: courseId,
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: id,
    };

    context.data
      .updateCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`${course.title} has been updated successfully!`);
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/error");
      });
  };

  return (
    <>
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submitUpdateCourse}
          submitButtonText="Update Course"
          elements={() => (
            <>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value={courseTitle}
                    onChange={change}
                  />

                  <p>{`${courseToUpdate.User.firstName} ${courseToUpdate.User.lastName}`}</p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={courseDescription}
                    onChange={change}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime ? estimatedTime : ""}
                    onChange={change}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded ? materialsNeeded : ""}
                    onChange={change}
                  ></textarea>
                </div>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
};

export default UpdateCourse;
