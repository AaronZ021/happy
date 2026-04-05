import * as z from 'zod';

/**
 * Image content block for user messages.
 * Images are sent as base64 data URLs (e.g. "data:image/png;base64,...")
 * to pass through the existing E2E encryption layer without changes.
 */
export const ImageContentBlockSchema = z.object({
    type: z.literal('image'),
    dataUrl: z.string(),  // base64 data URL: "data:image/<format>;base64,<data>"
});
export type ImageContentBlock = z.infer<typeof ImageContentBlockSchema>;

export const TextContentBlockSchema = z.object({
    type: z.literal('text'),
    text: z.string(),
});
export type TextContentBlock = z.infer<typeof TextContentBlockSchema>;

/**
 * User message content: array of text and image blocks.
 * Always contains exactly one text block (possibly empty string) and zero or more image blocks.
 */
export const UserContentBlockSchema = z.discriminatedUnion('type', [
    TextContentBlockSchema,
    ImageContentBlockSchema,
]);
export type UserContentBlock = z.infer<typeof UserContentBlockSchema>;
