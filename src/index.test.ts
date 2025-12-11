/**
 * Basic tests for MEP MCP Server
 */

import worker from './index';

// Mock Cloudflare Workers environment
const mockEnv = {
  ENVIRONMENT: 'test'
};

const mockCtx = {
  waitUntil: jest.fn(),
  passThroughOnException: jest.fn(),
};

describe('MEP MCP Server', () => {
  test('health endpoint returns correct response', async () => {
    const request = new Request('https://test.com/health');
    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('healthy');
    expect(data.service).toBe('MEP MCP Server');
    expect(data.protocol).toBe('Model Context Protocol');
  });

  test('MCP initialize method works', async () => {
    const request = new Request('https://test.com/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'initialize',
        id: 1
      })
    });

    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.jsonrpc).toBe('2.0');
    expect(data.id).toBe(1);
    expect(data.result.protocolVersion).toBe('2025-06-18');
    expect(data.result.serverInfo.name).toBe('MEP MCP Server');
  });

  test('tools/list returns available tools', async () => {
    const request = new Request('https://test.com/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        id: 2
      })
    });

    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.jsonrpc).toBe('2.0');
    expect(data.id).toBe(2);
    expect(data.result.tools).toHaveLength(1);
    expect(data.result.tools[0].name).toBe('searchExperiences');
  });

  test('invalid JSON returns parse error', async () => {
    const request = new Request('https://test.com/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json'
    });

    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data.jsonrpc).toBe('2.0');
    expect(data.error.code).toBe(-32700);
    expect(data.error.message).toContain('Parse error');
  });

  test('unknown method returns method not found error', async () => {
    const request = new Request('https://test.com/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'unknown/method',
        id: 3
      })
    });

    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(404);
    
    const data = await response.json();
    expect(data.jsonrpc).toBe('2.0');
    expect(data.id).toBe(3);
    expect(data.error.code).toBe(-32601);
    expect(data.error.message).toContain('Method not found');
  });

  test('CORS headers are present', async () => {
    const request = new Request('https://test.com/health');
    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });

  test('OPTIONS request returns CORS headers', async () => {
    const request = new Request('https://test.com/sse', {
      method: 'OPTIONS'
    });

    const response = await worker.fetch(request, mockEnv, mockCtx as any);
    
    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});