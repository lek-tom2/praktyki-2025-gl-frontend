import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
  }
  
  try {
    const backendUrl = `http://localhost:8000${endpoint}`;
    console.log('=== PROXY REQUEST ===');
    console.log('Frontend URL:', request.url);
    console.log('Backend URL:', backendUrl);
    console.log('Endpoint:', endpoint);
    
    // Get authorization header from the original request
    const authHeader = request.headers.get('authorization');
    console.log('Authorization header received:', authHeader ? 'Present' : 'Missing');
    if (authHeader) {
      console.log('Auth header value:', authHeader.substring(0, 20) + '...');
    }
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers.Authorization = authHeader;
      console.log('Authorization header added to backend request');
    }
    
    console.log('Headers being sent to backend:', JSON.stringify(headers, null, 2));
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: headers,
    });
    
    console.log('Backend response status:', response.status);
    console.log('Backend response ok:', response.ok);
    console.log('Backend response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Backend error response:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('Backend success response data:', JSON.stringify(data, null, 2));
    console.log('=== END PROXY REQUEST ===');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: `Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
  }
  
  try {
    const backendUrl = `http://localhost:8000${endpoint}`;
    console.log('Proxying POST request to:', backendUrl);
    
    // Get authorization header and body from the original request
    const authHeader = request.headers.get('authorization');
    const body = await request.text();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    
    console.log('Backend POST response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Backend POST error:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy POST error:', error);
    return NextResponse.json(
      { error: `Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}