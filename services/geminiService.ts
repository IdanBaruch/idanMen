
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

// Base64 helper functions
export const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const encodeBase64 = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Audio Processing Logic
export class AudioManager {
  private inputContext: AudioContext | null = null;
  private outputContext: AudioContext | null = null;
  private nextStartTime: number = 0;
  private activeSources: Set<AudioBufferSourceNode> = new Set();
  private stream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;

  async init() {
    this.inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    this.outputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  startInput(onAudio: (blob: { data: string, mimeType: string }) => void) {
    if (!this.inputContext || !this.stream) return;
    const source = this.inputContext.createMediaStreamSource(this.stream);
    this.processor = this.inputContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        int16[i] = inputData[i] * 32768;
      }
      onAudio({
        data: encodeBase64(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
      });
    };

    source.connect(this.processor);
    this.processor.connect(this.inputContext.destination);
  }

  async playChunk(base64Data: string) {
    if (!this.outputContext) return;
    const bytes = decodeBase64(base64Data);
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = this.outputContext.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    const source = this.outputContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.outputContext.destination);
    
    this.nextStartTime = Math.max(this.nextStartTime, this.outputContext.currentTime);
    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;
    
    this.activeSources.add(source);
    source.onended = () => this.activeSources.delete(source);
  }

  stopAll() {
    this.activeSources.forEach(s => s.stop());
    this.activeSources.clear();
    this.nextStartTime = 0;
    if (this.processor) this.processor.disconnect();
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
  }
}

export const startLiveTriageSession = async (
  callbacks: {
    onAudioChunk: (base64Audio: string) => void;
    onTranscription: (text: string, role: 'user' | 'model') => void;
    onError: (err: any) => void;
    onInterrupted: () => void;
    onOpen: () => void;
  },
  persona: 'warm' | 'direct' = 'warm',
  customInstruction?: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const audioManager = new AudioManager();
  await audioManager.init();

  const baseInstruction = persona === 'direct' 
    ? 'שמך אמונה, את המלווה הדיגיטלית של שלוותה. היי ישירה, תכלס, בלי פלאף. כמו אחות במיון שאכפת לה באמת.'
    : 'שמך אמונה, את המלווה הדיגיטלית של שלוותה. היי רכה, אמפתית מאוד, השתמשי בדימויים מרגיעים.';

  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: persona === 'direct' ? 'Puck' : 'Kore' } },
      },
      systemInstruction: customInstruction || baseInstruction,
      inputAudioTranscription: {},
      outputAudioTranscription: {},
    },
    callbacks: {
      onopen: () => {
        callbacks.onOpen();
        audioManager.startInput((blob) => {
          sessionPromise.then(session => session.sendRealtimeInput({ media: blob }));
        });
      },
      onmessage: async (message: LiveServerMessage) => {
        if (message.serverContent?.modelTurn?.parts) {
          for (const part of message.serverContent.modelTurn.parts) {
            if (part.inlineData?.data) {
              audioManager.playChunk(part.inlineData.data);
              callbacks.onAudioChunk(part.inlineData.data);
            }
          }
        }
        if (message.serverContent?.inputTranscription) {
          callbacks.onTranscription(message.serverContent.inputTranscription.text, 'user');
        }
        if (message.serverContent?.outputTranscription) {
          callbacks.onTranscription(message.serverContent.outputTranscription.text, 'model');
        }
        if (message.serverContent?.interrupted) {
          audioManager.stopAll();
          callbacks.onInterrupted();
        }
      },
      onerror: (e) => callbacks.onError(e),
      onclose: () => audioManager.stopAll(),
    }
  });

  return { sessionPromise, audioManager };
};
