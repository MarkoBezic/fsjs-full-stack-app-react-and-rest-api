import React, { useEffect, useState } from "react";
import Form from "./Form";

const UpdateCourse = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;

  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const getRequestedCourse = () => {
    const courseId = getCourseIdFromBrowser();
    context.data.getCourse(courseId).then((course) => {
      if (course) {
        if (authUser.id === course.userId) {
          setCourse(course);
          setCourseTitle(course.title);
          setCourseDescription(course.description);
          setEstimatedTime(course.estimatedTime);
          setMaterialsNeeded(course.materialsNeeded);
        } else {
          props.history.push("/forbidden");
        }
      } else {
        props.history.push("/notfound");
      }
    });
  };

  useEffect(() => {
    getRequestedCourse();
  }, []);

  const getCourseIdFromBrowser = () => {
    const url = props.location.pathname;
    const idFromUrl = url.substring(9, url.length - 7);
    const result = idFromUrl;
    return result;
  };

  const cancel = () => {
    props.history.push(`/courses/${course.id}`);
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
    const { emailAddress, id } = authUser;
    const { password } = context;
    const courseId = course.id;

    const courseUpdated = {
      id: courseId,
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: id,
    };

    context.data
      .updateCourse(courseUpdated, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`${courseUpdated.title} has been updated successfully!`);
          props.history.push(`/courses/${course.id}`);
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

                  <p>
                    {course
                      ? `${course.User.firstName} ${course.User.lastName}`
                      : "Loading..."}
                  </p>

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
