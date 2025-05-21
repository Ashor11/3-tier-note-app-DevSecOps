# 📬 Note App (3-Tier Kubernetes Project with DevSecOps Pipeline)

A fully containerized and Kubernetes-ready note application with complete DevSecOps pipeline:

- 🖼️ **Frontend**: React app served via NGINX  
- 🧠 **Backend**: Python Flask REST API  
- 🛢️ **Database**: PostgreSQL 13  
- 🔁 **CI/CD**: Azure DevOps YAML pipelines with self-hosted EC2 agents
- 🔒 **Security**: SonarQube code analysis
- 🚢 **Containers**: Docker with multi-stage builds
- ☸️ **Orchestration**: Kubernetes (EKS) with Helm charts
- 🤖 **Infrastructure**: Ansible automation for agent setup
- 📊 **Artifact Management**: JFrog Artifactory for Helm charts

Perfect for DevOps demos, Kubernetes practice, and hands-on CI/CD pipelines.

---

## 🔧 Architecture

```
User Browser
    ↓
[ Frontend Service (React + NGINX) - Port 80 ]
    ↓ /api/*
[ Backend Service (Flask) - Port 5000 ]
    ↓
[ PostgreSQL Service - Port 5432 ]
```

---

## ⚙️ Tech Stack

| Layer           | Technology                       |
|-----------------|----------------------------------|
| Frontend        | React, served by NGINX           |
| Backend         | Python 3.9, Flask API            |
| Database        | PostgreSQL 13                    |
| CI/CD           | Azure DevOps Pipelines           |
| Containers      | Docker                           |
| Orchestration   | Kubernetes (Amazon EKS)          |
| Package Manager | Helm Charts                      |
| Code Quality    | SonarQube                        |
| Testing         | pytest, pytest-cov               |
| Linting         | flake8, ESLint                   |
| Infrastructure  | Ansible                          |
| Registry        | Docker Hub, JFrog Artifactory    |
| Local Dev       | Docker Desktop + K8s             |

---

## 📝 Features

- Submit note messages via the React UI  
- Retrieve and list notes from PostgreSQL  
- Delete note messages through the UI  
- Containerized build & deploy pipeline with approvals and gating  

---

## 🚀 Build & Push Docker Images

> Replace `<your-dockerhub-username>` with your Docker Hub account name.

### 🧠 Backend
```bash
cd src/note_backend
docker build -t <your-dockerhub-username>/note-backend:<tag> .
docker push <your-dockerhub-username>/note-backend:<tag>
```

### 🖼️ Frontend
```bash
cd src/note_frontend
docker build -t <your-dockerhub-username>/note-frontend:<tag> .
docker push <your-dockerhub-username>/note-frontend:<tag>
```

---

## ☸️ Kubernetes Deployment (EKS or Docker Desktop)

### 1️⃣ Create DB Secret and ConfigMap
```bash
kubectl apply -f k8s/db-secret.yaml
kubectl apply -f k8s/postgres-init-configmap.yaml
```

### 2️⃣ Apply All Kubernetes Resources
```bash
kubectl apply -f k8s/
```

> This deploys:
> - Frontend Deployment + Service  
> - Backend Deployment + Service  
> - PostgreSQL Deployment + Service  
> - Secrets and ConfigMaps  

---

## 🌐 Access the Application

### 🖥️ Via NodePort
```bash
kubectl get nodes -o wide
# Use a node's public IP and port 30080
http://<NODE_PUBLIC_IP>:30080
```

### 💻 Local Test (Port-forwarding)
```bash
kubectl port-forward svc/frontend-service 8081:80
```
➡️ Open in browser: [http://localhost:8081](http://localhost:8081)

---

## 🔁 Azure DevOps Pipeline (CI/CD)

- Lint and test the backend
- Build and push backend/frontend Docker images
- Replace image tag using token replacement
- Deploy to Kubernetes with conditional production deployment
- Manual validation before production rollout
- Code quality analysis with SonarQube

CI/CD pipeline defined in `azure-pipelines.yml`.

### Pipeline Flow

```
Code Commit → Linting & Testing → SonarQube Analysis → Docker Build → 
Push to Registry → Dev Deployment → Manual Approval → Production Deployment
```

The pipeline uses the `sonar-project.properties` file to configure code quality scanning, ensuring all code meets quality standards before deployment.

---

## 🛠️ Azure DevOps Agent Setup with Ansible

This project includes Ansible playbooks to set up Azure DevOps agents with all the necessary dependencies.

### Files

- `minimal_setup.yml`: Minimal playbook that installs all dependencies and tools
- `ansible/Playbook.yml`: Comprehensive playbook with more configuration options
- `ansible/inventory.ini`: Inventory file where you define your target hosts
- `ansible/ansible.cfg`: Configuration for Ansible

### Prerequisites

1. Ansible installed on your control machine
2. SSH access to target hosts
3. Sudo privileges on target hosts

### Usage

#### 1. Configure your inventory

Edit the `ansible/inventory.ini` file to add your target hosts:

```ini
[azure_devops_agents]
agent1 ansible_host=192.168.1.100 ansible_user=ec2-user
```

#### 2. Run the playbook

```bash
cd ansible
ansible-playbook -i inventory.ini Playbook.yml
```

#### 3. For local testing

```bash
cd ansible
ansible-playbook -i inventory.ini Playbook.yml -c local --become
```

### What gets installed

The playbook installs and configures:

- Python 3.9 with pip and required packages (Flask, pytest, flake8, pytest-cov)
- Java 17 (for SonarQube)
- Docker CE
- Helm 3
- AWS CLI v2
- kubectl
- JFrog CLI

---

## 📂 Project Structure

```
.
├── README.md
├── azure-pipelines.yml
├── sonar-project.properties
├── minimal_setup.yml
├── ansible/
│   ├── Playbook.yml
│   ├── inventory.ini
│   └── ansible.cfg
├── k8s/
│   ├── backend-deployment.yaml
│   ├── db-secret.yaml
│   ├── frontend-deployment.yaml
│   ├── postgres-deployment.yaml
│   └── postgres-init-configmap.yaml
│
├── note-chart/
│   ├── templates/
│   │   ├── backend-deployment.yaml
│   │   ├── db-secret.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── postgres-deployment.yaml
│   │   └── postgres-init-configmap.yaml
│   ├── Chart.yaml
│   └── values.yaml
│
├── src/
│   ├── note_backend/
│   │   ├── __init__.py
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── note_frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── MessageForm.js
│   │   │   ├── MessageList.js
│   │   │   └── nginx.conf
│   │   ├── .eslintrc.json
│   │   └── Dockerfile
│   └── note_db/
│       └── init.sql
│
└── tests/
    └── test_app.py
```

---

## 🧪 Local Development

### Backend
```bash
cd src/note_backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd src/note_frontend
npm install
npm start
```

---

## 🙌 Notes & Contributions

Pull requests and ideas welcome!  
Star the repo if you found it useful ⭐