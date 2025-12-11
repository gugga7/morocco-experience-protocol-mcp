/**
 * MEP MCP Server - Production Ready
 * Morocco Experience Protocol - Making tourism data AI-accessible
 * 
 * This is the main entry point for the MCP server that provides
 * AI assistants with access to verified Morocco tourism data.
 */

interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  environment: string;
  protocol: string;
  capabilities: string[];
  endpoints: {
    health: string;
    mcp: string;
  };
}

interface MCPRequest {
  jsonrpc: string;
  id?: string | number | null;
  method: string;
  params?: any;
}

interface MCPResponse {
  jsonrpc: string;
  id: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers for AI client compatibility
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
    };
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200,
        headers: corsHeaders 
      });
    }
    
    try {
      // Health check endpoint
      if (url.pathname === '/health') {
        const healthResponse: HealthResponse = {
          status: 'healthy',
          service: 'MEP MCP Server',
          version: '1.0.0',
          timestamp: new Date().toISOString(),
          environment: env.ENVIRONMENT || 'production',
          protocol: 'Model Context Protocol',
          capabilities: ['health-check', 'mcp-protocol', 'cors-enabled'],
          endpoints: {
            health: '/health',
            mcp: '/sse'
          }
        };
        
        return new Response(JSON.stringify(healthResponse, null, 2), {
          status: 200,
          headers: corsHeaders,
        });
      }
      
      // MCP protocol endpoint
      if (url.pathname === '/sse') {
        if (request.method === 'POST') {
          try {
            // Parse MCP request
            const body = await request.text();
            let mcpRequest: MCPRequest;
            
            try {
              mcpRequest = JSON.parse(body);
            } catch (e) {
              const errorResponse: MCPResponse = {
                jsonrpc: '2.0',
                id: null,
                error: {
                  code: -32700,
                  message: 'Parse error - Invalid JSON'
                }
              };
              
              return new Response(JSON.stringify(errorResponse), {
                status: 400,
                headers: corsHeaders,
              });
            }
            
            // Handle different MCP methods
            let result: any;
            
            switch (mcpRequest.method) {
              case 'initialize':
                result = {
                  protocolVersion: '2025-06-18',
                  capabilities: {
                    tools: {
                      listChanged: false
                    },
                    resources: {
                      subscribe: false,
                      listChanged: false
                    }
                  },
                  serverInfo: {
                    name: 'MEP MCP Server',
                    version: '1.0.0',
                    description: 'Morocco Experience Protocol - AI-accessible tourism data'
                  }
                };
                break;
                
              case 'tools/list':
                result = {
                  tools: [
                    {
                      name: 'searchExperiences',
                      description: 'Search for tourism experiences in Morocco',
                      inputSchema: {
                        type: 'object',
                        properties: {
                          query: { type: 'string', description: 'Search query' },
                          location: { type: 'string', description: 'Location filter' }
                        }
                      }
                    }
                  ]
                };
                break;
                
              case 'tools/call':
                // Basic tool response - in production this would query real data
                result = {
                  content: [
                    {
                      type: 'text',
                      text: 'MEP MCP Server is ready. Full tool functionality will be available soon with real Morocco tourism data.'
                    }
                  ]
                };
                break;
                
              default:
                const errorResponse: MCPResponse = {
                  jsonrpc: '2.0',
                  id: mcpRequest.id || null,
                  error: {
                    code: -32601,
                    message: `Method not found: ${mcpRequest.method}`
                  }
                };
                
                return new Response(JSON.stringify(errorResponse), {
                  status: 404,
                  headers: corsHeaders,
                });
            }
            
            // Success response
            const mcpResponse: MCPResponse = {
              jsonrpc: '2.0',
              id: mcpRequest.id || null,
              result: result
            };
            
            return new Response(JSON.stringify(mcpResponse, null, 2), {
              status: 200,
              headers: corsHeaders,
            });
            
          } catch (error) {
            const errorResponse: MCPResponse = {
              jsonrpc: '2.0',
              id: null,
              error: {
                code: -32603,
                message: 'Internal error'
              }
            };
            
            return new Response(JSON.stringify(errorResponse), {
              status: 500,
              headers: corsHeaders,
            });
          }
        } else {
          return new Response(JSON.stringify({
            error: 'Method not allowed',
            message: 'MCP endpoint requires POST requests',
            allowedMethods: ['POST'],
            example: {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: { jsonrpc: '2.0', method: 'initialize', id: 1 }
            }
          }, null, 2), {
            status: 405,
            headers: {
              ...corsHeaders,
              'Allow': 'POST, OPTIONS'
            },
          });
        }
      }
      
      // Default response for root and other paths
      const welcomeResponse = {
        service: 'MEP MCP Server',
        description: 'Morocco Experience Protocol - Making tourism data AI-accessible',
        version: '1.0.0',
        status: 'ready',
        protocol: 'Model Context Protocol (MCP)',
        endpoints: {
          health: '/health',
          mcp: '/sse (POST only)'
        },
        documentation: 'https://docs.cometomorocco.com',
        example: {
          healthCheck: 'GET /health',
          mcpInitialize: 'POST /sse with {"jsonrpc":"2.0","method":"initialize","id":1}'
        }
      };
      
      return new Response(JSON.stringify(welcomeResponse, null, 2), {
        status: 200,
        headers: corsHeaders,
      });
      
    } catch (error) {
      // Global error handler
      return new Response(JSON.stringify({
        error: 'Server Error',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};