// Authentication layout components

import ErrorLayout from "layouts/ErrorLayout/ErrorLayout";

import ErrorButton from "components/ErrorButton/ErrorButton";
// Images

import errorbg from "assets/images/errorbg.jpg";

import "./ErrorPage.css";

function ErrorPage(props) {
  return (
    <>
      <div>
        <ErrorLayout image={errorbg}>
          <div className="curved">
            <div className="content">
              <h1>OBD CHARM</h1>
              <h6>On-Board Diagnostic Car Health Assessment and Risk Monitoring</h6>
            </div>
          </div>

          <div>
            <section className="error-container">
              <span className="four">
                <span class="screen-reader-text">4</span>
              </span>
              <span className="zero">
                <span class="screen-reader-text">0</span>
              </span>
              <span className="four">
                <span class="screen-reader-text">4</span>
              </span>
              <h2 className="notfoundtext"> Page Not Found</h2>
              <h5 className="subtext">The page you are are trying to reach is not accessible.</h5>
            </section>
          </div>
          <ErrorButton button={props.button}></ErrorButton>
        </ErrorLayout>
      </div>
    </>
  );
}

export default ErrorPage;
