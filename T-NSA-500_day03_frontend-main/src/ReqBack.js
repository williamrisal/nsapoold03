import React from 'react';
import axios from 'axios';

class ReqBack extends React.Component {

  constructor(props) {
    super(props);
    this.state = { backURI: `http://localhost/api/user`, isBackUp: false, error: null, res: null };
  }

  checkStatus(res) {
    if (res.data) {
      this.setState({isBackUp: true});
    } else {
      var error = new Error(res.statusText);
      error.res = res;
      throw error;
    }
}

  parseJSON(response) {
    return response.json()
  }

  componentDidMount() {
    const tmpURI = this.state.backURI;
    axios.get(tmpURI)
      .then(res => {
        this.setState({res});
        if (res.status >= 200 && res.status < 300) {
          this.setState({isBackUp: true});
          return res
        } else {
          var error = new Error(res.statusText)
          error.res = res
          throw error
        }
      })
      .catch(error => this.setState({error}))
  }

  render() {
    if (this.state.isBackUp) {
      return (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Task successful! Well done!</h4>
          <hr />
          <p class="mb-0">Aww yeah, you successfully synced your backend and your frontend and thus finished your day of pool, congrats!</p>
        </div>
      );
    } else {
      return (
        <div class="alert alert-warning" role="alert">
          <h4 class="alert-heading">Task failed. Try again.</h4>
          <hr />
          <p class="mb-0">Almost there, you still have to some verifications to do as your backend is not up or not on the right port perhaps...</p>
        </div>
      );
    }
  }
}

export default ReqBack;
