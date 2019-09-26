provider "google" {
  project = "bot-host-253711"
  region  = "europe-west2"
  zone    = "europe-west2-a"
}

data "google_compute_image" "search" {
  family  = "cos-stable"
  project = "gce-uefi-images"

}

resource "google_compute_instance" "vm_instance" {
  name         = "ricardo-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = data.google_compute_image.search.self_link
    }
  }
  metadata_startup_script = "docker run registry.gitlab.com/chasbob/ricardo-bot:latest"
  network_interface {
    # A default network is created for all GCP projects
    network = "default"
    access_config {
    }
  }
}
