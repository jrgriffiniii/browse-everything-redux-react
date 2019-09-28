import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import UploadForm from './UploadForm';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <Typography variant="h1" component="h2" gutterBottom>
            Browse Everything
          </Typography>
        </Container>
        <Container maxWidth="lg">
          <UploadForm
            styles={this.props.style}
            dispatch={this.props.dispatch}
            selectedProvider={this.props.selectedProvider}
            currentAuthToken={this.props.currentAuthToken}
            providers={this.props.providers}
            currentSession={this.props.currentSession}
          />
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  style: PropTypes.object,

  selectedProvider: PropTypes.object.isRequired, // This should be updated to currentProvider
  providers: PropTypes.object.isRequired,
  currentAuthToken: PropTypes.object.isRequired,
  currentSession: PropTypes.object.isRequired,

  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedProvider, currentAuthToken } = state
  const providers = state.providers || {
    isRequesting: false,
    items: []
  }
  const currentSession = state.currentSession || {
    isRequesting: false,
    items: []
  }

  return {
    selectedProvider,
    providers,
    currentAuthToken,
    currentSession
  }
}

export default connect(mapStateToProps)(App);
