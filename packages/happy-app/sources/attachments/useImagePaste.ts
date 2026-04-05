import * as React from 'react';

/**
 * Native stub — image paste not supported on native platforms yet.
 */
export function useImagePaste() {
    const [images] = React.useState<string[]>([]);
    const handlePaste = React.useCallback(() => {}, []);
    const removeImage = React.useCallback((_index: number) => {}, []);
    const clearImages = React.useCallback(() => {}, []);
    return { images, handlePaste, removeImage, clearImages };
}
