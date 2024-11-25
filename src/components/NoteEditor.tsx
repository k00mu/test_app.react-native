import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import type { Note } from '../types/Note';

interface NoteEditorProps {
    note?: Note;
    onBack: (content: string) => void;
}

export function NoteEditor({ note, onBack }: NoteEditorProps) {
    const [content, setContent] = useState(note?.content || '');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onBack(content)}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                multiline
                value={content}
                onChangeText={setContent}
                placeholder="Write your note here..."
                autoFocus
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        fontSize: 18,
        color: '#007AFF',
    },
    input: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});