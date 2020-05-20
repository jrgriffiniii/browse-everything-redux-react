import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { selectContainerForUpload, selectBytestreamForUpload } from '../actions'

// Are class constants supported in ES yet?
// const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js'
// const GOOGLE_SDK_URL = 'gapi-beautified.js'
//const GOOGLE_SDK_URL = `${process.env.PUBLIC_URL}/vendor/gapi.js`

//import GoogleSdkUrl from 'vendor/gapi-beautified.js'
//import GoogleSdkUrl from 'vendor/gapi-beautified.js'

//import gapi from '../vendor/gapi.es6.js'

class GooglePickerTree extends React.Component {
  constructor(props) {
    super(props)

    this.handlePicked = this.handlePicked.bind(this)
    this.buildPicker = this.buildPicker.bind(this)
    this.handlePickerApiLoad = this.handlePickerApiLoad.bind(this)
    this.handleApiLoad = this.handleApiLoad.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)

    this.state = {
      pickerApiLoaded: false,
      picker: null,
      loadingScript: false
    }
  }

  buildContainer(doc) {
    let container = {
      id: doc.id,
      name: doc.name,
      bytestreams: [],
      containers: []
    }

    return container
  }

  buildBytestream(doc) {
    let bytestream = {
      id: doc.id,
      name: doc.name,
      media_type: doc.mimeType,
      size: doc.sizeBytes
    }

    return bytestream
  }

  handlePicked(data) {
    if (
      data[window.google.picker.Response.ACTION] ===
      window.google.picker.Action.PICKED
    ) {
      const docs = data[window.google.picker.Response.DOCUMENTS]

      docs.forEach(doc => {
        if (doc.type === 'folder') {
          const container = this.buildContainer(doc)
          this.props.dispatch(selectContainerForUpload(container))
        } else {
          const bytestream = this.buildBytestream(doc)
          this.props.dispatch(selectBytestreamForUpload(bytestream))
        }
      })

      this.props.handleSubmit()
    } else if (
      data[window.google.picker.Response.ACTION] ===
      window.google.picker.Action.CANCEL
    ) {
      this.props.handleCancel()
    }
  }

  buildPicker() {
    if (!this.props.oauthToken) {
      throw new Error('Fatal: Cannot build the Picker component without an OAuth Token from the Google API')
    }

    if (this.state.pickerApiLoaded) {
      const view = new window.google.picker.DocsView()
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true)
        .setParent('root')
        .setMode(window.google.picker.DocsViewMode.LIST)

      const picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.SUPPORT_DRIVES)
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .addView(view)
        .setOAuthToken(this.props.oauthToken)
        .setDeveloperKey(this.props.developerKey)
        .setCallback(this.handlePicked)
        .build()
      picker.setVisible(true)
      this.setState({ picker: picker })
    }
  }

  handlePickerApiLoad() {
    console.log(`trace picker: ${(new Date()).getTime()}`)
    this.setState({ pickerApiLoaded: true })
    // This should not be build until after the oauthToken is updated
    //this.buildPicker()
  }

  handleApiLoad() {
    this.setState({ loadingScript: false })

    this.props.gapi.load('auth2', this.props.handleAuthApiLoad)
    this.props.gapi.load('picker', this.handlePickerApiLoad)
  }

  get googleLoaded() {
    return !!this.props.gapi
  }

  handleOnLoad(script, callback) {
      script.onerror = script.onload = null
      callback()
  }

  handleIeOnLoad() {}

  componentDidMount() {
    if (!this.state.loadingScript) {
      this.setState({ loadingScript: true })
      this.handleApiLoad()

/*
      // This needs to be refactored
      const script = window.document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf8'
      script.async = true

      // This is used for IE support
      // const onLoad = 'onload' in script ? this.handleOnLoad : this.handleIeOnLoad
      const onLoad = this.handleOnLoad

      script.onload = event => {
        onLoad( event.target, this.handleApiLoad )
      }

      // This is necessary for Firefox
      if (!script.onload) {
        console.log('Script does not have an onload callback')
        onLoad( script, this.handleApiLoad )
      }

      window.document.body.appendChild(script)
      script.src = GOOGLE_SDK_URL

      script.onerror = error => {
        console.log(error)
      }

      // Handling for Internet Explorer
      script.onreadystatechange = () => {
        if (script.readyState != 'complete' && script.readyState != 'loaded') return

        script.onreadystatechange = null
        onLoad()
      }
*/
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.oauthToken !== this.props.oauthToken) {
      this.buildPicker()
    }
  }

  render() {
    return (
      <div
        className={this.props.classes.root}
        data-testid="google-picker-tree-wrapper"
      >
        <Typography
          className={this.props.classes.root}
          variant="body1"
          component="div"
        >
         {this.props.statusText}
        </Typography>
      </div>
    )
  }
}

GooglePickerTree.propTypes = {
  classes: PropTypes.object.isRequired,
  statusText: PropTypes.string,
  dispatch: PropTypes.func.isRequired,

  developerKey: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  oauthToken: PropTypes.string,
  handleAuthApiLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,

  gapi: PropTypes.object
}

GooglePickerTree.defaultProps = {
  scope: 'https://www.googleapis.com/auth/drive.readonly'
}

const styles = {
  root: {
    padding: '0.33rem 0.85rem'
  }
}

export default withStyles(styles)(GooglePickerTree)
