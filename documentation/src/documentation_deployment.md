# Deployment

## Build static html, javascript, and css pages
1. cd `$PROJECT_ROOT/documentation/`
2. Build static deployable code
   -  `mdbook build`
1. Code is outputted in `book/`

## Deployment Options

### Web Server
- Nginx
- Apache
- Caddy
- Haproxy
- Traefik


### Serverless
- [AWS S3](./documentation_deployment_aws.md)
- [BlackBlaze + Cloudflare](./documentation_deployment_blackblaze.md)