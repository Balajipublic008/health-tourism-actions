# Domain Name Integration Guide (GCP & Kubernetes)

This guide explains how to link your custom domain name (e.g., `www.yourdomain.com`) to your Medical Tourism application running on Google Kubernetes Engine (GKE).

## Prerequisites
1. You have purchased a domain name from a registrar (GoDaddy, Namecheap, Google Domains, etc.).
2. Your application is deployed to GKE using the provided GitHub Actions pipeline.
3. The `medical-tourism-service` (LoadBalancer) is active in your cluster.

---

## Step 1: Get Your GCP Load Balancer IP Address

When you deploy the `service-active.yaml` file, GCP automatically provisions an External Network Load Balancer and assigns it a public IP address.

1. Open your terminal (or Google Cloud Shell).
2. Ensure you are connected to your GKE cluster.
3. Run the following command:
   ```bash
   kubectl get service medical-tourism-service
   ```
4. Look under the **EXTERNAL-IP** column. It might say `<pending>` for a minute or two. Once an IP appears (e.g., `34.120.45.67`), copy it.

---

## Step 2: Update Your Domain's DNS Records

Log in to the dashboard of the company where you bought your domain (your DNS provider).

1. Navigate to the **DNS Management** or **DNS Settings** page.
2. Create an **A Record** to point your domain to the GCP IP address:
   - **Type:** `A`
   - **Name/Host:** `@` (for the root domain, e.g., `yourdomain.com`)
   - **Value/Points to:** Paste the `EXTERNAL-IP` you copied in Step 1.
   - **TTL:** `Auto` or `3600` (1 hour)
3. Create a **CNAME Record** for the `www` subdomain:
   - **Type:** `CNAME`
   - **Name/Host:** `www`
   - **Value/Points to:** `yourdomain.com`

*Note: DNS changes can take anywhere from 15 minutes to 48 hours to propagate globally.*

---

## Step 3: Enable HTTPS / SSL (Recommended)

To secure your site with `https://`, you should use Google-managed SSL certificates. Since you are using a standard LoadBalancer service, the easiest way to do this in GKE is by upgrading to an **Ingress** resource.

### 1. Create a Managed Certificate Manifest (`managed-cert.yaml`)
```yaml
apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: medical-tourism-cert
spec:
  domains:
    - yourdomain.com
    - www.yourdomain.com
```

### 2. Change your Service to NodePort
Update `k8s/blue-green/service-active.yaml` to change `type: LoadBalancer` to `type: NodePort`.

### 3. Create an Ingress Manifest (`ingress.yaml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: medical-tourism-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: "medical-tourism-ip"
    networking.gke.io/managed-certificates: "medical-tourism-cert"
spec:
  defaultBackend:
    service:
      name: medical-tourism-service
      port:
        number: 80
```

### 4. Apply the changes
```bash
kubectl apply -f managed-cert.yaml
kubectl apply -f k8s/blue-green/service-active.yaml
kubectl apply -f ingress.yaml
```

Google Cloud will now automatically provision, attach, and renew a free SSL certificate for your domain! It may take up to 30-60 minutes for the certificate to become active.
