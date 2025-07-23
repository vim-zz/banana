include "root" {
  path = find_in_parent_folders("root.hcl")
}


include "dependencies" {
  path = find_in_parent_folders("dependencies.hcl")
}


locals {
  service = read_terragrunt_config(find_in_parent_folders("service.hcl")).locals
}


terraform {
  source = "${get_repo_root()}/modules/vault-database"
}


dependency "rds" {
  config_path = "../rds"
  mock_outputs = {
    engine  = "mariadb"
    address = "dummy-endpoint.rds.amazonaws.com"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "fmt", "init", "plan", "providers", "show", "refresh"]
}


inputs = {
  domain_name      = local.service.account.vault_domain_name
  env              = local.service.account.env
  azuread_oidc     = dependency.vault_azuread.outputs.accessor
  timestamp        = timestamp()
  rotate_on_create = true


  db = {
    username      = "vault"
    password      = "vault"
    name          = local.service.name
    endpoint      = dependency.rds.outputs.address
    engine        = dependency.rds.outputs.engine
    database_name = local.service.name
  }


  jits = [
    {
      user        = "user_alpha"
      default_ttl = 60 * 60 * 24
      max_ttl     = 60 * 60 * 24 * 30
      type        = "temporary"
      expires     = "2026-04-01"
      access = [
        {
          tables     = ["*"]
          schema     = "schema_one"
          privileges = "rw"
        }
      ]
    },
    {
      user        = "user_beta"
      default_ttl = 60 * 60 * 6
      max_ttl     = 60 * 60 * 24 * 7
      type        = "temporary"
      expires     = "2025-12-31"
      access = [
        {
          tables     = ["orders", "transactions"]
          schema     = "sales"
          privileges = "ro"
        }
      ]
    },
    {
      user        = "user_gamma"
      default_ttl = 60 * 60 * 12
      max_ttl     = 60 * 60 * 24 * 14
      type        = "temporary"
      expires     = "2025-10-15"
      access = [
        {
          tables     = ["*"]
          schema     = "analytics"
          privileges = "rw"
        }
      ]
    },
    {
      user        = "user_delta"
      default_ttl = 60 * 60 * 8
      max_ttl     = 60 * 60 * 24 * 10
      type        = "temporary"
      expires     = "2026-01-01"
      access = [
        {
          tables     = ["logs", "events"]
          schema     = "monitoring"
          privileges = "ro"
        }
      ]
    }
  ]
}


