import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoteList } from './src/components/NoteList';
import { NoteEditor } from './src/components/NoteEditor';
import type { Note } from './src/types/Note';

function App(): React.JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleAddNote = () => {
    setCurrentNote(undefined);
    setIsEditing(true);
  };

  const handleNotePress = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
  };

  const handleBack = (content: string) => {
    if (content.trim()) {
      const updatedNotes = [...notes];
      if (currentNote) {
        const index = notes.findIndex(note => note.id === currentNote.id);
        updatedNotes[index] = { ...currentNote, content };
      } else {
        updatedNotes.unshift({
          id: Date.now().toString(),
          content,
          createdAt: Date.now(),
        });
      }
      saveNotes(updatedNotes);
    }
    setCurrentNote(undefined);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isEditing ? (
        <NoteEditor note={currentNote} onBack={handleBack} />
      ) : (
        <NoteList
          notes={notes}
          onNotePress={handleNotePress}
          onDeleteNote={handleDeleteNote}
          onAddPress={handleAddNote}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
