# Integration Examples

**Examples for integrating Morocco Experience Protocol MCP Server with different AI platforms**

---

## Available Examples

### 1. Claude Desktop Integration
**Directory**: `claude-desktop/`

Complete setup guide for integrating MEP with Claude Desktop, including:
- Configuration file setup
- Step-by-step instructions
- Troubleshooting guide
- Example queries

### 2. Custom AI Application (Coming Soon)
**Directory**: `custom-app/`

Example of building a custom AI application that uses the MEP MCP Server:
- JavaScript/TypeScript client
- React web application
- Node.js backend integration

### 3. Python Client (Coming Soon)
**Directory**: `python-client/`

Python client library and examples:
- Direct HTTP requests
- MCP protocol wrapper
- Jupyter notebook examples

### 4. LangChain Integration (Coming Soon)
**Directory**: `langchain/`

Integration with LangChain framework:
- Custom MCP tool wrapper
- Chain examples
- Agent configurations

---

## Quick Start

### Claude Desktop (Recommended)

1. **Navigate to claude-desktop directory**:
   ```bash
   cd examples/claude-desktop/
   ```

2. **Follow the setup guide**:
   - Read `README.md` for detailed instructions
   - Copy `claude_desktop_config.json` to your Claude config directory
   - Restart Claude Desktop

3. **Test integration**:
   ```
   Ask Claude: "Find cooking experiences in Marrakech"
   ```

### Direct API Usage

```bash
# Health check
curl https://mep-mcp-server-production.info6625.workers.dev/health

# Initialize MCP
curl -X POST https://mep-mcp-server-production.info6625.workers.dev/sse \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"initialize","id":1}'

# List available tools
curl -X POST https://mep-mcp-server-production.info6625.workers.dev/sse \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":2}'
```

---

## Contributing Examples

We welcome contributions of integration examples for other platforms!

### Adding a New Example

1. **Create directory**: `examples/your-platform/`
2. **Add README.md** with setup instructions
3. **Include working code** samples
4. **Test thoroughly** before submitting
5. **Submit pull request**

### Example Structure

```
examples/your-platform/
├── README.md              # Setup instructions
├── config/               # Configuration files
├── src/                  # Source code
├── package.json          # Dependencies (if applicable)
└── screenshots/          # Visual guides
```

---

## Platform Support

| Platform | Status | Directory | Notes |
|----------|--------|-----------|-------|
| Claude Desktop | ✅ Ready | `claude-desktop/` | Full setup guide |
| Custom Apps | 🔄 Coming Soon | `custom-app/` | JavaScript/TypeScript |
| Python | 🔄 Coming Soon | `python-client/` | Direct HTTP client |
| LangChain | 🔄 Coming Soon | `langchain/` | Framework integration |
| ChatGPT Plugin | 📋 Planned | `chatgpt-plugin/` | Plugin development |
| Copilot | 📋 Planned | `copilot/` | GitHub Copilot integration |

---

## Need Help?

- **GitHub Issues**: [Report problems](https://github.com/gugga7/morocco-experience-protocol-mcp/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/gugga7/morocco-experience-protocol-mcp/discussions)
- **Documentation**: [Full API reference](../docs/API_REFERENCE.md)

---

**Happy integrating! 🚀**