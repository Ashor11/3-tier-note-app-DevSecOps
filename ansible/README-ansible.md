# Azure DevOps Agent Setup with Ansible

This directory contains Ansible playbooks to set up Azure DevOps agents with all the necessary dependencies for the note-app-DevSecOps project.

## Files

- `azure_devops_setup.yml`: Main playbook that installs all dependencies and tools
- `inventory.ini`: Inventory file where you define your target hosts
- `ansible.cfg`: Ansible configuration file

## Prerequisites

1. Ansible installed on your control machine
2. SSH access to target hosts
3. Sudo privileges on target hosts

## Usage

### 1. Configure your inventory

Edit the `inventory.ini` file to add your target hosts:

```ini
[azure_devops_agents]
agent1 ansible_host=192.168.1.100 ansible_user=ec2-user
```

### 2. Run the playbook

```bash
ansible-playbook azure_devops_setup.yml
```

### 3. For local testing

```bash
ansible-playbook azure_devops_setup.yml -c local -i localhost, --become
```

## What gets installed

The playbook installs and configures:

- Python 3.9 with pip and required packages (Flask, pytest, flake8, pytest-cov)
- Java 17 (for SonarQube)
- Docker CE
- Helm 3
- AWS CLI v2
- SonarQube Scanner
- kubectl
- JFrog CLI

## Azure DevOps Agent Configuration

The playbook includes commented sections for Azure DevOps agent setup. To use this:

1. Uncomment the Azure DevOps agent setup section in `azure_devops_setup.yml`
2. Replace `YOUR_ORGANIZATION` with your Azure DevOps organization name
3. Replace `YOUR_PAT_TOKEN` with a Personal Access Token that has the appropriate permissions

## Customization

You can modify the variables at the top of the playbook to change versions of installed software:

```yaml
vars:
  java_version: "17"
  python_version: "3.9"
  docker_compose_version: "1.29.2"
  helm_version: "3.9.0"
  sonar_scanner_version: "4.7.0.2747"
```