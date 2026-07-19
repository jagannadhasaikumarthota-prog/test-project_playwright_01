pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Install dependencies') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
      }
    }

    stage('Install Playwright browser') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npx.cmd" playwright install chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npx.cmd" playwright test --reporter=list,allure-playwright'
      }
    }

    stage('Generate Allure report') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npx.cmd" allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-report/**, test-results/**, playwright-report/**', allowEmptyArchive: true
    }
  }
}
