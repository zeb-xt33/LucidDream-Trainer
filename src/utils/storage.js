const STORE_KEY = 'dream-training-v1'

const defaults = () => ({
  onboarded: false,
  dreams: [],
  practiceDays: {},
  reminder: { enabled: false, time: '20:30' },
  settings: { reducedMotion: false }
})

function readRaw() {
  try {
    // uni storage is available on H5 and mini-program targets.
    const value = uni.getStorageSync(STORE_KEY)
    return value && typeof value === 'object' ? value : null
  } catch {
    return null
  }
}

export function loadState() {
  const saved = readRaw()
  return saved ? { ...defaults(), ...saved, reminder: { ...defaults().reminder, ...saved.reminder } } : defaults()
}

export function saveState(state) {
  try { uni.setStorageSync(STORE_KEY, state); return true } catch { return false }
}

export function clearState() {
  try { uni.removeStorageSync(STORE_KEY); return true } catch { return false }
}
