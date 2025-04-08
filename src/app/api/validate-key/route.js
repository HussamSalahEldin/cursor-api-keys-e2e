import { apiKeyService } from '@/services/apiKeyService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();
    const isValid = await apiKeyService.validateApiKey(apiKey);
    return NextResponse.json({ valid: isValid }, { status: isValid ? 200 : 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
} 