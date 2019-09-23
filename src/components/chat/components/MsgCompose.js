import React, {Component} from 'react';

import './msgcompose.scss';

class MsgCompose extends Component {

  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.keyCode !== 13) return;
    if (!this.message.value) return;

    const {messageHandler} = this.props;
    messageHandler(this.message.value);
    this.message.value = '';
  }

  render() {
    return (
        <div className="compose" id="compose">
          <div className="row">
            <div className="col-md-4 col-lg-3 d-none d-md-block">&nbsp;</div>
            <div className="col">
              <div className="p-3 compose__form">
                <input type="text" className="form-control"
                       ref={c => this.message = c}
                       onKeyUp={this.handleKeyUp}
                       placeholder="Для отправки жмите Enter..."/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default MsgCompose;
