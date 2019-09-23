import React, {Component} from 'react';

import './signin.scss';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
      canSubmit: event.target.value.length > 0
    });
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {handleProceed} = this.props;

    return (
      <div className="signin">
        <div className="card">
          <div className="card-header">Впервые тут?</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Пожалуйста введите ваше имя или ник, чтобы другие
                  участники дискуссии знали как к вам обращаться!</label>
                <input
                    type="text" className="form-control mt-3"
                    placeholder="Меня зовут..."
                    ref={el=>this.input=el}
                    value={this.state.username}
                    onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary"
                      disabled={!this.state.canSubmit}
                      onClick={() => handleProceed(
                          this.state.username)}>Вперед!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
