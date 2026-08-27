import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useVideoStore } from '../store/videoStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MAX_DURATION = 60;
const MIN_DURATION = 15;

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isFacingBack, setIsFacingBack] = useState(true);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const cameraRef = useRef(null);
  const addVideo = useVideoStore((state) => state.addVideo);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= MAX_DURATION) {
            stopRecording();
            return MAX_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setRecordingDuration(0);
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: '1080p',
          maxDuration: MAX_DURATION,
        });
        
        if (video && video.uri) {
          // Save video to store
          const newVideo = {
            id: Date.now().toString(),
            uri: video.uri,
            duration: recordingDuration,
            created: new Date(),
            filename: `VConnn_${Date.now()}`,
            isEdited: false,
          };
          
          addVideo(newVideo);
          
          // Navigate to editor
          navigation.navigate('Home', {
            screen: 'Editor',
            params: { videoUri: video.uri, videoData: newVideo }
          });
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal merekam video: ' + error.message);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const toggleCamera = () => {
    setIsFacingBack(!isFacingBack);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Kamera Diperlukan</Title>
        <Paragraph style={styles.message}>Silakan berikan izin akses kamera untuk melanjutkan</Paragraph>
        <Button 
          mode="contained" 
          onPress={requestPermission}
          style={styles.button}
        >
          Izinkan Kamera
        </Button>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Akses Kamera Ditolak</Title>
        <Paragraph style={styles.message}>
          Aplikasi membutuhkan akses ke kamera untuk merekam video
        </Paragraph>
      </View>
    );
  }

  const progress = recordingDuration / MAX_DURATION;
  const canStop = recordingDuration >= MIN_DURATION;

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        mode="video"
        facing={isFacingBack ? 'back' : 'front'}
        flash={isFlashOn ? 'on' : 'off'}
      />
      
      {/* Recording Duration Display */}
      {isRecording && (
        <View style={styles.durationContainer}>
          <View style={styles.durationContent}>
            <View style={styles.recordingIndicator} />
            <Paragraph style={styles.durationText}>
              {Math.floor(recordingDuration / 60)}:{String(recordingDuration % 60).padStart(2, '0')}
            </Paragraph>
          </View>
          <ProgressBar 
            progress={progress} 
            style={styles.progressBar}
            color="#6200ee"
          />
        </View>
      )}

      {/* Duration Limit Display */}
      <View style={styles.limitContainer}>
        <Paragraph style={styles.limitText}>
          ⏱️ Durasi: {MIN_DURATION}-{MAX_DURATION}s
        </Paragraph>
      </View>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <MaterialCommunityIcons 
            name={isFlashOn ? 'flash' : 'flash-off'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
          <MaterialCommunityIcons 
            name="camera-flip" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        {!isRecording ? (
          <>
            <Button
              mode="contained"
              icon="camera-record"
              onPress={startRecording}
              style={styles.recordButton}
              labelStyle={styles.recordButtonLabel}
            >
              Rekam
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="contained"
              icon="stop-circle"
              onPress={stopRecording}
              disabled={!canStop}
              style={[styles.recordButton, styles.stopButton]}
              labelStyle={styles.recordButtonLabel}
            >
              {canStop ? 'Selesai' : `${MIN_DURATION - recordingDuration}s`}
            </Button>
          </>
        )}
      </View>

      {/* Info Text */}
      {isRecording && recordingDuration < MIN_DURATION && (
        <View style={styles.infoContainer}>
          <Paragraph style={styles.infoText}>
            Tahan minimal {MIN_DURATION} detik
          </Paragraph>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
  durationContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  durationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  durationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff4444',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  limitContainer: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: 'rgba(98, 0, 238, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  limitText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  topControls: {
    position: 'absolute',
    top: 40,
    right: 20,
    gap: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recordButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 40,
  },
  recordButtonLabel: {
    fontSize: 16,
  },
  stopButton: {
    backgroundColor: '#ff4444',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  infoText: {
    color: '#ff9800',
    fontSize: 14,
    fontWeight: '600',
  },
});
