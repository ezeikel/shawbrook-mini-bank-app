import * as LocalAuthentication from 'expo-local-authentication';

export const BiometricAuth = {
  isBiometricAvailable: async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },

  getSupportedTypes: async (): Promise<LocalAuthentication.AuthenticationType[]> => {
    return await LocalAuthentication.supportedAuthenticationTypesAsync();
  },

  authenticate: async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your bank account',
        fallbackLabel: 'Use PIN',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  },

  getBiometricTypeName: (types: LocalAuthentication.AuthenticationType[]): string => {
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'Face ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Touch ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Iris Scan';
    }
    return 'Biometric';
  },


  getBiometricStatus: async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      return {
        hasHardware,
        isEnrolled,
        supportedTypes,
        isAvailable: hasHardware && isEnrolled,
        typeName: BiometricAuth.getBiometricTypeName(supportedTypes)
      };
    } catch (error) {
      console.error('Error getting biometric status:', error);
      return {
        hasHardware: false,
        isEnrolled: false,
        supportedTypes: [],
        isAvailable: false,
        typeName: 'Unknown'
      };
    }
  }
}; 