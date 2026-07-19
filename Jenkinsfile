pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Install Playwright browser') {
      steps {
        bat 'npx playwright install chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat 'npx playwright test --reporter=list,allure-playwright'
      }
    }

    stage('Generate Allure report') {
      steps {
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-report/**, test-results/**, playwright-report/**', allowEmptyArchive: true
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'allure-report',
        reportFiles: 'index.html',
        reportName: 'Allure Report'
      ])
    }
  }
}
