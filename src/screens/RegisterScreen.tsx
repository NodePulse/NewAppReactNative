import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Mail, User, Building, ArrowLeft, Check } from 'lucide-react-native';
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

export default function RegisterScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [fullName, setFullName] = useState('Sachin Sharma');
  const [email, setEmail] = useState('sachin@cards-crm.io');
  const [branch, setBranch] = useState('Commercial Cards & High Net Worth');

  return (
    <ScreenContainer
      primaryColor={Colors.violet}
      secondaryColor={Colors.blueNavy}
      tertiaryColor={Colors.emeraldDark}
    >
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={Colors.white} size={18} />
          <Text style={styles.backText}>Back to Sign In</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.brandTitle}>Officer Registration</Text>
          <Text style={styles.brandSubtitle}>
            Request CRM Portal Credentials for Card Issuance
          </Text>
        </View>

        {/* Registration Form */}
        <GlassView style={styles.formCard} borderRadius={24} highlightIntensity="high">
          <FormInput
            label="FULL NAME"
            icon={<User color={Colors.white50} size={18} />}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />

          <FormInput
            label="INSTITUTIONAL EMAIL"
            icon={<Mail color={Colors.white50} size={18} />}
            value={email}
            onChangeText={setEmail}
            placeholder="officer@bank.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            label="ASSIGNED BRANCH / CARDS DIVISION"
            icon={<Building color={Colors.white50} size={18} />}
            value={branch}
            onChangeText={setBranch}
            placeholder="Cards Division"
          />

          <NeumorphicButton
            onPress={() => navigation.navigate(AppRoutes.MAIN_TABS)}
            active={true}
            accentColor={Colors.emerald}
            borderRadius={14}
            style={styles.submitBtn}
          >
            <Check color={Colors.white} size={18} />
            <Text style={styles.submitBtnText}>Register & Launch CRM</Text>
          </NeumorphicButton>
        </GlassView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: CommonStyles.authContent,
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  header: {
    marginBottom: 22,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: Colors.white60,
    marginTop: 4,
  },
  formCard: {
    padding: 22,
  },
  submitBtn: {
    marginTop: 10,
    paddingVertical: 14,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
});
