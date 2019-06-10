# FigMD
Terraform code for FigMD GCP project

# Prerequisites
# Required permissions:

Account which you are using for terraform running must have permissions:

#### Organization level:
roles/billing.user
#### Parent folder level:
roles/owner

roles/resourcemanager.folderAdmin

roles/resourcemanager.projectCreator

roles/resourcemanager.projectDeleter

roles/compute.xpnAdmin

##### Install terraform

```bash
sudo apt update && sudo apt install -y unzip
wget https://releases.hashicorp.com/terraform/0.11.11/terraform_0.11.11_linux_amd64.zip
unzip terraform_0.11.11_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```
##### Install terragrunt

```bash
wget https://github.com/gruntwork-io/terragrunt/releases/download/v0.17.3/terragrunt_linux_amd64
sudo mv terragrunt_linux_amd64 /usr/local/bin/terragrunt
chmod +x /usr/local/bin/terragrunt
```

##### Prepare for environment setup

Inside the env folder you can create sub-folders for each environment.

```
.
├── dev
│   └─ shared_project ` CloudSQL etc `
|   └─ development_tenant1
├── prod
|   └─ shared_project ` CloudSQL etc `
|   └─ tenant1
|   └─ tenant1
```
Inside the environment you should have shared_project folder and as much tenant folders as you need.
You can copy and paste tenant with different name.

##### Create environment
###### Install Shared project
1) Go to shared_project folder and edit general.tfvars file.

You have to specify this parameters:

```hcl
region             = "us-east1"
billing_account    = "01F0F1-639F5C-E1CE70"
org_id             = "377579940381"
```
2) Specify environment variables:

```bash
 export TF_VAR_bucket=your-terraform-state-bucket-in-admin-project 
```

3) From shared_project folder run:
```bash
terragrunt apply
```
Wait until shared project will set up.

4) Go to tenant folder:

Edit terraform.tfvars file. It contains variables for this tenant.
Documentation for each variable you can find in modules/infra-modules/ 
```bash
terragrunt apply 
```

To destroy tenant, you can use 
```bash
terragrunt destroy -parallelism=1
```

