import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const action = formData.get('action') as string;
    const format = formData.get('format') as string;
    const quality = parseInt(formData.get('quality') as string || '80');
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined;
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let sharpInstance = sharp(buffer);

    // Apply operations
    if (action === 'resize' && (width || height)) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (format) {
      switch (format) {
        case 'png':
          sharpInstance = sharpInstance.png({ quality });
          break;
        case 'jpg':
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({ quality });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality });
          break;
        case 'gif':
          sharpInstance = sharpInstance.gif();
          break;
      }
    } else if (action === 'compress') {
      // Auto compress keeping same format
      const metadata = await sharpInstance.metadata();
      if (metadata.format === 'jpeg') {
        sharpInstance = sharpInstance.jpeg({ quality });
      } else if (metadata.format === 'png') {
        sharpInstance = sharpInstance.png({ quality });
      } else if (metadata.format === 'webp') {
        sharpInstance = sharpInstance.webp({ quality });
      }
    }

    const processedBuffer = await sharpInstance.toBuffer();
    
    // Determine content type
    let contentType = file.type;
    if (format) {
      contentType = `image/${format}`;
    }

    return new NextResponse(processedBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="processed-${file.name.split('.')[0]}.${format || file.name.split('.').pop()}"`,
      },
    });

  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
