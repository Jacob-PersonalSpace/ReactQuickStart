import React, { Component } from 'react';
import { render } from 'react-dom';

import AwesomeComponent from './awesomeComponent.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <p>Hello React!!</p>
                <AwesomeComponent />
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('app')
);