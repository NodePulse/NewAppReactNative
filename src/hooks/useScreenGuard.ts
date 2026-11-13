import { useCallback } from 'react';
import { NativeModules, Platform, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { ScreenGuard } = NativeModules;

export const enableScreenGuard = () => {
  if (Platform.OS === 'android') {
    if (!ScreenGuard) {
      console.warn(
        '[ScreenGuard] NativeModules.ScreenGuard is undefined! Rebuild the Android app (npx react-native run-android) after adding native Kotlin modules.',
      );
      ToastAndroid.show(
        '⚠️ ScreenGuard: Native module not found. Please rebuild the app (npx react-native run-android)',
        ToastAndroid.LONG,
      );
      return;
    }
    ScreenGuard.enable();
    console.log('[ScreenGuard] FLAG_SECURE enabled');
  }
};

export const disableScreenGuard = () => {
  if (Platform.OS === 'android') {
    if (!ScreenGuard) {
      return;
    }
    ScreenGuard.disable();
    console.log('[ScreenGuard] FLAG_SECURE disabled');
  }
};

export const useScreenGuard = (active = true) => {
  useFocusEffect(
    useCallback(() => {
      if (!active) {
        return;
      }

      enableScreenGuard();
      return () => {
        disableScreenGuard();
      };
    }, [active]),
  );
};
