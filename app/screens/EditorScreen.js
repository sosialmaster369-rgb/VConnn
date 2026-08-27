import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import { Card, Title, Button, Paragraph, Slider, SegmentedButtons, Dialog, Portal, TextInput } from 'react-native-paper';
import { Video } from 'expo-av';
import { useVideoStore } from '../store/videoStore';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function EditorScreen({ route, navigation }) {
  const [videoUri, setVideoUri] = useState(route?.params?.videoUri || null);
  const [selectedTab, setSelectedTab] = useState('trim');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(60);
  const [exportQuality, setExportQuality] = useState('720p');
  const [isExporting, setIsExporting] = useState(false);
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [textInput, setTextInput] = useState('');
  const videoRef = useRef(null);
  
  const { 
    textOverlays, 
    addTextOverlay, 
    removeTextOverlay, 
    resetEdits 
  } = useVideoStore();

  const handleAddText = () => {
    if (textInput.trim()) {
      addTextOverlay({
        id: Date.now(),
        text: textInput,
        position: 'center',
        fontSize: 32,
        color: '#ffffff',
      });
      setTextInput('');
      setShowTextDialog(false);
      Alert.alert('Sukses', 'Text overlay ditambahkan');
    }
  };

  const handleExport = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Tidak ada video untuk diekspor');
      return;
    }

    Alert.alert(
      'Mulai Export',
      `Video akan diekspor dengan kualitas ${exportQuality}.\n\nProses ini mungkin memakan waktu beberapa menit.`,
      [
        { text: 'Batal', onPress: () => {} },
        {
          text: 'Export',
          onPress: async () => {
            setIsExporting(true);
            try {
              // Request media library permission
              const permission = await MediaLibrary.requestPermissionsAsync();
              
              if (!permission.granted) {
                Alert.alert('Error', 'Izin akses galeri diperlukan');
                setIsExporting(false);
                return;
              }

              // Simulate video export (in production, use FFmpeg)
              // For now, just copy the file to device gallery
              const fileName = `VConnn_${Date.now()}.mp4`;
              const destUri = `${FileSystem.documentDirectory}${fileName}`;
              
              // In production, you would process the video here
              // For demo, we'll just copy it
              await FileSystem.copyAsync({
                from: videoUri,
                to: destUri,
              });

              // Save to media library
              const asset = await MediaLibrary.createAssetAsync(destUri);
              await MediaLibrary.createAlbumAsync('VConnn', asset, false);

              setIsExporting(false);
              Alert.alert(
                'Sukses!',
                'Video berhasil diekspor ke galeri',
                [
                  { text: 'OK', onPress: () => navigation.navigate('Gallery') }
                ]
              );
            } catch (error) {
              setIsExporting(false);
              Alert.alert('Error', 'Gagal mengekspor video: ' + error.message);
            }
          },
        },
      ]
    );
  };

  const handleResetEdits = () => {
    Alert.alert(
      'Reset Edits',
      'Semua perubahan akan dikembalikan ke default?',
      [
        { text: 'Batal', onPress: () => {} },
        {
          text: 'Reset',
          onPress: () => {
            resetEdits();
            setBrightness(1);
            setContrast(1);
            setSaturation(1);
            setSpeed(1);
            setTrimStart(0);
            setTrimEnd(60);
            Alert.alert('Sukses', 'Edits berhasil direset');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Video Preview */}
      {videoUri && (
        <View style={styles.previewContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            rate={speed}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
            style={styles.video}
            progressUpdateIntervalMillis={500}
          />
        </View>
      )}

      {/* Tab Selection */}
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: 'trim', label: 'Trim' },
          { value: 'effects', label: 'Effects' },
          { value: 'speed', label: 'Speed' },
          { value: 'text', label: 'Text' },
        ]}
        style={styles.tabButtons}
      />

      {/* Trim Controls */}
      {selectedTab === 'trim' && (
        <Card style={styles.controlCard}>
          <Card.Content>
            <Title>✂️ Potong Video</Title>
            <Paragraph style={styles.label}>Mulai: {trimStart.toFixed(1)}s</Paragraph>
            <Slider
              style={styles.slider}
              value={trimStart}
              onValueChange={setTrimStart}
              min={0}
              max={Math.max(trimEnd - 1, 1)}
            />
            <Paragraph style={styles.label}>Akhir: {trimEnd.toFixed(1)}s</Paragraph>
            <Slider
              style={styles.slider}
              value={trimEnd}
              onValueChange={setTrimEnd}
              min={Math.min(trimStart + 1, 60)}
              max={60}
            />
            <Paragraph style={styles.infoText}>
              📍 Durasi: {(trimEnd - trimStart).toFixed(1)}s
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      {/* Effects Controls */}
      {selectedTab === 'effects' && (
        <Card style={styles.controlCard}>
          <Card.Content>
            <Title>🎨 Filter & Effects</Title>
            
            <Paragraph style={styles.label}>Brightness: {brightness.toFixed(2)}</Paragraph>
            <Slider
              style={styles.slider}
              value={brightness}
              onValueChange={setBrightness}
              min={0.5}
              max={1.5}
              step={0.1}
            />

            <Paragraph style={styles.label}>Contrast: {contrast.toFixed(2)}</Paragraph>
            <Slider
              style={styles.slider}
              value={contrast}
              onValueChange={setContrast}
              min={0.5}
              max={1.5}
              step={0.1}
            />

            <Paragraph style={styles.label}>Saturation: {saturation.toFixed(2)}</Paragraph>
            <Slider
              style={styles.slider}
              value={saturation}
              onValueChange={setSaturation}
              min={0.5}
              max={1.5}
              step={0.1}
            />

            {/* Filter Presets */}
            <Title style={styles.filterTitle}>Filter Preset</Title>
            <View style={styles.filterGrid}>
              {['Normal', 'Vivid', 'Cool', 'Warm', 'B&W', 'Sepia'].map((filter) => (
                <Button
                  key={filter}
                  mode="outlined"
                  style={styles.filterButton}
                  onPress={() => {
                    if (filter === 'Vivid') setSaturation(1.5);
                    else if (filter === 'Cool') setContrast(1.3);
                    else if (filter === 'Warm') setBrightness(1.2);
                    else if (filter === 'B&W') setSaturation(0.5);
                    else if (filter === 'Sepia') {
                      setBrightness(1.1);
                      setSaturation(0.8);
                    } else resetEdits();
                    Alert.alert('Applied', `Filter ${filter} diterapkan`);
                  }}
                >
                  {filter}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Speed Controls */}
      {selectedTab === 'speed' && (
        <Card style={styles.controlCard}>
          <Card.Content>
            <Title>⚡ Kecepatan Video</Title>
            <Paragraph style={styles.label}>Speed: {speed.toFixed(2)}x</Paragraph>
            <Slider
              style={styles.slider}
              value={speed}
              onValueChange={setSpeed}
              min={0.5}
              max={2}
              step={0.1}
            />
            <View style={styles.speedPresets}>
              {[0.5, 0.75, 1, 1.5, 2].map((preset) => (
                <Button
                  key={preset}
                  mode={speed === preset ? 'contained' : 'outlined'}
                  style={styles.speedButton}
                  onPress={() => setSpeed(preset)}
                >
                  {preset}x
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Text Overlay */}
      {selectedTab === 'text' && (
        <Card style={styles.controlCard}>
          <Card.Content>
            <Title>📝 Tambah Text</Title>
            <Button
              mode="contained"
              icon="text-box-plus"
              style={styles.addButton}
              onPress={() => setShowTextDialog(true)}
            >
              Tambah Text
            </Button>
            
            {textOverlays.length > 0 && (
              <>
                <Title style={styles.filterTitle}>Text yang Ditambahkan</Title>
                {textOverlays.map((text, index) => (
                  <View key={text.id} style={styles.textItem}>
                    <Paragraph style={styles.textItemText}>{text.text}</Paragraph>
                    <Button
                      icon="delete"
                      mode="text"
                      onPress={() => removeTextOverlay(index)}
                    >
                      Hapus
                    </Button>
                  </View>
                ))}
              </>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Export Settings */}
      <Card style={styles.controlCard}>
        <Card.Content>
          <Title>📤 Export Settings</Title>
          <Paragraph style={styles.label}>Kualitas Video:</Paragraph>
          <SegmentedButtons
            value={exportQuality}
            onValueChange={setExportQuality}
            buttons={[
              { value: '480p', label: '480p' },
              { value: '720p', label: '720p' },
              { value: '1080p', label: '1080p' },
            ]}
            style={styles.qualityButtons}
          />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          mode="outlined"
          icon="refresh"
          style={styles.actionButton}
          onPress={handleResetEdits}
        >
          Reset
        </Button>
        <Button
          mode="contained"
          icon="download"
          style={styles.actionButton}
          loading={isExporting}
          disabled={isExporting}
          onPress={handleExport}
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </View>

      {/* Text Input Dialog */}
      <Portal>
        <Dialog visible={showTextDialog} onDismiss={() => setShowTextDialog(false)}>
          <Dialog.Title>Tambah Text</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Masukkan Teks"
              value={textInput}
              onChangeText={setTextInput}
              mode="outlined"
              placeholder="Ketik teks Anda di sini..."
              maxLength={100}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTextDialog(false)}>Batal</Button>
            <Button 
              onPress={handleAddText}
              disabled={!textInput.trim()}
            >
              Tambah
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  previewContainer: {
    backgroundColor: '#000',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  tabButtons: {
    margin: 15,
  },
  controlCard: {
    margin: 15,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  slider: {
    height: 40,
  },
  infoText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  filterTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 14,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    width: '30%',
  },
  speedPresets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 5,
  },
  speedButton: {
    flex: 1,
  },
  addButton: {
    marginVertical: 10,
  },
  textItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  textItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  qualityButtons: {
    marginTop: 10,
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    paddingBottom: 30,
  },
  actionButton: {
    flex: 1,
  },
});
