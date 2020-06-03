
const chromedriver = require('chromedriver')
const seleniumServer = require('selenium-server')
const percy = require('@percy/nightwatch')

const { exec } = require('child_process')

module.exports = {
  src_folders: ['e2e-tests'],
  output_folder: 'reports',
  custom_commands_path: "",
  custom_assertions_path: "",
  page_objects_path: "",
  globals_path: "",

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: "./reports",
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path
    },
  },

  test_settings: {
    default: {
      "launch_url": "http://localhost",
      "selenium_port": 4444,
      "selenium_host": "localhost",

      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": [
            "disable-gpu",
            "--start-maximized",
            "--headless"
          ],
          "w3c": false
        }
      },

      "screenshots": {
        "enabled": false,
        "path": ""
      }
    },

    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    },

    "edge" : {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge"
      }
    }
  }
}

