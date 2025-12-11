# Claude Desktop Integration Example

This example shows how to integrate the Morocco Experience Protocol MCP server with Claude Desktop.

## Quick Setup

1. **Copy the config**:
   ```bash
   cp claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
   
   Or on Windows:
   ```bash
   copy claude_desktop_config.json %APPDATA%\Claude\claude_desktop_config.json
   ```

2. **Restart Claude Desktop**

3. **Test with these queries**:
   - "Find cooking experiences in Marrakech"
   - "What cultural activities are available in Fes?"
   - "Show me adventure tours in the Atlas Mountains"

## Expected Results

Claude will have access to real Morocco tourism data and can help you:

- 🔍 **Search experiences** by location, type, or keywords
- 📍 **Get detailed information** about specific experiences
- 🏢 **Find operators** and their contact information
- 💰 **Compare pricing** and availability
- ⭐ **Check ratings** and verification status

## Troubleshooting

If Claude doesn't recognize Morocco tourism queries:

1. **Check config file location** - Ensure it's in the right directory
2. **Validate JSON syntax** - Use a JSON validator
3. **Restart Claude completely** - Quit and reopen
4. **Test server status** - Visit https://mep-mcp-server-production.info6625.workers.dev/health

## Advanced Usage

Ask Claude complex questions like:

```
I'm planning a 3-day cultural immersion in Morocco. Can you help me find:
1. Traditional cooking classes in Marrakech
2. Artisan workshops in Fes  
3. Cultural tours that include local guide services
4. Experiences that offer pickup from major hotels

For each recommendation, please include pricing, duration, and booking requirements.
```

Claude will use the MEP server to provide detailed, accurate information about real Morocco experiences!