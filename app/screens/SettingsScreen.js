import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, Alert, Linking } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [highQuality, setHighQuality] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleAbout = () => {
    Alert.alert(
      'Tentang VConnn',
      'VConnn v1.0.0\n\nAplikasi pembuat video pendek 100% gratis dengan fitur editing profesional.\n\n© 2024 VConnn. Semua hak dilindungi.',
      [{ text: 'OK' }]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Kirim Feedback',
      'Terima kasih atas feedback Anda! Tim kami akan segera menghubungi Anda.',
      [
        { text: 'Batal' },
        { text: 'Email', onPress: () => Linking.openURL('mailto:feedback@vconnn.app') }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Hapus Cache',
      'Apakah Anda yakin ingin menghapus cache? Ini akan membebaskan ruang penyimpanan.',
      [
        { text: 'Batal' },
        { 
          text: 'Hapus',
          onPress: () => Alert.alert('Sukses', 'Cache berhasil dihapus (150 MB)'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Title style={styles.headerTitle}>⚙️ Pengaturan</Title>
      </View>

      {/* Preferences Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>🎛️ Preferensi</Title>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialCommunityIcons name="bell" size={24} color="#6200ee" />
              <View style={styles.labelText}>
                <Paragraph style={styles.settingText}>Notifikasi</Paragraph>
                <Paragraph style={styles.settingSubtext}>Terima pemberitahuan penting</Paragraph>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              color="#6200ee"
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialCommunityIcons name="content-save" size={24} color="#6200ee" />
              <View style={styles.labelText}>
                <Paragraph style={styles.settingText}>Simpan Otomatis</Paragraph>
                <Paragraph style={styles.settingSubtext}>Draft video tersimpan otomatis</Paragraph>
              </View>
            </View>
            <Switch
              value={autoSaveEnabled}
              onValueChange={setAutoSaveEnabled}
              color="#6200ee"
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialCommunityIcons name="hd" size={24} color="#6200ee" />
              <View style={styles.labelText}>
                <Paragraph style={styles.settingText}>Kualitas Tinggi</Paragraph>
                <Paragraph style={styles.settingSubtext}>Export dengan kualitas 1080p</Paragraph>
              </View>
            </View>
            <Switch
              value={highQuality}
              onValueChange={setHighQuality}
              color="#6200ee"
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#6200ee" />
              <View style={styles.labelText}>
                <Paragraph style={styles.settingText}>Dark Mode</Paragraph>
                <Paragraph style={styles.settingSubtext}>Tema gelap untuk mata Anda</Paragraph>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              color="#6200ee"
            />
          </View>
        </Card.Content>
      </Card>

      {/* Storage Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>💾 Penyimpanan</Title>
          
          <View style={styles.storageItem}>
            <View style={styles.storageInfo}>
              <MaterialCommunityIcons name="video-multiple" size={20} color="#2196f3" />
              <View style={styles.storageText}>
                <Paragraph style={styles.storageLabel}>Total Video</Paragraph>
                <Paragraph style={styles.storageSubtext}>12 video tersimpan</Paragraph>
              </View>
            </View>
            <Paragraph style={styles.storageValue}>450 MB</Paragraph>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.storageItem}>
            <View style={styles.storageInfo}>
              <MaterialCommunityIcons name="cache" size={20} color="#ff9800" />
              <View style={styles.storageText}>
                <Paragraph style={styles.storageLabel}>Cache</Paragraph>
                <Paragraph style={styles.storageSubtext}>File cache sementara</Paragraph>
              </View>
            </View>
            <Paragraph style={styles.storageValue}>150 MB</Paragraph>
          </View>

          <Button
            mode="outlined"
            icon="trash-can"
            style={styles.button}
            onPress={handleClearCache}
          >
            Hapus Cache
          </Button>
        </Card.Content>
      </Card>

      {/* Support Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>🆘 Dukungan</Title>
          
          <Button
            mode="outlined"
            icon="help-circle"
            style={styles.button}
            onPress={() => Alert.alert(
              'Bantuan & FAQ',
              'Kunjungi website kami untuk panduan lengkap:\nvconnn.app/help'
            )}
          >
            Bantuan & FAQ
          </Button>

          <Button
            mode="outlined"
            icon="email"
            style={styles.button}
            onPress={handleFeedback}
          >
            Kirim Feedback
          </Button>

          <Button
            mode="outlined"
            icon="bug"
            style={styles.button}
            onPress={() => Alert.alert(
              'Laporkan Bug',
              'Terima kasih telah membantu kami memperbaiki aplikasi. Bug report Anda sangat berharga!'
            )}
          >
            Laporkan Bug
          </Button>

          <Button
            mode="outlined"
            icon="message-question"
            style={styles.button}
            onPress={() => Alert.alert(
              'Hubungi Kami',
              'Email: support@vconnn.app\nWhatsApp: +62 xxx-xxxx-xxxx'
            )}
          >
            Hubungi Kami
          </Button>
        </Card.Content>
      </Card>

      {/* About Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>ℹ️ Tentang</Title>
          
          <Button
            mode="outlined"
            icon="information"
            style={styles.button}
            onPress={handleAbout}
          >
            Tentang VConnn
          </Button>

          <Button
            mode="outlined"
            icon="scale-balance"
            style={styles.button}
            onPress={() => Alert.alert(
              'Lisensi',
              'VConnn dilisensikan di bawah MIT License.\n\nAnda bebas menggunakan, memodifikasi, dan mendistribusikan aplikasi ini.'
            )}
          >
            Lisensi
          </Button>

          <Button
            mode="outlined"
            icon="shield-check"
            style={styles.button}
            onPress={() => Alert.alert(
              'Kebijakan Privasi',
              'Data Anda aman bersama kami.\n\nKami TIDAK mengumpulkan data pribadi Anda. Semua video disimpan secara lokal di device Anda.'
            )}
          >
            Kebijakan Privasi
          </Button>

          <Button
            mode="outlined"
            icon="file-document"
            style={styles.button}
            onPress={() => Alert.alert(
              'Syarat & Ketentuan',
              'Baca syarat dan ketentuan penggunaan aplikasi VConnn.'
            )}
          >
            Syarat & Ketentuan
          </Button>
        </Card.Content>
      </Card>

      {/* Social Media Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>📱 Ikuti Kami</Title>
          
          <View style={styles.socialContainer}>
            <Button
              mode="outlined"
              icon="facebook"
              compact
              onPress={() => Alert.alert('Facebook', 'Kunjungi halaman Facebook kami')}
              style={styles.socialButton}
            >
              Facebook
            </Button>
            <Button
              mode="outlined"
              icon="instagram"
              compact
              onPress={() => Alert.alert('Instagram', 'Follow @vconnn_app di Instagram')}
              style={styles.socialButton}
            >
              Instagram
            </Button>
            <Button
              mode="outlined"
              icon="twitter"
              compact
              onPress={() => Alert.alert('Twitter', 'Follow @vconnn_app di Twitter')}
              style={styles.socialButton}
            >
              Twitter
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Version Info */}
      <View style={styles.footer}>
        <Paragraph style={styles.footerText}>VConnn v1.0.0</Paragraph>
        <Paragraph style={styles.footerSubtext}>© 2024 - Aplikasi Video Editor Gratis</Paragraph>
        <Paragraph style={styles.footerSubtext}>Build: 2026.08.27</Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#6200ee',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    margin: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  labelText: {
    flex: 1,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtext: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    marginVertical: 8,
  },
  storageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  storageText: {
    flex: 1,
  },
  storageLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  storageSubtext: {
    fontSize: 12,
    color: '#999',
  },
  storageValue: {
    fontWeight: '700',
    color: '#6200ee',
    fontSize: 14,
  },
  button: {
    marginVertical: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  socialButton: {
    flex: 1,
    minWidth: 100,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
