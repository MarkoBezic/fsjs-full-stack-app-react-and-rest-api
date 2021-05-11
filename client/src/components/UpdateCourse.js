import React, { useCallback, useEffect, useState } from "react";
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

  const getCourseIdFromBrowser = useCallback(() => {
    const url = props.location.pathname;
    const idFromUrl = url.substring(9, url.length - 7);
    const result = idFromUrl;
    return result;
  }, [props.location.pathname]);

  const getRequestedCourse = useCallback(() => {
    const courseId = getCourseIdFromBrowser();
    context.data.getCourse(courseId).then((data) => {
      if (data) {
        if (data.message == 500) {
          props.history.push("/error");
        } else if (authUser.id === data.userId) {
          setCourse(data);
          setCourseTitle(data.title);
          setCourseDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
        } else {
          props.history.push("/forbidden");
        }
      } else {
        props.history.push("/notfound");
      }
    });
  }, [context.data, authUser.id, props.history, getCourseIdFromBrowser]);

  useEffect(() => {
    getRequestedCourse();
  }, [getRequestedCourse]);

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
