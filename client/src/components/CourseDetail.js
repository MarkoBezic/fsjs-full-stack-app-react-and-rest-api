import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseDetail = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${props.location.state.courseId}`)
      .then(
        (result) => {
          setIsLoaded(true);
          setCourses(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [props.location.state.courseId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to={`/courses/${courses.id}/update`}>
              Update Course
            </Link>
            <Link
              className="button"
              onClick={() => {
                axios.delete(`http://localhost:5000/api/courses/${courses.id}`);
              }}
              to="/"
            >
              Delete Course
            </Link>
            <a className="button button-secondary" href="index.html">
              Return to List
            </a>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courses.title}</h4>
                <p>
                  {courses.User
                    ? `By ${courses.User.firstName} ${courses.User.lastName}`
                    : ""}
                </p>

                <p>{courses.description}</p>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courses.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {courses.materials
                    ? courses.materialsNeeded
                        .split("* ")
                        .filter((item) => item)
                        .map((item) => <li>{item}</li>)
                    : ""}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};
export default CourseDetail;
