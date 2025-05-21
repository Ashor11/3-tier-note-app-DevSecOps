# 📬 Note App (3-Tier Kubernetes Project with CI/CD)

A fully containerized and Kubernetes-ready feedback application consisting of:

- 🖼️ **Frontend**: React app served via NGINX  
- 🧠 **Backend**: Python Flask REST API  
- 🛢️ **Database**: PostgreSQL 13  
- 🔁 **CI/CD**: Azure DevOps YAML pipelines with self-hosted EC2 agents  

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

| Layer         | Technology                 |
|---------------|----------------------------|
| Frontend      | React, served by NGINX     |
| Backend       | Python 3.9, Flask API      |
| Database      | PostgreSQL 13              |
| CI/CD         | Azure DevOps Pipelines     |
| Containers    | Docker                     |
| Orchestration | Kubernetes (Amazon EKS)    |
| Local Dev     | Docker Desktop + K8s       |

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

CI/CD pipeline defined in `azure-pipelines.yaml`.

### Pipeline Flow

```
Code Commit → Linting & Testing → SonarQube Analysis → Docker Build → 
Push to Registry → Dev Deployment → Manual Approval → Production Deployment
```

The pipeline uses the `sonar-project.properties` file to configure code quality scanning, ensuring all code meets quality standards before deployment.

---

## 📂 Project Structure

```
.
├── README.md
├── azure-pipelines.yaml
├── sonar-project.properties
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
│   │   ├── app.py
│   │   ├── Dockerfile
│   ├── note_frontend/
│   │   ├── public/
│   │   ├── src/
│   │   ├── nginx.conf
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
