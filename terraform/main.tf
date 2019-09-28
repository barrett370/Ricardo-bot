provider "google" {
  credentials = file("../creds/cloudKeys.json")
  project = "bot-host-253711"
  region = "europe-west2"
  zone = "europe-west2-a"
}

data "google_compute_image" "search" {
  family = "cos-stable"
  project = "gce-uefi-images"

}

resource "google_compute_instance" "vm_instance" {
  name = "ricardo-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = data.google_compute_image.search.self_link
    }
  }
  metadata = {
    sshKeys = "barrett370:${file("~/.ssh/id_rsa.pub")}"

    startup-script = <<SCRIPT
            docker login -u "gitlab-gcloud-deployment" -p "yK6Z8hU_pQTyshes5avX" registry.gitlab.com
            docker run registry.gitlab.com/chasbob/ricardo-bot:latest
        SCRIPT

  }
  network_interface {
    network = "default"
    access_config {
    }
  }
}
