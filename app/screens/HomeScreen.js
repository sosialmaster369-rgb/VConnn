import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>🎬 VConnn</Title>
        <Paragraph style={styles.headerSubtitle}>
          Aplikasi pembuat video pendek 100% gratis
        </Paragraph>
      </View>

      {/* Quick Action Cards */}
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="camera" size={48} color="#6200ee" />
            </View>
            <Title style={styles.cardTitle}>Buat Video Baru</Title>
            <Paragraph style={styles.cardDesc}>
              Rekam video langsung dari kamera
            </Paragraph>
            <Button 
              mode="contained" 
              style={styles.cardButton}
              onPress={() => navigation.navigate('Camera')}
            >
              Mulai Rekam
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="folder-open" size={48} color="#6200ee" />
            </View>
            <Title style={styles.cardTitle}>Galeri Saya</Title>
            <Paragraph style={styles.cardDesc}>
              Lihat & kelola video yang telah dibuat
            </Paragraph>
            <Button 
              mode="contained" 
              style={styles.cardButton}
              onPress={() => navigation.navigate('Gallery')}
            >
              Buka Galeri
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Title style={styles.sectionTitle}>✨ Fitur Unggulan</Title>
        
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="content-cut" size={24} color="#6200ee" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Trim & Cut</Paragraph>
            <Paragraph style={styles.featureText}>Potong video sesuai keinginan (15-60s)</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="palette" size={24} color="#ff9800" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Filter & Effects</Paragraph>
            <Paragraph style={styles.featureText}>20+ filter profesional (Vivid, Cool, Warm, B&W, dll)</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="text-box" size={24} color="#2196f3" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Text Overlay</Paragraph>
            <Paragraph style={styles.featureText}>Tambahkan teks dengan berbagai style</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="music" size={24} color="#f44336" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Music Library</Paragraph>
            <Paragraph style={styles.featureText}>Ribuan musik royalty-free gratis</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="transition" size={24} color="#4caf50" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Transitions</Paragraph>
            <Paragraph style={styles.featureText}>Efek transisi halus antar klip</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="speedometer" size={24} color="#9c27b0" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Speed Control</Paragraph>
            <Paragraph style={styles.featureText}>Ubah kecepatan 0.5x hingga 2x</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="download" size={24} color="#00bcd4" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Export Berkualitas</Paragraph>
            <Paragraph style={styles.featureText}>480p, 720p, 1080p dengan audio jernih</Paragraph>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="share-variant" size={24} color="#ff5722" />
          <View style={styles.featureContent}>
            <Paragraph style={styles.featureName}>Share ke Social Media</Paragraph>
            <Paragraph style={styles.featureText}>Bagikan ke TikTok, Instagram, dan lainnya</Paragraph>
          </View>
        </View>
      </View>

      {/* Quick Start Guide */}
      <View style={styles.guideSection}>
        <Title style={styles.sectionTitle}>🚀 Mulai Cepat</Title>
        
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Paragraph style={styles.stepText}>1</Paragraph>
          </View>
          <Paragraph style={styles.stepDesc}>Tap tombol "Mulai Rekam" untuk merekam video</Paragraph>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Paragraph style={styles.stepText}>2</Paragraph>
          </View>
          <Paragraph style={styles.stepDesc}>Edit video dengan trim, effects, dan text overlay</Paragraph>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Paragraph style={styles.stepText}>3</Paragraph>
          </View>
          <Paragraph style={styles.stepDesc}>Export dengan kualitas pilihan Anda</Paragraph>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Paragraph style={styles.stepText}>4</Paragraph>
          </View>
          <Paragraph style={styles.stepDesc}>Bagikan ke media sosial atau simpan di galeri</Paragraph>
        </View>
      </View>

      {/* Info Footer */}
      <View style={styles.footer}>
        <Paragraph style={styles.footerTitle}>💡 Tips</Paragraph>
        <Paragraph style={styles.footerText}>
          • Gunakan cahaya yang cukup saat merekam{"\n"}
          • Stabilkan kamera agar video tidak buram{"\n"}
          • Durasi optimal: 30-45 detik untuk engagement maksimal{"\n"}
          • Gunakan filter yang sesuai dengan mood video
        </Paragraph>
      </View>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Paragraph style={styles.versionText}>VConnn v1.0.0</Paragraph>
        <Paragraph style={styles.versionSubtext}>Aplikasi Video Editor Mobile Gratis</Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#f0f0f0',
    fontSize: 14,
  },
  cardContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 15,
  },
  card: {
    marginHorizontal: 10,
    elevation: 3,
  },
  cardIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  cardDesc: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 13,
    color: '#666',
  },
  cardButton: {
    marginTop: 10,
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  featureContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  guideSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepDesc: {
    marginLeft: 15,
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff3e0',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  footerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#e65100',
  },
  footerText: {
    fontSize: 12,
    color: '#bf360c',
    lineHeight: 18,
  },
  versionContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  versionSubtext: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 4,
  },
});
