import * as React from 'react';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB max per image
const MAX_IMAGES = 5;

/**
 * Hook that listens for paste events on a target element and extracts images.
 * Returns accumulated images and controls to add/remove them.
 */
export function useImagePaste() {
    const [images, setImages] = React.useState<string[]>([]);

    const handlePaste = React.useCallback((e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item.type.startsWith('image/')) continue;

            e.preventDefault();
            const file = item.getAsFile();
            if (!file) continue;
            if (file.size > MAX_IMAGE_SIZE) continue;

            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setImages(prev => {
                    if (prev.length >= MAX_IMAGES) return prev;
                    return [...prev, dataUrl];
                });
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const removeImage = React.useCallback((index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    }, []);

    const clearImages = React.useCallback(() => {
        setImages([]);
    }, []);

    return { images, handlePaste, removeImage, clearImages };
}
