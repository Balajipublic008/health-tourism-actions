# refernce website: https://github.com/google-github-actions/auth#indirect-wif 

1. Click here to show detailed instructions for configuring GitHub authentication to Google Cloud via a Workload Identity Federation through a Service Account.
These instructions use the gcloud command-line tool.

1.1 (Optional) Create a Google Cloud Service Account. If you already have a Service Account, take note of the email address and skip this step.

# TODO: replace project-b0bf8b45-36f1-4568-966 with your value below.

gcloud iam service-accounts create "health-tour" \
  --project "project-b0bf8b45-36f1-4568-966"



2. Create a Workload Identity Pool:

# TODO: replace project-b0bf8b45-36f1-4568-966 with your value below.

 gcloud iam workload-identity-pools create "health-tour-github-pool" \
 --project="project-b0bf8b45-36f1-4568-966" \
 --location="global" \
 --display-name="GitHub Health pool"


Created workload identity pool [health-tour-github-pool].

3. Get the full ID of the Workload Identity Pool:

# TODO: replace project-b0bf8b45-36f1-4568-966 with your value below.

    gcloud iam workload-identity-pools describe "health-tour-github-pool" \
    --project="project-b0bf8b45-36f1-4568-966" \
    --location="global" \
    --format="value(name)"

This value should be of the format:

projects/223480410234/locations/global/workloadIdentityPools/health-tour-github-pool 

4. Create a Workload Identity Provider in that pool:

🛑 CAUTION! Always add an Attribute Condition to restrict entry into the Workload Identity Pool. You can further restrict access in IAM Bindings, but always add a basic condition that restricts admission into the pool. A good default option is to restrict admission based on your GitHub organization as demonstrated below. Please see the security considerations for more details.

# TODO: replace project-b0bf8b45-36f1-4568-966 and Balajipublic008 with your values below.

gcloud iam workload-identity-pools providers create-oidc "health-tour-india" \
  --project="project-b0bf8b45-36f1-4568-966" \
  --location="global" \
  --workload-identity-pool="health-tour-github-pool" \
  --display-name="GitHub health tour provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner == 'Balajipublic008'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

resulting message : 

Created workload identity pool provider [health-tour-india].

❗️ IMPORTANT You must map any claims in the incoming token to attributes before you can assert on those attributes in a CEL expression or IAM policy!

5. Allow authentications from the Workload Identity Pool to your Google Cloud Service Account.

# TODO: replace project-b0bf8b45-36f1-4568-966, projects/223480410234/locations/global/workloadIdentityPools/health-tour-github-pool, and Balajipublic008/health-tourism-actions
# with your values below.
#
# Balajipublic008/health-tourism-actions is the full repo name including the parent GitHub organization,
# such as "my-org/my-repo".
#
# projects/223480410234/locations/global/workloadIdentityPools/health-tour-github-pool is the full pool id, such as
# "projects/123456789/locations/global/workloadIdentityPools/github".

    gcloud iam service-accounts add-iam-policy-binding "healt-tour@project-b0bf8b45-36f1-4568-966.iam.gserviceaccount.com" \
    --project="project-b0bf8b45-36f1-4568-966" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/223480410234/locations/global/workloadIdentityPools/health-tour-github-pool/attribute.repository/Balajipublic008/health-tourism-actions"

Result : 
Updated IAM policy for serviceAccount [healt-tour@project-b0bf8b45-36f1-4568-966.iam.gserviceaccount.com].
bindings:
- members:
  - principalSet://iam.googleapis.com/projects/223480410234/locations/global/workloadIdentityPools/health-tour-github-pool/attribute.repository/Balajipublic008/health-tourism-actions
  role: roles/iam.workloadIdentityUser
etag: BwZQD3CPZP0=
version: 1

Review the GitHub documentation for a complete list of options and values. This GitHub repository does not seek to enumerate every possible combination.

Extract the Workload Identity Provider resource name:

# TODO: replace project-b0bf8b45-36f1-4568-966 with your value below.

gcloud iam workload-identity-pools providers describe "Balajipublic008" \
  --project="project-b0bf8b45-36f1-4568-966" \
  --location="global" \
  --workload-identity-pool="health-tour-github-pool" \
  --format="value(name)"

Result : projects/223480410234/locations/global/workloadIdentityPools/github/providers/my-repo
 
Use this value as the workload_identity_provider value in the GitHub Actions YAML:

- uses: 'google-github-actions/auth@v3'
  with:
    service_account: '...' # my-service-account@my-project.iam.gserviceaccount.com
    workload_identity_provider: '...' # "projects/123456789/locations/global/workloadIdentityPools/github/providers/my-repo"

7. As needed, grant the Google Cloud Service Account permissions to access Google Cloud resources. This step varies by use case. The following example shows granting access to a secret in Google Secret Manager.

# TODO: replace project-b0bf8b45-36f1-4568-966 with your value below.

gcloud secrets my-secret "health-tour-secret" \ --project="project-b0bf8b45-36f1-4568-966" \ --role="roles/secretmanager.secretAccessor" \ --member="serviceAccount:health-tour@project-b0bf8b45-36f1-4568-966.iam.gserviceaccount.com"