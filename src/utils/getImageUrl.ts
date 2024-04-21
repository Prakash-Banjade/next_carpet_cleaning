import { put } from "@vercel/blob";
import { MemoryStoredFile } from "nestjs-form-data";

export default async function getImageUrl(image: MemoryStoredFile | string | undefined) {
    if (!image) return null;
    
    if (typeof image === 'string') return image;

    const { url } = await put(image.originalName, image.buffer, { access: 'public' });

    return url;
}