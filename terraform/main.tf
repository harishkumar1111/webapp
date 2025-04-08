provider "local" {}

resource "local_file" "example" {
    filename = "${path.module}/example.txt"
    content  = "This is an example file created using the local provider in Terraform."
}