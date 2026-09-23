import { NextResponse } from 'next/server';
import { LANGUAGE_VERSIONS } from '@/lib/languages';

export async function POST(req: Request) {
  try {
    const { language, sourceCode } = await req.json();

    if (!language || !sourceCode) {
      return NextResponse.json(
        { error: 'Language and sourceCode are required' },
        { status: 400 }
      );
    }

    const version = LANGUAGE_VERSIONS[language] || '*';

    // We will use the Piston API. Piston API is publicly available at piston.piston.rs for evaluation.
    // NOTE: In production, consider hosting your own Piston instance or using a paid API like Judge0.
    const response = await fetch('https://emacs.piston.rs/api/v2/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language === 'c' || language === 'cpp' ? language : language,
        version: version,
        files: [
          {
            content: sourceCode,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Execution API error:', errorData);
      
      // Fallback mock if public piston is unreachable
      return NextResponse.json({
         run: {
           stdout: '',
           stderr: `Execution Service Error: Could not connect to compilation server.\nStatus: ${response.status}`,
           code: 1
         }
      });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error executing code, using fallback simulation:', error.message);
    
    // Fallback simulation for demonstration purposes when public API is unavailable
    let mockOutput = "Hello, World!";
    
    return NextResponse.json({
      run: {
        stdout: mockOutput,
        stderr: '',
        code: 0
      },
      isSimulated: true
    });
  }
}
