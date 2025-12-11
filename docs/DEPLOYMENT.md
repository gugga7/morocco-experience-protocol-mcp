# Deployment Guide

**Deploy your own Morocco Experience Protocol MCP Server**

---

## Overview

This guide shows you how to deploy your own instance of the MEP MCP Server on Cloudflare Workers. The server is designed to be easily deployable with minimal configuration.

---

## Prerequisites

- **Node.js** 18+ installed
- **Cloudflare account** (free tier works)
- **Wrangler CLI** installed globally
- **Git** for cloning the repository

---

## Quick Deployment

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/gugga7/morocco-experience-protocol-mcp.git
cd morocco-experience-protocol-mcp

# Install dependencies
npm install

# Install Wrangler CLI (if not already installed)
npm install -g wrangler
```

### 2. Configure Cloudflare

```bash
# Login to Cloudflare
wrangler login

# Verify your account
wrangler whoami
```

### 3. Deploy

```bash
# Deploy to production
npm run deploy

# Or deploy to development
wrangler deploy --env development
```

**That's it!** Your MCP server will be deployed and accessible at:
`https://your-worker-name.your-subdomain.workers.dev`

---

## Configuration

### Environment Variables

Edit `wrangler.toml` to customize your deployment:

```toml
# Basic configuration
name = "my-mep-server"
main = "src/index.ts"
compatibility_date = "2024-12-01"

# Environment variables
[vars]
ENVIRONMENT = "production"

# Production environment
[env.production]
name = "my-mep-server-prod"
vars = { ENVIRONMENT = "production" }
```

### Custom Domain

To use a custom domain:

1. **Add domain to Cloudflare**:
   ```bash
   wrangler custom-domains add your-domain.com
   ```

2. **Update wrangler.toml**:
   ```toml
   [env.production]
   routes = [
     { pattern = "api.your-domain.com/*", custom_domain = true }
   ]
   ```

3. **Deploy**:
   ```bash
   wrangler deploy --env production
   ```

---

## Development

### Local Development

```bash
# Start development server
npm run dev

# Server will be available at:
# http://localhost:8787
```

### Testing

```bash
# Run tests
npm test

# Test the deployed server
curl https://your-worker.workers.dev/health
```

---

## Advanced Configuration

### Database Integration

To connect to a real database (Firebase, Supabase, etc.):

1. **Add environment variables**:
   ```toml
   [env.production.vars]
   DATABASE_URL = "your-database-url"
   API_KEY = "your-api-key"
   ```

2. **Add secrets** (for sensitive data):
   ```bash
   wrangler secret put DATABASE_PASSWORD
   wrangler secret put API_SECRET_KEY
   ```

3. **Update code** to use environment variables:
   ```typescript
   // In src/index.ts
   const dbUrl = env.DATABASE_URL;
   const apiKey = env.API_KEY;
   ```

### Custom Tools

To add your own MCP tools:

1. **Create tool file**:
   ```typescript
   // src/tools/my-custom-tool.ts
   export const myCustomTool = {
     name: 'myCustomTool',
     description: 'My custom tool description',
     inputSchema: {
       type: 'object',
       properties: {
         param1: { type: 'string' }
       }
     },
     handler: async (params: any) => {
       // Your tool logic here
       return {
         content: [{
           type: 'text',
           text: 'Tool response'
         }]
       };
     }
   };
   ```

2. **Register tool** in main handler:
   ```typescript
   // In src/index.ts
   import { myCustomTool } from './tools/my-custom-tool';
   
   // Add to tools/list response
   case 'tools/list':
     result = {
       tools: [
         // ... existing tools
         {
           name: myCustomTool.name,
           description: myCustomTool.description,
           inputSchema: myCustomTool.inputSchema
         }
       ]
     };
     break;
   
   // Handle tool calls
   case 'tools/call':
     if (params.name === 'myCustomTool') {
       result = await myCustomTool.handler(params.arguments);
     }
     break;
   ```

---

## Monitoring

### Health Checks

Your deployed server includes a health endpoint:

```bash
# Check server status
curl https://your-worker.workers.dev/health
```

### Cloudflare Analytics

View metrics in the Cloudflare dashboard:
- Request volume
- Response times
- Error rates
- Geographic distribution

### Custom Logging

Add logging to your deployment:

```typescript
// In src/index.ts
console.log('Request received:', {
  method: request.method,
  url: request.url,
  timestamp: new Date().toISOString()
});
```

View logs with:
```bash
wrangler tail
```

---

## Scaling

### Performance Optimization

1. **Enable caching**:
   ```typescript
   // Cache responses for 1 hour
   const response = new Response(data, {
     headers: {
       ...corsHeaders,
       'Cache-Control': 'public, max-age=3600'
     }
   });
   ```

2. **Use KV storage** for data caching:
   ```toml
   # In wrangler.toml
   [[kv_namespaces]]
   binding = "CACHE"
   id = "your-kv-namespace-id"
   ```

3. **Optimize bundle size**:
   ```bash
   # Analyze bundle
   wrangler deploy --dry-run --outdir dist
   ```

### Rate Limiting

Add rate limiting for production:

```typescript
// Simple rate limiting example
const rateLimiter = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(ip) || [];
  
  // Remove old requests (older than 1 minute)
  const recent = requests.filter((time: number) => now - time < 60000);
  
  if (recent.length >= 100) { // 100 requests per minute
    return false;
  }
  
  recent.push(now);
  rateLimiter.set(ip, recent);
  return true;
}
```

---

## Security

### HTTPS Only

Cloudflare Workers automatically provide HTTPS. To enforce it:

```typescript
// Redirect HTTP to HTTPS
if (url.protocol === 'http:') {
  return Response.redirect(url.toString().replace('http:', 'https:'), 301);
}
```

### Input Validation

Always validate inputs:

```typescript
function validateMCPRequest(request: any): boolean {
  return (
    request.jsonrpc === '2.0' &&
    typeof request.method === 'string' &&
    (request.id === null || typeof request.id === 'string' || typeof request.id === 'number')
  );
}
```

### CORS Configuration

Customize CORS for production:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://your-allowed-domain.com' 
    : '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

---

## Troubleshooting

### Common Issues

**1. Deployment fails**:
```bash
# Check Wrangler configuration
wrangler whoami
wrangler deploy --dry-run
```

**2. Server not responding**:
```bash
# Check deployment status
wrangler deployments list
wrangler tail
```

**3. CORS errors**:
- Ensure CORS headers are set correctly
- Check browser developer tools for specific errors

**4. Tool not found**:
- Verify tool is registered in `tools/list`
- Check tool name matches exactly

### Debug Mode

Enable debug logging:

```typescript
const DEBUG = env.ENVIRONMENT === 'development';

if (DEBUG) {
  console.log('Debug info:', { method, params });
}
```

---

## Production Checklist

Before deploying to production:

- [ ] **Custom domain** configured
- [ ] **Environment variables** set
- [ ] **Secrets** configured for sensitive data
- [ ] **Rate limiting** implemented
- [ ] **Error handling** comprehensive
- [ ] **Logging** configured
- [ ] **Health checks** working
- [ ] **CORS** properly configured
- [ ] **Input validation** implemented
- [ ] **Performance** optimized

---

## Support

- **Cloudflare Workers Docs**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers/)
- **Wrangler CLI Docs**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **GitHub Issues**: [Report deployment issues](https://github.com/gugga7/morocco-experience-protocol-mcp/issues)

---

**Happy deploying! 🚀**