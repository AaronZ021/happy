import * as React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

interface ImageAttachmentPreviewProps {
    images: string[];
    onRemove: (index: number) => void;
}

export const ImageAttachmentPreview = React.memo(({ images, onRemove }: ImageAttachmentPreviewProps) => {
    if (images.length === 0) return null;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {images.map((dataUrl, index) => (
                <View key={index} style={styles.thumbnail}>
                    <Image
                        source={{ uri: dataUrl }}
                        style={{ width: 56, height: 56 }}
                        contentFit="cover"
                    />
                    <Pressable
                        style={styles.removeButton}
                        onPress={() => onRemove(index)}
                        hitSlop={8}
                    >
                        <Ionicons name="close-circle" size={18} color="#fff" />
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
});

ImageAttachmentPreview.displayName = 'ImageAttachmentPreview';

const styles = StyleSheet.create((theme) => ({
    container: {
        maxHeight: 72,
        marginBottom: 4,
    },
    content: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 12,
    },
    thumbnail: {
        width: 56,
        height: 56,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    removeButton: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 9,
    },
}));
