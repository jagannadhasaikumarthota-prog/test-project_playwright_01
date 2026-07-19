pipeline {
  agent any

  environment {
    CI = 'true'
    NODE_HOME = 'C:\\Program Files\\nodejs'
    PATH = "${env.NODE_HOME};${env.PATH}"
  }

  stages {
    stage('Install dependencies') {
      steps {
        bat '"%NODE_HOME%\\npm.cmd" install'
      }
    }

    stage('Install Playwright browser') {
      steps {
        bat '"%NODE_HOME%\\npx.cmd" playwright install chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat '"%NODE_HOME%\\npx.cmd" playwright test --reporter=list,allure-playwright'
      }
    }

    stage('Generate Allure report') {
      steps {
        bat '"%NODE_HOME%\\npx.cmd" allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-report/**, test-results/**, playwright-report/**', allowEmptyArchive: true
    }
  }
}
