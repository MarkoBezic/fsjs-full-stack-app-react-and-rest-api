import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const CourseDetail = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [course, setCourse] = useState([]);

  const { context } = props;
  const authUser = context.authenticatedUser;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${props.location.state.courseId}`)
      .then(
        (result) => {
          setIsLoaded(true);
          setCourse(result.data);
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
            {authUser && authUser.id === course.userId ? (
              <>
                <Link
                  className="button"
                  to={`/courses/${course.id}/update`}
                  onClick={() => context.actions.courseToUpdate(course)}
                >
                  Update Course
                </Link>
                <Link
                  className="button"
                  onClick={() => {
                    axios.delete(
                      `http://localhost:5000/api/courses/${course.id}`
                    );
                  }}
                  to="/"
                >
                  Delete Course
                </Link>
              </>
            ) : (
              ""
            )}
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
                <h4 className="course--name">{course.title}</h4>
                <p>
                  {course.User
                    ? `By ${course.User.firstName} ${course.User.lastName}`
                    : ""}
                </p>

                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>

                <ul className="course--detail--list">
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
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
