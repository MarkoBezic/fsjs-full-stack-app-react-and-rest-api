import React, { useState } from "react";
import Form from "./Form";

const CreateCourse = (props) => {
  const [errors, setErrors] = useState([]);
  const [courseTitle, setcourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const cancel = () => {
    props.history.push("/");
  };

  const submitCreateCourse = () => {
    const { context } = props;
    const authUser = context.authenticatedUser;
    const { emailAddress, id } = authUser;
    const { password } = context;

    // Course object with new course data
    const course = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: id,
    };

    // Create course in db
    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`${course.title} has successfully been created!`);
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/error");
      });
  };

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "courseTitle") {
      setcourseTitle(value);
    } else if (name === "courseDescription") {
      setCourseDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    }
  };

  return (
    <div>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submitCreateCourse}
          submitButtonText="Create Course"
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

                  <p>By Joe Smith</p>

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
                    value={estimatedTime}
                    onChange={change}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded}
                    onChange={change}
                  ></textarea>
                </div>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default CreateCourse;
