# Claude Desktop Setup Guide

**Add Morocco Experience Protocol to Claude Desktop in 5 minutes**

---

## 🎯 Overview

This guide shows you how to integrate the Morocco Experience Protocol (MEP) MCP server with Claude Desktop, giving Claude access to real Morocco tourism data.

**After setup, you can ask Claude**:
- "Find cooking experiences in Marrakech"
- "What cultural activities are available in Fes?"
- "Show me adventure tours in the Atlas Mountains"
- "Find verified tour operators in Casablanca"

---

## 📋 Prerequisites

- **Claude Desktop** installed ([Download here](https://claude.ai/download))
- **Node.js** 18+ installed ([Download here](https://nodejs.org/))
- **5 minutes** of your time

---

## 🚀 Step-by-Step Setup

### Step 1: Find Your Claude Config File

**On Mac**:
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**On Windows**:
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

**On Linux**:
```bash
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Edit the Config File

Open the config file in your text editor and add the MEP server:

```json
{
  "mcpServers": {
    "morocco-experience-protocol": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-fetch", 
        "https://mep-mcp-server-production.info6625.workers.dev/sse"
      ]
    }
  }
}
```

**If you already have other MCP servers**, add MEP to the existing config:

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "existing-command",
      "args": ["existing-args"]
    },
    "morocco-experience-protocol": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-fetch", 
        "https://mep-mcp-server-production.info6625.workers.dev/sse"
      ]
    }
  }
}
```

### Step 3: Restart Claude Desktop

1. **Quit Claude Desktop** completely
2. **Reopen Claude Desktop**
3. Wait for it to fully load

### Step 4: Test the Integration

Try these example queries in Claude:

#### **Basic Search**:
```
Find cooking experiences in Marrakech
```

#### **Specific Queries**:
```
What cultural activities are available in Fes?
Show me adventure tours in the Atlas Mountains
Find verified tour operators in Casablanca
```

#### **Detailed Requests**:
```
I want to learn traditional Moroccan cooking. What experiences are available in Marrakech? Include pricing and contact information.
```

---

## ✅ Verification

### Check if MEP is Working

1. **Ask Claude**: "What Morocco tourism tools do you have access to?"
2. **Claude should mention** tools like `searchExperiences`, `getExperienceDetails`, etc.
3. **Try a search**: "Find cooking classes in Marrakech"
4. **Claude should return** real Morocco tourism experiences

### Expected Response Format

When working correctly, Claude will return responses like:

```
I found several cooking experiences in Marrakech:

🍽️ Traditional Moroccan Cooking Class
- Location: Medina, Marrakech
- Price: 350 MAD per person (~$35 USD)
- Duration: 3 hours
- Rating: 4.8/5
- Includes: Market tour, hands-on cooking, meal
- Operator: Riad Atlas Cooking School (verified)

Would you like more details about any of these experiences?
```

---

## 🔧 Troubleshooting

### MEP Server Not Found

**Problem**: Claude says it doesn't have access to Morocco tourism data

**Solutions**:
1. **Check config file syntax** - Ensure valid JSON
2. **Restart Claude Desktop** - Quit completely and reopen
3. **Check server status** - Visit https://mep-mcp-server-production.info6625.workers.dev/health
4. **Verify Node.js** - Ensure Node.js 18+ is installed

### Config File Issues

**Problem**: Claude Desktop won't start or shows errors

**Solutions**:
1. **Validate JSON** - Use a JSON validator to check syntax
2. **Check file location** - Ensure config file is in correct directory
3. **Backup and restore** - Keep a backup of working config

### Network Issues

**Problem**: Connection timeouts or server errors

**Solutions**:
1. **Check internet connection**
2. **Test server directly**:
   ```bash
   curl https://mep-mcp-server-production.info6625.workers.dev/health
   ```
3. **Try again later** - Server might be temporarily unavailable

---

## 🎯 Advanced Configuration

### Custom Server URL

If you're running your own MEP server instance:

```json
{
  "mcpServers": {
    "morocco-experience-protocol": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-fetch", 
        "https://your-custom-mep-server.com/sse"
      ]
    }
  }
}
```

### Local Development

For local development with the MEP server:

```json
{
  "mcpServers": {
    "morocco-experience-protocol-dev": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-fetch", 
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

---

## 📊 Usage Examples

### Tourism Planning
```
I'm planning a 5-day trip to Morocco. Can you help me find:
1. Cultural experiences in Marrakech
2. Adventure activities in the Atlas Mountains
3. Culinary experiences in Fes
```

### Specific Searches
```
Find halal cooking classes in Marrakech under 400 MAD per person
Show me verified tour operators for Atlas Mountain hiking
What traditional craft workshops are available in Fes?
```

### Detailed Information
```
Get detailed information about [specific experience ID], including:
- Exact pricing and what's included
- Operator contact information
- Location and meeting point
- Booking requirements
```

---

## 🔗 Next Steps

### Explore More Features
- **[API Reference](API_REFERENCE.md)** - See all available tools
- **[Integration Examples](../examples/)** - Code samples for custom apps
- **[Deployment Guide](DEPLOYMENT.md)** - Run your own MEP server

### Get Involved
- **[GitHub Issues](https://github.com/gugga7/morocco-experience-protocol-mcp/issues)** - Report bugs or request features
- **[GitHub Discussions](https://github.com/gugga7/morocco-experience-protocol-mcp/discussions)** - Ask questions and share ideas

---

## 🆘 Need Help?

- **GitHub Issues**: [Report a problem](https://github.com/gugga7/morocco-experience-protocol-mcp/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/gugga7/morocco-experience-protocol-mcp/discussions)
- **Server Status**: [Check if MEP is online](https://mep-mcp-server-production.info6625.workers.dev/health)

---

**Happy exploring Morocco with AI! 🇲🇦✨**