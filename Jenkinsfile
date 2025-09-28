pipeline {
    agent any
    
    tools {
        nodejs 'nodejs'
    }
    
    environment {
        APP_DIR = '/home/ec2-user/apps/express-frontend'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out Express frontend code...'
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/express-frontend.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh '''
                    cd ${APP_DIR}
                    npm install
                '''
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo 'Deploying Express frontend...'
                sh '''
                    cd ${APP_DIR}
                    pm2 stop express-frontend || true
                    pm2 start server.js --name express-frontend
                    pm2 save
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                sh 'sleep 5'
                sh 'curl -f http://localhost:3000/health || exit 1'
            }
        }
    }
    
    post {
        success {
            echo 'Express frontend deployment completed successfully!'
        }
        failure {
            echo 'Express frontend deployment failed!'
        }
    }
}