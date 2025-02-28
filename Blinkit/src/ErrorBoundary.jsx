import { Component } from "react";
import "../src/styles/ErrorBoundary.css";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haserror: false,
      errormsg: "",
    };
  }

  //static method we no need this key
  static getDerivedStateFromError(err) {
    let errormesage;
    if (err.message.includes("undefined")) {
      errormesage = "Oops! Something is missing";
    } else {
      errormesage = "Something went wrong";
    }
    return { haserror: true, errormsg: errormesage };
  }
  componentDidCatch(error, info) {
    // You can log the error to an external service here if needed
    console.error("error ", error.message);
    console.error("info ", info);
  }
  render() {
    if (this.state.haserror) {
      return (
        <div className="outer-error">
          <div className="error-container">
            <img src="/Category/dogone.png" />
            <h1>{this.state.errormsg}</h1>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
