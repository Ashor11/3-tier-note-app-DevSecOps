# Azure DevOps Agent Setup with Ansible

This directory contains Ansible playbooks to set up Azure DevOps agents with all the necessary dependencies for the note-app-DevSecOps project.

## Files

- `Playbook.yml`: Main playbook that installs all dependencies and tools
- `inventory`: Simple inventory file that targets localhost
- `ansible.cfg`: Ansible configuration file

## Prerequisites

1. Ansible installed on your control machine
2. Sudo privileges on the agent machine

## Usage

### 1. Run the playbook in Azure DevOps pipeline

The playbook is configured to run on localhost in the Azure DevOps pipeline:

```yaml
- script: |
    ansible-playbook -i ansible/inventory ansible/Playbook.yml
  workingDirectory: '$(System.DefaultWorkingDirectory)'
  displayName: 'Run Ansible Playbook to install dependencies'
```

### 2. For manual execution

```bash
ansible-playbook -i inventory Playbook.yml
```

## What gets installed

The playbook installs and configures:

- Python 3.9 with pip and required packages (Flask, pytest, flake8, pytest-cov)
- Java 17 (for SonarQube)
- Docker CE with proper permissions
- Helm 3
- AWS CLI v2
- kubectl
- JFrog CLI
- Node.js 14
- Azure CLI

## Docker Installation

The playbook includes a simplified Docker installation that:

1. Installs Docker using dnf/yum
2. Sets proper permissions on the Docker socket
3. Enables and starts the Docker service
4. Adds the current user to the Docker group
5. Verifies the installation by running a test container

## Customization

You can modify the variables at the top of the playbook to change versions of installed software:

```yaml
vars:
  python_version: "python3.9"
  java_version: "java-17-openjdk-devel"
  docker_compose_version: "1.29.2"
```