/**
 * Cloudflare Worker - Newsletter API Proxy
 *
 * This worker acts as a secure proxy between your static site and Kit.com's API.
 * It keeps your Kit.com API key secure by storing it as an environment variable
 * in Cloudflare, rather than exposing it in your client-side code.
 *
 * @param {Request} request - The incoming request
 * @param {Object} env - Environment variables (contains KIT_API_KEY)
 * @returns {Response} - The proxied response from Kit.com
 */

export default {
  async fetch(request, env) {
    const allowedOrigins = [
      'https://patricklehmann.io',
      'https://www.patricklehmann.io',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    const origin = request.headers.get('Origin');
    const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    try {
      // Parse the request body
      const body = await request.json();

      // Validate required fields
      if (!body.email || !body.firstName) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: email and firstName' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Validate email format (basic)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Check if KIT_API_KEY is configured
      if (!env.KIT_API_KEY) {
        console.error('KIT_API_KEY not configured in environment variables');
        return new Response(
          JSON.stringify({ error: 'Server configuration error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Proxy request to Kit.com API
      const kitResponse = await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': env.KIT_API_KEY,
        },
        body: JSON.stringify({
          email_address: body.email,
          first_name: body.firstName,
        }),
      });

      // Get response data
      const kitData = await kitResponse.json();

      // Return the Kit.com response to the client
      return new Response(JSON.stringify(kitData), {
        status: kitResponse.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });

    } catch (error) {
      console.error('Error processing newsletter subscription:', error);

      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  }
};
