import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import type { Note } from '../types/Note';

interface NoteListProps {
    notes: Note[];
    onNotePress: (note: Note) => void;
    onDeleteNote: (noteId: string) => void;
    onAddPress: () => void;
}

export function NoteList({
    notes,
    onNotePress,
    onDeleteNote,
    onAddPress,
}: NoteListProps) {
    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.noteItem}
            onPress={() => onNotePress(item)}>
            <Text style={styles.notePreview} numberOfLines={2}>
                {item.content}
            </Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                    Alert.alert('Delete Note', 'Are you sure?', [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', onPress: () => onDeleteNote(item.id), style: 'destructive' },
                    ])
                }>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No notes yet</Text>
                }
            />
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                <Text style={styles.addButtonText}>+ New Note</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    notePreview: {
        flex: 1,
        fontSize: 16,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#ff4444',
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'white',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 25,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
});