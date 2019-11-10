provider "google" {
  credentials = file("../creds/cloudKeys.json")
  project = "bot-host-253711"
  region = "us-west1"
  zone = "us-west1-a"
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
    metadata_startup_script = templatefile("./provisioning.sh", {
      PASSWORD = var.DOCKER_PASSWORD
    })
  metadata = {
    sshKeys = "barrett370:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC750jH3Jmfy4vl1Z2EEGsf8HCSRnmIDkMEkVAx4kj6+T+9MDsuP0z2nJNiG4u4LiiSlhPQTfBo/lh40ct7FTy4L4uroH5QFKjogSZhnP5JP2UnuT4TuikBepPhNMCS0nxW4GWFPE94KEEa1CQOfByvVIyzKc0JlBH0Gy8EyIDUQF8YdR+LoD8Eyz3ZlL+ujhYxE37Xw8J77dPKZHldLS5Iv2zqKgY++IceQFhSLYNY4Qo74wwkL6YeOpj3XxScbTYl2oKf3f/FG9DkU0aiV0MMp/8q0JwPgNIhs+Z/ENBRaRryKs3KgmIRWG3rUtqhC8BQ+5o19Ln9VpcBbMPzUIQh sam@pop-os"
  }
  network_interface {
    network = "default"
    access_config {
      network_tier = "STANDARD"
    }
  }
}
