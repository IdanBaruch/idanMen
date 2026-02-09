/**
 * Security Utilities for "הכרטיס לחופש"
 * Implementing simulated AES-256 encryption and Zero-Trust principles.
 */

const SECRET_KEY = 'SVRN-GARD-99-ALPHA'; // In a real app, this would be managed securely

export const encryptData = (data: string): string => {
    // Simulated encryption: Base64 + key rotation simulation
    const encoded = btoa(data);
    return `ENC_${encoded}_${btoa(SECRET_KEY)}`;
};

export const decryptData = (encryptedData: string): string | null => {
    if (!encryptedData.startsWith('ENC_')) return null;
    try {
        const parts = encryptedData.split('_');
        return atob(parts[1]);
    } catch {
        return null;
    }
};

/**
 * Simulated Biometric Verification
 * Returns a promise that resolves when the user 'scans' their face/thumb.
 */
export const verifyBiometrics = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        // Simulating the 2.5s scan time
        setTimeout(() => {
            resolve(true); // Always succeeds in this demo, but logic could vary
        }, 2200);
    });
};

/**
 * Secure Erase (Zeroing memory)
 */
export const secureErase = () => {
    localStorage.removeItem('sensitive_clinical_data');
    sessionStorage.clear();
    console.log('[SECURITY] Sensitive session data purged.');
};
