# Step 0 
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Service Account"

# Step-1

# TODO: replace ${PROJECT_ID} with your value below.

gcloud iam workload-identity-pools create "github" \
  --project="project-b0bf8b45-36f1-4568-966" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Step-2
# TODO: replace ${PROJECT_ID} and ${GITHUB_ORG} with your values below.

gcloud iam workload-identity-pools providers create-oidc "health-tourism-actions" \
  --project="project-b0bf8b45-36f1-4568-966" \
  --location="global" \
  --workload-identity-pool="github" \
  --display-name="My GitHub repo Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner == 'Balajipublic008'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Step-3 :
# TODO: replace ${PROJECT_ID} with your value below.

gcloud iam workload-identity-pools providers describe "health-tourism-actions" \
  --project="project-b0bf8b45-36f1-4568-966" \
  --location="global" \
  --workload-identity-pool="github" \
  --format="value(name)"

# projects/223480410234/locations/global/workloadIdentityPools/github/providers/health-tourism-actions