# API Reference

**Morocco Experience Protocol MCP Server API Documentation**

---

## Overview

The MEP MCP Server implements the Model Context Protocol (MCP) 2025-06-18 specification, providing AI assistants with access to Morocco tourism data through standardized JSON-RPC 2.0 endpoints.

**Base URL**: `https://mep-mcp-server-production.info6625.workers.dev`

---

## Endpoints

### Health Check

**GET** `/health`

Returns server status and capabilities.

**Response**:
```json
{
  "status": "healthy",
  "service": "MEP MCP Server",
  "version": "1.0.0",
  "timestamp": "2025-12-11T10:30:00.000Z",
  "environment": "production",
  "protocol": "Model Context Protocol",
  "capabilities": ["health-check", "mcp-protocol", "cors-enabled"],
  "endpoints": {
    "health": "/health",
    "mcp": "/sse"
  }
}
```

### MCP Protocol

**POST** `/sse`

Main MCP protocol endpoint for JSON-RPC 2.0 communication.

**Headers**:
```
Content-Type: application/json
```

---

## MCP Methods

### Initialize

Initializes the MCP session and returns server capabilities.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "id": 1,
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": {},
    "clientInfo": {
      "name": "Claude Desktop",
      "version": "1.0.0"
    }
  }
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2025-06-18",
    "capabilities": {
      "tools": {
        "listChanged": false
      },
      "resources": {
        "subscribe": false,
        "listChanged": false
      }
    },
    "serverInfo": {
      "name": "MEP MCP Server",
      "version": "1.0.0",
      "description": "Morocco Experience Protocol - AI-accessible tourism data"
    }
  }
}
```

### List Tools

Returns available tools for tourism data access.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "id": 2
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "searchExperiences",
        "description": "Search for tourism experiences in Morocco",
        "inputSchema": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Search query for experiences"
            },
            "location": {
              "type": "string",
              "description": "Location filter (city or region)"
            }
          }
        }
      }
    ]
  }
}
```

### Call Tool

Executes a specific tool with provided parameters.

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "id": 3,
  "params": {
    "name": "searchExperiences",
    "arguments": {
      "query": "cooking class",
      "location": "Marrakech"
    }
  }
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 5 cooking experiences in Marrakech:\n\n1. Traditional Tagine Workshop\n   - Location: Medina, Marrakech\n   - Price: 350 MAD per person\n   - Duration: 3 hours\n   - Rating: 4.8/5\n\n2. Riad Cooking Experience\n   - Location: Gueliz, Marrakech\n   - Price: 450 MAD per person\n   - Duration: 4 hours\n   - Rating: 4.9/5\n\n..."
      }
    ]
  }
}
```

---

## Available Tools

### searchExperiences

Search for tourism experiences in Morocco.

**Parameters**:
- `query` (string): Search terms (e.g., "cooking", "cultural", "adventure")
- `location` (string, optional): City or region filter

**Returns**: List of matching experiences with details including:
- Name and description
- Location and meeting point
- Pricing information
- Duration and schedule
- Operator information
- Ratings and reviews

**Example Usage**:
```javascript
// Search for cooking classes in Marrakech
{
  "name": "searchExperiences",
  "arguments": {
    "query": "cooking class",
    "location": "Marrakech"
  }
}

// Search for cultural experiences anywhere
{
  "name": "searchExperiences", 
  "arguments": {
    "query": "cultural tour"
  }
}
```

---

## Error Handling

The server returns standard JSON-RPC 2.0 error responses:

### Parse Error
```json
{
  "jsonrpc": "2.0",
  "id": null,
  "error": {
    "code": -32700,
    "message": "Parse error - Invalid JSON"
  }
}
```

### Method Not Found
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Method not found: invalidMethod"
  }
}
```

### Internal Error
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32603,
    "message": "Internal error"
  }
}
```

---

## CORS Support

The server includes full CORS support for browser-based AI clients:

**Headers**:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

**Preflight Requests**: `OPTIONS` requests are handled automatically.

---

## Rate Limiting

Currently no rate limiting is enforced, but reasonable usage is expected:
- Maximum 100 requests per minute per IP
- Maximum 10 concurrent connections
- Request timeout: 30 seconds

---

## Authentication

Currently no authentication is required. The server is publicly accessible for AI integration testing and development.

---

## Examples

### cURL Examples

**Health Check**:
```bash
curl https://mep-mcp-server-production.info6625.workers.dev/health
```

**Initialize MCP**:
```bash
curl -X POST https://mep-mcp-server-production.info6625.workers.dev/sse \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"initialize","id":1}'
```

**List Tools**:
```bash
curl -X POST https://mep-mcp-server-production.info6625.workers.dev/sse \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":2}'
```

### JavaScript Example

```javascript
async function callMEPServer(method, params = {}) {
  const response = await fetch('https://mep-mcp-server-production.info6625.workers.dev/sse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      id: Date.now(),
      params: params
    })
  });
  
  return await response.json();
}

// Initialize
const initResult = await callMEPServer('initialize');

// List tools
const toolsResult = await callMEPServer('tools/list');

// Search experiences
const searchResult = await callMEPServer('tools/call', {
  name: 'searchExperiences',
  arguments: {
    query: 'cooking class',
    location: 'Marrakech'
  }
});
```

---

## Status Codes

- **200 OK**: Successful request
- **400 Bad Request**: Invalid JSON or malformed request
- **404 Not Found**: Unknown method
- **405 Method Not Allowed**: Wrong HTTP method
- **500 Internal Server Error**: Server error

---

## Support

- **GitHub Issues**: [Report problems](https://github.com/gugga7/morocco-experience-protocol-mcp/issues)
- **Server Status**: [Check health](https://mep-mcp-server-production.info6625.workers.dev/health)
- **Documentation**: [Full docs](https://docs.cometomorocco.com)