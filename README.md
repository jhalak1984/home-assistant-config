# Main dashboard

A sanitised copy of Jhalak's dashboard export, covering smart home controls, solar and energy, EV charging, homelab monitoring, storage, network services and media.

## Before using

This is a dashboard example, not a complete Home Assistant configuration. It does not install integrations or create entities. Replace entity IDs with those from your own installation. Back up your current dashboard and use a separate test dashboard when importing this example.

The shared copy replaces location labels, map coordinates, utility meter identifiers, internal IP addresses, a bus-stop entity and instance-specific uploaded vehicle image paths. Some device names and room labels remain to explain the layout. Review whether you want those details public before uploading. The original export was not changed.

## Dependencies

The export references the following custom card/layout types. Install the matching frontend resources before using the relevant cards; this list is extracted from the export and does not verify compatibility or installed versions:

- `custom:alarmo-card`
- `custom:apexcharts-card`
- `custom:bar-card`
- `custom:button-card`
- `custom:charger-card`
- `custom:config-template-card`
- `custom:cover-position-preset-row`
- `custom:fr24-card`
- `custom:hui-entities-card`
- `custom:hui-vertical-stack-card`
- `custom:mail-and-packages-card`
- `custom:masonry-layout`
- `custom:mini-graph-card`
- `custom:mini-media-player`
- `custom:power-flow-card-plus`
- `custom:restriction-card`
- `custom:sankey-chart`
- `custom:shutter-card`
- `custom:stack-in-card`
- `custom:ultra-vehicle-card`
- `custom:upcoming-media-card`
- `custom:uptime-card`
- `custom:vertical-stack-in-card`
- `custom:weather-chart-card`
- `custom:webrtc-camera`

It also references `kiosk_mode`, `card_mod` styling and the `montserrat` theme. Their resources/theme must be supplied separately or the associated settings removed.

## Images

The export references these `/local/` paths. Images were not included in the supplied YAML. Provide your own images in Home Assistant's `www` folder, or replace/remove the references. Only publish images you have permission to share.

- `/local/HA.png`
- `/local/Proxmox.png`
- `/local/apc.png`
- `/local/bluetop.png`
- `/local/browntop.png`
- `/local/canon.png`
- `/local/esxi.png`
- `/local/greentop.png`
- `/local/ohme1.png`
- `/local/omv.png`
- `/local/pfsense.png`
- `/local/space.png`
- `/local/truenas.png`
- `/local/whitetop.png`
- `/local/example-vehicle.png` (replacement for instance-specific vehicle uploads)

## Upload to GitHub

Upload `main-dashboard.yaml` and this README into your repository's `dashboards` folder. Keep the Home Assistant starter and its ZIP outside your public website deployment bundle.

No live Home Assistant rendering or configuration validation has been performed.
