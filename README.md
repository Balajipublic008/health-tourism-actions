<div align="center">
<img width="1200" height="475" alt="GHBanner" src=".\Image_Gallery\tourism_india.png" />
</div>

# Run and deploy your Own app related Health toursim from india 

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# GKE Blue-Green Deployment using GitHub Actions
## Project Overview
This project implements an end-to-end CI/CD deployment pipeline using:
- GitHub Actions
- Docker
- Google Kubernetes Engine (GKE)
- Kubernetes
- Artifact Registry
- Blue Deployment Strategy

Application flow:
Developer → GitHub → GitHub Actions → Docker Build → Artifact Registry → GKE → Blue Namespace → Pods → Service → Application Access
---
# Architecture Overview

text
Developer
   ↓
GitHub Repository
   ↓
GitHub Actions Pipeline
   ↓
Docker Build
   ↓
Artifact Registry
   ↓
GKE Cluster
   ↓
Blue Namespace Deployment
   ↓
Pods
   ↓
Kubernetes Service
   ↓
Application Access
________________________________________
Prerequisites
Tools Required
•	gcloud CLI
•	kubectl
•	Docker
•	GitHub Repository
•	GCP Project
•	GKE Cluster
________________________________________
GKE Cluster Setup
Connect to Cluster
gcloud container clusters get-credentials med-tour-cluster --zone us-central1-a
Verify Nodes
kubectl get nodes
________________________________________
Artifact Registry Setup
Create Repository
gcloud artifacts repositories create medical-tourisum \
--repository-format=docker \
--location=us-central1
Configure Docker Authentication
gcloud auth configure-docker us-central1-docker.pkg.dev
________________________________________
Docker Commands
Build Image
docker build -t medical-tourism-app .
Tag Image
docker tag medical-tourism-app \
us-central1-docker.pkg.dev/PROJECT_ID/medical-tourisum/medical-tourism-app:latest
Push Image
docker push \
us-central1-docker.pkg.dev/PROJECT_ID/medical-tourisum/medical-tourism-app:latest
________________________________________
Kubernetes Deployment
Deployment YAML Important Image Path
image: us-central1-docker.pkg.dev/${PROJECT_ID}/medical-tourisum/${IMAGE}:latest
________________________________________
Service YAML
apiVersion: v1
kind: Service

metadata:
  name: medical-tourism-service
  namespace: blue

spec:
  type: LoadBalancer

  selector:
    app: medical-tourism-blue

  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
________________________________________
Deploy Application
Apply Deployment
envsubst < deployment-blue.yaml | kubectl apply -f - -n blue
Apply Service
kubectl apply -f service-blue.yaml
________________________________________
Verify Deployment
Check Pods
kubectl get pods -n blue
Check Services
kubectl get svc -n blue
Watch External IP
kubectl get svc -n blue -w
________________________________________
Application Access
Access URL
http://EXTERNAL-IP
Health Endpoint
http://EXTERNAL-IP/api/health
________________________________________
GitHub Actions Flow
Pipeline Stages
1.	Build Docker Image
2.	Push Image to Artifact Registry
3.	Deploy to GKE
4.	Validate Rollout
5.	Test Health Endpoint
________________________________________
Important Troubleshooting Steps
1. ImagePullBackOff
Root Cause
Mostly caused by:
•	Missing IAM permissions
•	Registry access issues
•	Wrong image path
•	Image not pushed
Important Checks
kubectl describe pod POD_NAME -n blue
Check:
Events:
________________________________________
2. InvalidImageName
Root Cause
Wrong variable substitution.
Wrong
${{ env.PROJECT_ID }}
Correct
${PROJECT_ID}
________________________________________
3. GCR Authentication Issues
Problem
403 Forbidden during image pull.
Fix
Migrated from:
•	GCR
To:

Create Artifact Registry:
•	# gcloud services enable artifactregistry.googleapis.com
•	# gcloud artifacts repositories create my-repo \
--repository-format=docker \
--location=us-central1 \
--description="Docker repo"
Configure Docker Authentication:
# gcloud auth configure-docker us-central1-docker.pkg.dev

Build Docker Image:
# docker build -t myapp:v1 

Tag Image:
# REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:TAG

Push Image:
# docker push us-central1-docker.pkg.dev/my-gke-project/my-repo/myapp:v1


________________________________________
4. Missing Service
Problem
Pods running but URL not accessible.
Root Cause
Service not created.
Fix
Apply service YAML.
First Critical Check:
Please note that created image must be tagged 
# gcloud container images list-tags \
gcr.io/project-b0bf8b45-36f1-4568-966/medical-tourism-app

Get Node Service Account
# gcloud container clusters describe med-tour-cluster \
--zone us-central1-a 
Look for service account it is showing like : PROJECT_NUMBER-compute@developer.gserviceaccount.com

Get Project Number: 
# gcloud projects describe project-b0bf8b45-36f1-4568-966 \
--format="value(projectNumber)"
Example : 123456789012

RUN IAM binding:
# gcloud projects add-iam-policy-binding project-b0bf8b45-36f1-4568-966 \
--member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
--role="roles/storage.objectViewer"

Restart Depployment: 
# kubectl rollout restart deployment medical-tourism-blue -n blue 

Verify IAM Roles : 
# gcloud projects get-iam-policy project-b0bf8b45-36f1-4568-966 \
--flatten="bindings[].members" \
--filter="bindings.members:compute@developer.gserviceaccount.com" \
--format="table(bindings.role, bindings.members)"

You must see : 
roles/storage.objectViewer
roles/container.defaultNodeServiceAccount

________________________________________
5. curl Not Found Inside Container
Problem
Health test failed.
Root Cause
Minimal Docker image does not contain curl.
Better Solution
Use:
•	kubectl port-forward
Instead of:
•	kubectl exec curl
________________________________________
Important IAM Roles
Artifact Registry Reader
roles/artifactregistry.reader
Default Node Service Account Role
roles/container.defaultNodeServiceAccount
________________________________________
Very Important Lessons Learned
1. Always Verify IAM First
Before troubleshooting Kubernetes deeply:
•	check node permissions
•	check registry access
•	check service account roles
Most deployment issues were IAM-related.
________________________________________
2. Verify Image Exists Before Deployment
gcloud artifacts docker images list \
us-central1-docker.pkg.dev/PROJECT_ID/medical-tourisum
________________________________________
3. Kubernetes Debugging Order
Always follow this order:
1.	Verify image path
2.	Verify image exists
3.	Verify registry permissions
4.	Verify deployment rollout
5.	Verify pod events
6.	Verify application health
________________________________________
4. Avoid Mixing Variable Syntax
GitHub Actions
${{ github.sha }}
envsubst
${PROJECT_ID}
Both are different systems.
________________________________________
Common Mistakes I Faced
•	Used Project ID instead of Project Number
•	Missed IAM role assignments
•	Forgot to create Service
•	Mixed GitHub variables with envsubst syntax
•	Used legacy GCR instead of Artifact Registry
•	Tried debugging Kubernetes before verifying image existence
•	Deleted deployments unnecessarily during rollout
•	Assumed Pods automatically expose public URLs
________________________________________
Final Outcome
Successfully implemented:
•	CI/CD deployment pipeline
•	Docker image automation
•	Artifact Registry integration
•	GKE deployment
•	Blue deployment strategy
•	Kubernetes Service exposure
•	Automated GitHub Actions deployment flow



