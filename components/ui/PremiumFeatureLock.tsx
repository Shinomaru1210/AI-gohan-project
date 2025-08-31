import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PremiumFeatureLockProps {
  onUpgrade: () => void;
  title?: string;
  description?: string;
  featureName?: string;
}

const { width } = Dimensions.get('window');

const PremiumFeatureLock: React.FC<PremiumFeatureLockProps> = ({
  onUpgrade,
  title = 'プレミアム機能',
  description = 'この機能はプレミアムプランでのみ利用できます',
  featureName = 'AI機能',
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.95)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="crown" size={48} color="#FFD700" />
          </View>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <View style={styles.featureBadge}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.featureName}>{featureName}</Text>
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={onUpgrade}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8E53']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.upgradeButtonGradient}
            >
              <MaterialCommunityIcons name="crown" size={20} color="#fff" />
              <Text style={styles.upgradeButtonText}>プレミアムにアップグレード</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFF8F2',
    borderRadius: 50,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  featureName: {
    fontSize: 14,
    color: '#FF6B35',
    fontFamily: 'NotoSansJP-Bold',
  },
  upgradeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  upgradeButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
});

export default PremiumFeatureLock;

