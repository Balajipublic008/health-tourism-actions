# Terraform configuration for GCP Free Tier Infrastructure
# This creates a VPC, 2 Subnets, and a Free Tier eligible GKE Cluster

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.25.0"
    }
  }
}

# Replace with your GCP Project ID
variable "project_id" {
  description = "The GCP Project ID"
  type        = string
  default     = "project-b0bf8b45-36f1-4568-966"
}

# Free tier eligible regions: us-west1, us-central1, us-east1
variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. VPC Network
resource "google_compute_network" "vpc_network" {
  name                    = "med-tour-vpc"
  auto_create_subnetworks = false
}

# 2. Subnet 1 (e.g., for Blue environment or general nodes)
resource "google_compute_subnetwork" "subnet_1" {
  name          = "med-tour-subnet-blue"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

# 3. Subnet 2 (e.g., for Green environment or database/internal services)
resource "google_compute_subnetwork" "subnet_2" {
  name          = "med-tour-subnet-green"
  ip_cidr_range = "10.0.2.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

# 4. GKE Cluster (Zonal cluster is free of management fee in GCP Free Tier)
resource "google_container_cluster" "primary" {
  name     = "med-tour-cluster"
  location = "${var.region}-a" # Zonal cluster
  network  = google_compute_network.vpc_network.name
  subnetwork = google_compute_subnetwork.subnet_1.name

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
}

# 5. Node Pool (Using e2-micro which is eligible for GCP Free Tier compute)
resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-node-pool"
  location   = "${var.region}-a"
  cluster    = google_container_cluster.primary.name
  node_count = 2 # Keep it small for free tier

  node_config {
    machine_type = "e2-micro" # GCP Free Tier eligible
    disk_size_gb = 30         # Standard persistent disk (30GB is free tier limit)
    disk_type    = "pd-standard"

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only"
    ]
  }
}
