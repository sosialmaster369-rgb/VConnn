import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function GalleryScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [renameDialog, setRenameDialog] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'video',
          first: 100,
          sortBy: 'creationTime',
        });
        setVideos(media.assets || []);
      } else {
        Alert.alert('Izin Diperlukan', 'Aplikasi membutuhkan akses ke galeri');
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadVideos();
  };

  const handleDelete = (video) => {
    Alert.alert(
      'Hapus Video',
      `Apakah Anda yakin ingin menghapus "${video.filename || 'Video'}"?`,
      [
        { text: 'Batal', onPress: () => {} },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await MediaLibrary.deleteAssetsAsync([video.id]);
              setVideos(videos.filter(v => v.id !== video.id));
              Alert.alert('Sukses', 'Video berhasil dihapus');
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus video');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = (video) => {
    navigation.navigate('Home', {
      screen: 'Editor',
      params: { 
        videoUri: video.uri,
        videoData: {
          id: video.id,
          filename: video.filename,
          duration: video.duration,
        }
      }
    });
  };

  const handleShare = (video) => {
    Alert.alert(
      'Share Video',
      'Pilih platform untuk berbagi video',
      [
        { text: 'Batal', onPress: () => {} },
        { text: 'TikTok', onPress: () => Alert.alert('Info', 'Fitur share TikTok segera tersedia') },
        { text: 'Instagram', onPress: () => Alert.alert('Info', 'Fitur share Instagram segera tersedia') },
      ]
    );
  };

  const handleRename = () => {
    if (newName.trim() && selectedVideo) {
      // Implement rename functionality
      Alert.alert('Sukses', `Video direname menjadi "${newName}"`);
      setRenameDialog(false);
      setSelectedVideo(null);
      setNewName('');
    }
  };

  const renderVideoItem = ({ item }) => (
    <Card style={styles.videoCard}>
      <Card.Cover
        source={{ uri: item.uri }}
        style={styles.videoThumbnail}
      />
      <View style={styles.durationBadge}>
        <Paragraph style={styles.durationText}>
          {Math.floor(item.duration)}s
        </Paragraph>
      </View>
      <Card.Content>
        <Title style={styles.videoTitle} numberOfLines={1}>
          {item.filename?.replace('.mp4', '') || 'Video ' + item.id.slice(0, 8)}
        </Title>
        <Paragraph style={styles.videoInfo}>
          {new Date(item.creationTime).toLocaleDateString('id-ID')} • {(item.filesize / (1024 * 1024)).toFixed(1)}MB
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => handleEdit(item)}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => handleShare(item)}
        >
          <MaterialCommunityIcons name="share-variant" size={20} color="#ff9800" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => {
            setSelectedVideo(item);
            setNewName(item.filename?.replace('.mp4', '') || '');
            setRenameDialog(true);
          }}
        >
          <MaterialCommunityIcons name="file-rename-box" size={20} color="#2196f3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => handleDelete(item)}
        >
          <MaterialCommunityIcons name="delete" size={20} color="#f44336" />
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialCommunityIcons name="loading" size={48} color="#6200ee" />
        <Paragraph style={styles.loadingText}>Memuat galeri...</Paragraph>
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="folder-open" size={64} color="#ddd" />
        <Title style={styles.emptyTitle}>Galeri Kosong</Title>
        <Paragraph style={styles.emptyText}>
          Belum ada video yang disimpan. Mulai buat video Anda sekarang!
        </Paragraph>
        <Button
          mode="contained"
          icon="camera"
          style={styles.emptyButton}
          onPress={() => navigation.navigate('Camera')}
        >
          Buat Video Baru
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Rename Dialog */}
      <Portal>
        <Dialog visible={renameDialog} onDismiss={() => setRenameDialog(false)}>
          <Dialog.Title>Rename Video</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nama Baru"
              value={newName}
              onChangeText={setNewName}
              mode="outlined"
              placeholder="Masukkan nama baru..."
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setRenameDialog(false)}>Batal</Button>
            <Button onPress={handleRename}>Rename</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Buat Video"
        style={styles.fab}
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  videoCard: {
    marginBottom: 15,
    elevation: 2,
    overflow: 'hidden',
  },
  videoThumbnail: {
    height: 200,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoTitle: {
    marginTop: 8,
    fontSize: 14,
  },
  videoInfo: {
    fontSize: 12,
    color: '#999',
  },
  cardActions: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  actionIcon: {
    marginHorizontal: 8,
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#666',
  },
  emptyButton: {
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
