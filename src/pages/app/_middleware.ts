import { NextRequest, NextResponse } from 'next/server';

function handleUnauthorized(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

// TODO: implement refresh_token
export async function middleware(req: NextRequest) {
  const token = req.cookies.user_token || req.headers.get('authorization');

  if (!token) {
    return handleUnauthorized(req);
  }

  const apiUrl = req.nextUrl.clone();
  apiUrl.pathname = '/api/verify-jwt';

  const apiResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  });

  if (apiResponse.status !== 200) {
    return handleUnauthorized(req);
  }

  return NextResponse.next();
}
