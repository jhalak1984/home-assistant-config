# Jhalak's Home Assistant

My space for sharing Home Assistant automations, dashboards and lessons from my smart home and homelab.

This repository starts as a collection of examples and documentation. It is not a complete Home Assistant configuration and should not be copied over a running installation.

## What's here

| Folder | Purpose |
| --- | --- |
| `automations/` | Automations I have reviewed and chosen to share |
| `scripts/` | Reusable Home Assistant scripts |
| `blueprints/` | Reusable automation blueprints |
| `dashboards/` | Dashboard YAML and setup notes |
| `screenshots/` | Screenshots with personal details removed |
| `docs/` | Device notes, project write-ups and setup documentation |

## My setup

Fill these in with details you want to share:

- Home Assistant installation: to be added
- Host hardware: to be added
- Radios and protocols: to be added
- Main integrations: to be added
- Favourite automation: to be added

## Start sharing

1. Create a **private** GitHub repository called `home-assistant-config`. Leave GitHub's README, licence and .gitignore options unchecked because this starter supplies its own files.
2. Extract this starter ZIP into a separate folder outside your website project. Upload its contents, including the hidden `.gitignore`, through GitHub's **Add file → Upload files** option, or use Git locally.
3. Export or copy only the individual YAML examples you intend to share. Keep your running Home Assistant configuration separate from this repository.
4. Replace passwords, tokens, addresses and identifying values with placeholders. Review screenshots for names, locations, camera images and notification contents.
5. Review every file before committing. `.gitignore` does not remove secrets from files or protect files already tracked by Git; browser uploads also need manual review.
6. When you are happy with the contents, you can make the repository public. Add a description and topics such as `home-assistant`, `smart-home` and `homelab`.

If you prefer Git, run these commands from the extracted starter folder after creating the empty repository:

```sh
git init
git add .
git status
# Inspect the staged changes before committing:
git diff --cached
git commit -m "Add Home Assistant repository starter"
git branch -M main
git remote add origin https://github.com/jhalak1984/home-assistant-config.git
git push -u origin main
```

## Using examples

The YAML example files use a `.yaml.example` suffix so Home Assistant will not load them automatically. Replace example entities with your own, review the behaviour, and copy only the relevant content into your configuration or editor. Check the configuration in Home Assistant before applying changes.

## Personal information

Do not publish `secrets.yaml`, credentials, `.storage`, databases, backups, certificates, private keys or raw logs. `configuration.yaml` and `automations.yaml` are excluded by default: share reviewed extracts instead. If a credential is ever committed, revoke or rotate it; deleting the file alone does not remove it from Git history.

## Licence

No licence is selected yet. Choose one before inviting others to reuse your original work, and retain the licences and attribution of any examples copied from other projects.
