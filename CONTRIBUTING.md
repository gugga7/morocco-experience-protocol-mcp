# Contributing to Morocco Experience Protocol MCP Server

Thank you for your interest in contributing to MEP! This project aims to make Morocco's tourism experiences AI-accessible worldwide.

## 🎯 Ways to Contribute

### 1. Report Issues
- **Bug reports** - Found something broken?
- **Feature requests** - Have ideas for improvements?
- **Documentation issues** - Something unclear?

### 2. Code Contributions
- **Bug fixes** - Fix issues in the codebase
- **New features** - Add new MCP tools or capabilities
- **Performance improvements** - Make the server faster
- **Tests** - Improve test coverage

### 3. Documentation
- **Setup guides** - Help others integrate MEP
- **API documentation** - Improve tool descriptions
- **Examples** - Add integration examples for new platforms
- **Translations** - Help with Arabic/French content

### 4. Community
- **Answer questions** in GitHub Discussions
- **Share examples** of MEP integrations
- **Write blog posts** about using MEP
- **Spread the word** about AI-accessible tourism

## 🚀 Getting Started

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/morocco-experience-protocol-mcp.git
   cd morocco-experience-protocol-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   npm run test:integration
   ```

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new MCP tool for operator search"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style

### TypeScript Guidelines
- Use **strict TypeScript** - no `any` types
- **Explicit return types** for all functions
- **Interface over type** for object shapes
- **Descriptive variable names**

### Code Organization
```
src/
├── tools/          # MCP tools (searchExperiences, etc.)
├── database/       # Data access layer
├── validation/     # Input/output validation
├── config/         # Configuration management
└── utils/          # Shared utilities
```

### Naming Conventions
- **Files**: kebab-case (`search-experiences-tool.ts`)
- **Classes**: PascalCase (`SearchExperiences`)
- **Functions**: camelCase (`validateInput`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RESULTS`)

## 🧪 Testing

### Test Types
- **Unit tests** - Test individual functions
- **Integration tests** - Test MCP protocol compliance
- **End-to-end tests** - Test with real AI clients

### Writing Tests
```typescript
describe('SearchExperiences Tool', () => {
  it('should return experiences for valid query', async () => {
    const result = await searchExperiences({
      query: 'cooking class',
      location: 'Marrakech'
    });
    
    expect(result.experiences).toHaveLength(3);
    expect(result.experiences[0]).toHaveProperty('title');
  });
});
```

## 📚 Documentation

### API Documentation
- Document all MCP tools with examples
- Include input/output schemas
- Provide error handling information

### Code Comments
```typescript
/**
 * Searches for tourism experiences in Morocco
 * @param query - Search terms (e.g., "cooking class")
 * @param location - City or region filter
 * @returns Array of matching experiences
 */
async function searchExperiences(params: SearchParams): Promise<SearchResult> {
  // Implementation
}
```

## 🔍 Pull Request Process

### Before Submitting
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (for significant changes)

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manually tested with Claude Desktop

## Screenshots (if applicable)
Add screenshots of new features or UI changes
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** with real MCP clients
4. **Merge** after approval

## 🌍 Internationalization

### Adding Translations
- **Arabic** (`ar`) - Right-to-left support
- **French** (`fr`) - Morocco's second language
- **English** (`en`) - International standard

### Translation Guidelines
```typescript
// Good - Multilingual support
interface Experience {
  title_en: string;
  title_fr?: string;
  title_ar?: string;
  description_en: string;
  description_fr?: string;
  description_ar?: string;
}

// Bad - English only
interface Experience {
  title: string;
  description: string;
}
```

## 🚨 Issue Guidelines

### Bug Reports
```markdown
**Describe the bug**
Clear description of what's wrong

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What should happen instead

**Environment**
- OS: [e.g., macOS 14.0]
- Node.js version: [e.g., 18.17.0]
- Claude Desktop version: [e.g., 1.2.3]

**Additional context**
Any other relevant information
```

### Feature Requests
```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of desired feature

**Describe alternatives you've considered**
Other approaches you've thought about

**Additional context**
Mockups, examples, or other context
```

## 🏆 Recognition

Contributors will be:
- **Listed** in README.md
- **Mentioned** in release notes
- **Invited** to join the core team (for significant contributions)

## 📞 Getting Help

- **GitHub Discussions** - Ask questions
- **GitHub Issues** - Report problems
- **Discord** - Real-time chat (link in README)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make Morocco's tourism experiences AI-accessible worldwide! 🇲🇦🤖✨**