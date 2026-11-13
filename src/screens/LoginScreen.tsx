import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck, Lock, Mail, ChevronRight, Sparkles } from 'lucide-react-native';
import {
  ScreenContainer,
  FormInput,
  GlassView,
  NeumorphicButton,
} from '../components/ui';
import { AppRoutes } from '../navigations/AppRoutes';
import { RootStackNavigationProp } from '../navigations/types';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';

export default function LoginScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('sachin@cards-crm.io');
  const [password, setPassword] = useState('••••••••••••');

  return (
    <ScreenContainer
      primaryColor={Colors.blueNavy}
      secondaryColor={Colors.violet}
      tertiaryColor={Colors.emeraldDark}
    >
      <View style={styles.content}>
        {/* Logo & Brand Header */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <ShieldCheck color={Colors.cyan} size={32} />
          </View>
          <Text style={styles.brandTitle}>OmniCard CRM</Text>
          <Text style={styles.brandSubtitle}>
            Credit & Debit Card Products Underwriting Suite
          </Text>
        </View>

        {/* Glassmorphic Login Card */}
        <GlassView style={styles.loginCard} borderRadius={24} highlightIntensity="high">
          <Text style={styles.formTitle}>Officer Authentication</Text>

          {/* Email Input */}
          <FormInput
            label="CORPORATE EMAIL"
            icon={<Mail color={Colors.white50} size={18} />}
            placeholder="officer@cards-crm.io"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <FormInput
            label="ACCESS KEY / PASSWORD"
            icon={<Lock color={Colors.white50} size={18} />}
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <NeumorphicButton
            onPress={() => navigation.navigate(AppRoutes.MAIN_TABS)}
            active={true}
            accentColor={Colors.blueDark}
            borderRadius={14}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>Enter CRM Dashboard</Text>
            <ChevronRight color={Colors.white} size={18} />
          </NeumorphicButton>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate(AppRoutes.REGISTER_SCREEN)}
          >
            <Text style={styles.registerLinkText}>
              Need Officer Access? <Text style={styles.registerHighlight}>Request Credentials</Text>
            </Text>
          </TouchableOpacity>
        </GlassView>

        {/* Security Stamp */}
        <View style={styles.securityFooter}>
          <Sparkles color={Colors.success} size={13} />
          <Text style={styles.securityText}>
            256-Bit Financial Grade Encryption • SOC2 Certified
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: CommonStyles.authContent,
  brandContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.cyan15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cyan35,
    marginBottom: 12,
  },
  brandTitle: CommonStyles.brandTitle,
  brandSubtitle: CommonStyles.brandSubtitle,
  loginCard: {
    padding: 22,
  },
  formTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },
  loginBtn: {
    marginTop: 8,
    paddingVertical: 14,
  },
  loginBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  registerLinkText: {
    color: Colors.white60,
    fontSize: 12,
  },
  registerHighlight: {
    color: Colors.cyan,
    fontWeight: '700',
  },
  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
  },
  securityText: {
    color: Colors.white45,
    fontSize: 11,
  },
});
