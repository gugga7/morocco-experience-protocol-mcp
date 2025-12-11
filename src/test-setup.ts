/**
 * Test setup for MEP MCP Server
 */

// Mock global Request and Response for Cloudflare Workers environment
global.Request = class MockRequest {
  url: string;
  method: string;
  headers: Map<string, string>;
  body: string | null;

  constructor(url: string, init?: any) {
    this.url = url;
    this.method = init?.method || 'GET';
    this.headers = new Map();
    this.body = init?.body || null;

    if (init?.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        this.headers.set(key, value as string);
      });
    }
  }

  async text(): Promise<string> {
    return this.body || '';
  }

  async json(): Promise<any> {
    return JSON.parse(this.body || '{}');
  }
} as any;

global.Response = class MockResponse {
  status: number;
  headers: Map<string, string>;
  body: string;

  constructor(body?: string | null, init?: any) {
    this.status = init?.status || 200;
    this.headers = new Map();
    this.body = body || '';

    if (init?.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        this.headers.set(key, value as string);
      });
    }
  }

  async text(): Promise<string> {
    return this.body;
  }

  async json(): Promise<any> {
    return JSON.parse(this.body);
  }

  static redirect(url: string, status: number): MockResponse {
    return new MockResponse(null, { 
      status,
      headers: { Location: url }
    });
  }
} as any;

// Mock URL constructor
global.URL = class MockURL {
  protocol: string;
  hostname: string;
  pathname: string;
  search: string;

  constructor(url: string) {
    const parsed = new (require('url').URL)(url);
    this.protocol = parsed.protocol;
    this.hostname = parsed.hostname;
    this.pathname = parsed.pathname;
    this.search = parsed.search;
  }
} as any;