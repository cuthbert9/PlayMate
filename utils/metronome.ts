import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

let metronomeSound: Sound | null = null;
let metronomeInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Load the metronome click sound
 */
export async function loadMetronomeSound(): Promise<void> {
    try {
        // If sound already loaded, unload it first to ensure fresh state
        if (metronomeSound) {
            await metronomeSound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(
            require('@/assets/audio/click.mp3')
        );
        metronomeSound = sound;

        // Configure audio session
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });
    } catch (error) {
        console.error('Error loading metronome sound:', error);
    }
}

/**
 * Play the metronome click sound
 * Fire-and-forget style to not block timing
 */
export async function playClick(): Promise<void> {
    if (!metronomeSound) return;

    try {
        // Stop and replay from beginning
        await metronomeSound.replayAsync();
    } catch (error) {
        console.error('Error playing click:', error);
        // Try to reload if it failed
        try {
            await loadMetronomeSound();
        } catch (e) {
            console.error('Failed to reload sound:', e);
        }
    }
}

/**
 * Start the metronome with given tempo
 * @param tempo BPM (beats per minute)
 * @param onTick Callback function to call on each beat
 */
export function startMetronome(tempo: number, onTick: () => void): void {
    stopMetronome(); // Clear any existing interval

    // Safety check for tempo
    const safeTempo = Math.max(40, Math.min(240, tempo || 115));
    const intervalMs = (60 / safeTempo) * 1000;

    // Explicitly play first click immediately
    playClick().catch(console.error);

    metronomeInterval = setInterval(() => {
        // Fire audio asynchronously so it doesn't block the logic tick
        playClick().catch(console.error);

        // Call state update
        onTick();
    }, intervalMs);
}

/**
 * Stop the metronome
 */
export function stopMetronome(): void {
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
    }
}

/**
 * Cleanup metronome resources
 */
export async function unloadMetronome(): Promise<void> {
    stopMetronome();

    if (metronomeSound) {
        try {
            await metronomeSound.unloadAsync();
        } catch (e) {
            console.error('Error unloading sound:', e);
        }
        metronomeSound = null;
    }
}
