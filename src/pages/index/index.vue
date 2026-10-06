<template>
  <view class="app-shell">
    <view class="topbar">
      <view class="brand-mark">月</view>
      <view class="brand-copy"><text class="brand-name">入梦</text><text class="brand-caption">温柔地认识自己的梦</text></view>
      <view class="top-date">{{ todayLabel }}</view>
    </view>

    <scroll-view class="main-scroll" scroll-y>
      <template v-if="tab === 'home'">
        <view class="welcome-row"><view><text class="eyebrow">{{ greeting }}</text><text class="page-title">今天，慢慢练习</text></view><view class="moon-orbit"><text>☾</text></view></view>
        <view class="hero-card">
          <view class="hero-kicker"><view class="live-dot"></view><text>你的练习旅程</text></view>
          <text class="hero-title">先记住梦，<br />再学会觉察。</text>
          <text class="hero-body">清醒梦练习没有保证的结果。今天做一点点，也是在认识自己的睡眠。</text>
          <view class="hero-foot"><text>第 {{ journeyDay }} 天</text><view class="hero-line"><view :style="{ width: progressPercent + '%' }"></view></view><text>{{ progressPercent }}%</text></view>
        </view>

        <view class="section-head"><view><text class="section-title">今日练习</text><text class="section-note">任选一项开始，不需要赶进度</text></view><text class="tiny-pill">{{ todayDoneCount }}/2 完成</text></view>
        <view class="task-card" :class="{ completed: todayDone('reality') }">
          <view class="task-icon sky">◉</view><view class="task-content"><text class="task-title">现实检验</text><text class="task-description">停下来观察周围，问问自己：我现在在做梦吗？</text><text class="task-duration">白天 · 约 1 分钟</text></view><button class="round-action" @click="togglePractice('reality')">{{ todayDone('reality') ? '✓' : '→' }}</button>
        </view>
        <view class="task-card" :class="{ completed: todayDone('intention') }">
          <view class="task-icon peach">✳</view><view class="task-content"><text class="task-title">睡前意向</text><text class="task-description">回想一个梦境片段，轻轻提醒自己留意梦中线索。</text><text class="task-duration">睡前 · 约 2 分钟</text></view><button class="round-action" @click="togglePractice('intention')">{{ todayDone('intention') ? '✓' : '→' }}</button>
        </view>

        <view class="section-head journal-heading"><view><text class="section-title">醒来时记一笔</text><text class="section-note">记下片段，也是在训练梦境回忆</text></view><button class="text-action" @click="openDream()">＋ 记录</button></view>
        <view class="journal-prompt" @click="openDream()"><view class="prompt-icon">✎</view><view class="prompt-copy"><text class="prompt-title">还记得昨晚的梦吗？</text><text class="prompt-desc">哪怕只是一种感觉，也可以写下来。</text></view><text class="chevron">›</text></view>
        <view class="gentle-note"><text class="note-star">✦</text><text>如果练习影响睡眠或让你感到不舒服，暂停几天，照顾好休息。</text></view>
      </template>

      <template v-else-if="tab === 'journal'">
        <view class="page-intro"><text class="eyebrow">DREAM JOURNAL</text><text class="page-title">梦境日记</text><text class="intro-copy">醒来后尽量先记下片段。内容只保存在这台设备上。</text></view>
        <button class="primary-button add-dream" @click="openDream()">＋ 记录一个梦</button>
        <view v-if="!state.dreams.length" class="empty-state"><view class="empty-moon">☾</view><text class="empty-title">这里会慢慢装满梦</text><text class="empty-copy">不必写得完整，几个词、一种情绪都可以。</text></view>
        <view v-else class="dream-list"><view v-for="dream in sortedDreams" :key="dream.id" class="dream-card" @click="openDream(dream)"><view class="dream-card-top"><text class="dream-date">{{ formatDate(dream.date) }}</text><text class="lucid-tag" v-if="dream.lucid">清醒梦</text><text class="dream-edit">编辑 ›</text></view><text class="dream-preview">{{ dream.text || '（没有添加文字）' }}</text><view class="dream-meta"><text>回忆清晰度 {{ dream.clarity }}/5</text><text>{{ dream.mood || '未记录感受' }}</text></view></view></view>
        <view class="privacy-note">🔒 梦境记录保存在设备本地，可在设置中清除全部数据。</view>
      </template>

      <template v-else-if="tab === 'progress'">
        <view class="page-intro"><text class="eyebrow">YOUR RHYTHM</text><text class="page-title">练习回顾</text><text class="intro-copy">看看自己最近的节奏，不用和任何人比较。</text></view>
        <view class="stats-grid"><view class="stat-card"><text class="stat-number">{{ weekDreams.length }}</text><text class="stat-label">本周记录的梦</text><text class="stat-mark">☾</text></view><view class="stat-card"><text class="stat-number">{{ weekPracticeCount }}</text><text class="stat-label">本周练习次数</text><text class="stat-mark">✳</text></view></view>
        <view class="section-head week-head"><view><text class="section-title">最近 7 天</text><text class="section-note">每天都是新的开始</text></view><text class="week-total">{{ weekPracticeCount }} 次练习</text></view>
        <view class="week-chart"><view v-for="day in weekDays" :key="day.key" class="day-column"><view class="bar-track"><view class="bar-fill" :class="{ active: day.count > 0 }" :style="{ height: Math.max(day.count ? 55 + day.count * 20 : 8, 8) + '%' }"></view></view><text class="day-label">{{ day.label }}</text><view class="day-dot" :class="{ checked: day.count > 0 }">{{ day.count ? '✓' : '' }}</view></view></view>
        <view class="reflection-card"><text class="reflection-icon">✧</text><text class="reflection-title">给自己的小小回顾</text><text class="reflection-copy">{{ reflection }}</text></view>
        <view class="section-head recent-heading"><view><text class="section-title">最近的梦</text><text class="section-note">你的记录会帮助你发现重复出现的线索</text></view></view>
        <view v-if="weekDreams.length" class="recent-dreams"><view v-for="dream in weekDreams.slice(0, 3)" :key="dream.id" class="recent-item"><view class="recent-date"><text>{{ shortDay(dream.date) }}</text><view></view></view><view><text class="recent-text">{{ dream.text || '留下一条梦境记录' }}</text><text class="recent-sub">回忆清晰度 {{ dream.clarity }}/5</text></view></view></view>
        <view v-else class="small-empty">这周还没有梦境记录，下一次醒来时可以试着写几笔。</view>
      </template>

      <template v-else>
        <view class="page-intro"><text class="eyebrow">YOUR SPACE</text><text class="page-title">设置与说明</text><text class="intro-copy">让练习适应你的生活，而不是相反。</text></view>
        <view class="settings-group"><view class="setting-row"><view><text class="setting-title">每日温和提醒</text><text class="setting-desc">仅在你选择的白天或傍晚时间提示</text></view><switch :checked="state.reminder.enabled" color="#547b70" @change="toggleReminder" /></view><view class="setting-row" @click="chooseReminderTime"><view><text class="setting-title">提醒时间</text><text class="setting-desc">避开夜间休息时段（08:00–21:00）</text></view><text class="setting-value">{{ state.reminder.time }}　›</text></view></view>
        <view class="reminder-status" :class="{ on: state.reminder.enabled }"><text class="status-icon">{{ state.reminder.enabled ? '◷' : '○' }}</text><text>{{ reminderStatus }}</text></view><view class="reminder-footnote">提醒会在应用打开时显示；关闭应用后不会推送。微信订阅通知需后续接入服务端。</view>
        <view class="settings-group info-group"><text class="group-title">关于清醒梦练习</text><view class="info-row"><text class="info-number">01</text><view><text class="info-title">梦境记录</text><text class="info-desc">醒来时回想并记录梦境片段，有助于留意自己的梦境线索。</text></view></view><view class="info-row"><text class="info-number">02</text><view><text class="info-title">现实检验</text><text class="info-desc">白天暂停片刻，认真观察环境并询问自己是否在做梦。</text></view></view><view class="info-row"><text class="info-number">03</text><view><text class="info-title">睡前意向</text><text class="info-desc">温和地设定意向即可；不需要减少睡眠或半夜起床练习。</text></view></view></view>
        <view class="disclaimer-card"><text class="disclaimer-title">请把休息放在第一位</text><text class="disclaimer-copy">清醒梦练习不能保证带来清醒梦，也不是医疗建议或治疗。如果练习影响睡眠、加重焦虑或让你不舒服，请停止练习；持续困扰时可向专业人士求助。</text></view>
        <button class="danger-button" @click="confirmClear">清除本机全部练习数据</button>
        <text class="version-copy">入梦 · 0.1.0　|　数据仅保存在本机</text>
      </template>
    </scroll-view>

    <view class="tabbar"><view v-for="item in tabs" :key="item.key" class="tab-item" :class="{ selected: tab === item.key }" @click="tab = item.key"><text class="tab-icon">{{ item.icon }}</text><text class="tab-label">{{ item.label }}</text><view v-if="tab === item.key" class="tab-indicator"></view></view></view>

    <view v-if="editorOpen" class="modal-backdrop" @click.self="closeDream"><view class="editor-sheet"><view class="sheet-handle"></view><view class="sheet-heading"><view><text class="eyebrow">DREAM JOURNAL</text><text class="sheet-title">{{ editingId ? '编辑记录' : '记下这个梦' }}</text></view><text class="close-button" @click="closeDream">×</text></view><view class="form-label">日期</view><picker mode="date" :value="draft.date" :end="todayISO" @change="draft.date = $event.detail.value"><view class="picker-control">{{ formatDate(draft.date) }} <text>⌄</text></view></picker><view class="form-label">梦境片段</view><textarea v-model="draft.text" class="dream-input" maxlength="1500" placeholder="写下你记得的画面、人物、地点或感觉……" auto-height /><view class="form-label clarity-label">回忆清晰度 <text>{{ draft.clarity }}/5</text></view><slider :value="draft.clarity" min="1" max="5" step="1" activeColor="#547b70" backgroundColor="#e5eae4" @change="draft.clarity = $event.detail.value"/><view class="editor-options"><view class="lucid-toggle" :class="{ picked: draft.lucid }" @click="draft.lucid = !draft.lucid"><view class="checkbox">{{ draft.lucid ? '✓' : '' }}</view><text>我意识到自己在做梦</text></view><view class="mood-picker"><text>感受</text><picker :range="moods" @change="draft.mood = moods[$event.detail.value]"><view>{{ draft.mood || '选择' }}　⌄</view></picker></view></view><view class="editor-actions"><button v-if="editingId" class="delete-button" @click="deleteDream">删除</button><button class="primary-button save-button" @click="saveDream">保存记录</button></view><text class="editor-privacy">🔒 记录仅保存在本机</text></view></view></view>

    <view v-if="!state.onboarded" class="modal-backdrop onboarding-backdrop"><view class="onboarding-card"><view class="onboard-moon">☾</view><text class="eyebrow">A GENTLE PRACTICE</text><text class="onboard-title">欢迎来到入梦</text><text class="onboard-copy">从记住梦开始，用温和的日间练习培养觉察。每个人的体验不同，没有必须达到的目标。</text><view class="onboard-points"><text>✦ 不打断夜间睡眠</text><text>✦ 练习完全由你决定</text><text>✦ 数据只保存在本机</text></view><button class="primary-button onboard-cta" @click="finishOnboarding">开始我的练习</button><text class="onboard-skip" @click="finishOnboarding">先看看再说</text></view></view>
  </view>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { clearState, loadState, saveState } from '../../utils/storage.js'

const state = reactive(loadState())
const tab = ref('home')
const editorOpen = ref(false)
const editingId = ref('')
const todayISO = new Date().toISOString().slice(0, 10)
const moods = ['平静', '愉快', '奇怪', '紧张', '难以描述']
const draft = reactive({ date: todayISO, text: '', clarity: 3, lucid: false, mood: '' })
let reminderTimer
let lastReminderKey = ''
const tabs = [{ key: 'home', label: '今日', icon: '⌂' }, { key: 'journal', label: '梦境', icon: '☾' }, { key: 'progress', label: '回顾', icon: '▥' }, { key: 'settings', label: '设置', icon: '⚙' }]

watch(state, value => saveState(value), { deep: true })
const todayLabel = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date())
const greeting = new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好'
const sortedDreams = computed(() => [...state.dreams].sort((a, b) => b.date.localeCompare(a.date)))
const journeyDay = computed(() => {
  const days = Object.keys(state.practiceDays).concat(state.dreams.map(d => d.date)).sort()
  if (!days.length) return 1
  return Math.max(1, Math.floor((Date.now() - new Date(days[0] + 'T00:00:00').getTime()) / 86400000) + 1)
})
const progressPercent = computed(() => Math.min(100, Math.round((Object.keys(state.practiceDays).length + state.dreams.length) / 14 * 100)))
const todayDoneCount = computed(() => ['reality', 'intention'].filter(todayDone).length)
const todayDone = key => Boolean(state.practiceDays[todayISO]?.[key])
const weekDays = computed(() => Array.from({ length: 7 }, (_, index) => {
  const date = new Date(); date.setDate(date.getDate() - (6 - index))
  const key = date.toISOString().slice(0, 10)
  return { key, label: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], count: Object.values(state.practiceDays[key] || {}).filter(Boolean).length }
}))
const weekPracticeCount = computed(() => weekDays.value.reduce((total, day) => total + day.count, 0))
const weekDreams = computed(() => sortedDreams.value.filter(dream => dream.date >= weekDays.value[0].key))
const reflection = computed(() => weekPracticeCount.value === 0 && weekDreams.value.length === 0 ? '从一条梦境记录或一次短暂停顿开始就好。你可以按自己的节奏来。' : `这周你完成了 ${weekPracticeCount.value} 次练习，记录了 ${weekDreams.value.length} 个梦。谢谢你留出时间观察自己的体验。`)
const reminderStatus = computed(() => !state.reminder.enabled ? '提醒已关闭。你仍可以随时在首页开始练习。' : `已设置每日 ${state.reminder.time} 的应用内提示；夜间不会提醒。`)

onMounted(() => { reminderTimer = setInterval(checkReminder, 30000); checkReminder() })
onUnmounted(() => { if (reminderTimer) clearInterval(reminderTimer) })

function checkReminder() {
  if (!state.reminder.enabled) return
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const key = `${now.toISOString().slice(0, 10)}-${time}`
  if (time !== state.reminder.time || key === lastReminderKey) return
  lastReminderKey = key
  // #ifdef H5
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    new Notification('入梦 · 温和提醒', { body: '如果方便，停下来做一次现实检验。也可以跳过今天。' })
    return
  }
  // #endif
  uni.showToast({ title: '小小提醒：可以做一次现实检验', icon: 'none', duration: 3000 })
}

function togglePractice(key) {
  if (!state.practiceDays[todayISO]) state.practiceDays[todayISO] = {}
  state.practiceDays[todayISO][key] = !state.practiceDays[todayISO][key]
  uni.showToast({ title: state.practiceDays[todayISO][key] ? '已记下，做得很好' : '已撤销', icon: 'none' })
}
function finishOnboarding() { state.onboarded = true }
function openDream(dream) {
  editingId.value = dream?.id || ''
  Object.assign(draft, dream ? { ...dream } : { date: todayISO, text: '', clarity: 3, lucid: false, mood: '' })
  editorOpen.value = true
}
function closeDream() { editorOpen.value = false }
function saveDream() {
  if (!draft.text.trim()) { uni.showToast({ title: '写下一点梦境片段再保存吧', icon: 'none' }); return }
  const record = { ...draft, text: draft.text.trim(), id: editingId.value || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
  const index = state.dreams.findIndex(item => item.id === record.id)
  if (index >= 0) state.dreams.splice(index, 1, record); else state.dreams.unshift(record)
  editorOpen.value = false
  tab.value = 'journal'
  uni.showToast({ title: '已保存在本机', icon: 'success' })
}
function deleteDream() {
  uni.showModal({ title: '删除这条记录？', content: '删除后无法恢复。', success: result => { if (result.confirm) { state.dreams = state.dreams.filter(item => item.id !== editingId.value); editorOpen.value = false } } })
}
function formatDate(value) { if (!value) return ''; const [year, month, day] = value.split('-'); return `${year}年${Number(month)}月${Number(day)}日` }
function shortDay(value) { return `${Number(value.slice(5, 7))}/${Number(value.slice(8, 10))}` }
function toggleReminder(event) {
  state.reminder.enabled = event.detail.value
  if (!state.reminder.enabled) { uni.showToast({ title: '提醒已关闭', icon: 'none' }); return }
  // H5 notification permission is optional; the in-app reminder remains available on all targets.
  // #ifdef H5
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') uni.showToast({ title: '系统通知未开启，应用内提醒仍可用', icon: 'none' })
    })
  }
  // #endif
  uni.showToast({ title: '提醒时间已保存', icon: 'none' })
}
function chooseReminderTime() {
  uni.showActionSheet({ itemList: ['08:30', '12:30', '18:30', '20:30'], success: result => {
    state.reminder.time = ['08:30', '12:30', '18:30', '20:30'][result.tapIndex]
    if (state.reminder.enabled) uni.showToast({ title: `提醒时间已改为 ${state.reminder.time}`, icon: 'none' })
  } })
}
function confirmClear() {
  uni.showModal({ title: '清除全部本机数据？', content: '梦境记录、练习进度和提醒设置都会删除，且无法恢复。', confirmText: '清除数据', confirmColor: '#a45648', success: result => {
    if (result.confirm) { clearState(); Object.assign(state, { onboarded: true, dreams: [], practiceDays: {}, reminder: { enabled: false, time: '20:30' }, settings: { reducedMotion: false } }); uni.showToast({ title: '本机数据已清除', icon: 'none' }) }
  } })
}
</script>

<style>
.app-shell{height:100vh;display:flex;flex-direction:column;background:#f6f7f3;color:#263a37}.topbar{height:74px;flex:none;display:flex;align-items:center;padding:0 22px;gap:10px}.brand-mark{width:34px;height:34px;border-radius:50%;background:#dce8df;color:#547b70;display:flex;align-items:center;justify-content:center;font-size:21px}.brand-copy{display:flex;flex-direction:column}.brand-name{font-size:16px;font-weight:700;letter-spacing:2px}.brand-caption{font-size:10px;color:#83918a;margin-top:2px;letter-spacing:.5px}.top-date{margin-left:auto;font-size:11px;color:#829089}.main-scroll{flex:1;min-height:0;padding:0 20px 16px}.welcome-row{display:flex;align-items:center;justify-content:space-between;margin:14px 2px 20px}.eyebrow{display:block;color:#87958d;font-size:9px;letter-spacing:2px;font-weight:700;margin-bottom:7px}.page-title{display:block;font-size:24px;font-weight:650;letter-spacing:1px;color:#233a35}.moon-orbit{width:52px;height:52px;border:1px solid #d8e3dc;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#64867b;font-size:30px;position:relative}.moon-orbit:after{content:'';position:absolute;width:5px;height:5px;border-radius:50%;background:#d8aa74;top:4px;right:6px}.hero-card{border-radius:22px;padding:22px 21px 17px;background:linear-gradient(135deg,#527a70,#3f655c);color:#fff;box-shadow:0 10px 25px #36594e20}.hero-kicker{display:flex;align-items:center;gap:7px;font-size:10px;opacity:.82}.live-dot{width:6px;height:6px;border-radius:50%;background:#e9ca91}.hero-title{display:block;font-size:26px;font-weight:650;line-height:1.42;letter-spacing:1px;margin:17px 0 9px}.hero-body{display:block;max-width:290px;font-size:11px;line-height:1.8;opacity:.78}.hero-foot{display:flex;align-items:center;gap:9px;margin-top:22px;font-size:9px;opacity:.85}.hero-line{height:3px;background:#ffffff36;border-radius:3px;flex:1}.hero-line view{height:100%;background:#e9ca91;border-radius:3px}.section-head{display:flex;align-items:center;justify-content:space-between;margin:26px 2px 12px}.section-title{display:block;font-size:15px;font-weight:700;letter-spacing:.4px}.section-note{display:block;color:#97a39d;font-size:10px;margin-top:5px}.tiny-pill{font-size:9px;color:#648276;background:#e5eee8;border-radius:12px;padding:6px 9px}.task-card{display:flex;align-items:center;padding:13px 12px;margin:9px 0;background:#fff;border:1px solid #edf0eb;border-radius:16px;box-shadow:0 5px 15px #465d4d07}.task-card.completed{background:#f0f5f0}.task-icon{width:36px;height:36px;flex:none;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px}.task-icon.sky{background:#e7f0ef;color:#4f8178}.task-icon.peach{background:#f8eee3;color:#c48c5c}.task-content{flex:1;min-width:0;margin:0 10px}.task-title{display:block;font-size:12px;font-weight:700}.task-description{display:block;margin-top:4px;font-size:9px;color:#7f8b85;line-height:1.55}.task-duration{display:block;font-size:8px;color:#a6afa9;margin-top:5px}.round-action{width:29px;height:29px;min-width:29px;padding:0;border-radius:50%;background:#eff4ef;color:#547b70;font-size:15px;line-height:29px}.completed .round-action{background:#547b70;color:#fff}.journal-heading{margin-top:27px}.text-action{background:transparent;color:#547b70;font-size:11px;padding:4px}.journal-prompt{padding:14px;background:#fff;border:1px solid #edf0eb;border-radius:15px;display:flex;align-items:center;gap:11px}.prompt-icon{width:33px;height:33px;border-radius:11px;background:#f5eee2;color:#a88054;display:flex;align-items:center;justify-content:center}.prompt-copy{flex:1}.prompt-title{display:block;font-size:11px;font-weight:650}.prompt-desc{display:block;font-size:9px;color:#97a19b;margin-top:4px}.chevron{font-size:20px;color:#a6b0a9}.gentle-note{display:flex;align-items:flex-start;gap:7px;color:#87958d;font-size:9px;line-height:1.6;margin:17px 5px 12px}.note-star{color:#cb9e67}.tabbar{height:68px;flex:none;background:#fff;border-top:1px solid #edf0eb;display:flex;justify-content:space-around;padding-bottom:env(safe-area-inset-bottom)}.tab-item{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#9aa59f}.tab-item.selected{color:#50786d}.tab-icon{font-size:19px;line-height:21px}.tab-label{font-size:9px}.tab-indicator{position:absolute;bottom:3px;width:14px;height:2px;border-radius:2px;background:#719384}.page-intro{padding:23px 2px 13px}.page-intro .page-title{margin-bottom:8px}.intro-copy{display:block;color:#84918a;font-size:11px;line-height:1.7}.primary-button{background:#527a70;color:#fff;border-radius:13px;font-size:12px;font-weight:650}.add-dream{height:45px;width:100%;margin:10px 0 18px}.empty-state{padding:52px 18px;text-align:center;background:#fff;border:1px solid #edf0eb;border-radius:18px;margin-top:5px}.empty-moon{font-size:35px;color:#94b0a1;margin-bottom:10px}.empty-title{display:block;font-size:13px;font-weight:650}.empty-copy{display:block;font-size:10px;color:#98a39c;margin-top:7px;line-height:1.7}.dream-card{background:#fff;border:1px solid #edf0eb;border-radius:16px;padding:15px;margin-bottom:10px}.dream-card-top{display:flex;align-items:center;gap:8px}.dream-date{font-size:10px;color:#839089}.lucid-tag{background:#e8f1ec;color:#557e70;border-radius:8px;padding:3px 6px;font-size:8px}.dream-edit{margin-left:auto;font-size:9px;color:#a2ada6}.dream-preview{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font-size:11px;line-height:1.75;color:#334a43;margin-top:11px;white-space:pre-wrap}.dream-meta{display:flex;gap:12px;margin-top:12px;color:#a0aaa3;font-size:9px}.privacy-note{text-align:center;color:#a2aca6;font-size:9px;margin:17px 0}.stats-grid{display:flex;gap:10px;margin:12px 0}.stat-card{position:relative;overflow:hidden;flex:1;background:#fff;border:1px solid #edf0eb;border-radius:17px;padding:17px 15px}.stat-number{display:block;font-size:27px;font-weight:650;color:#456d62}.stat-label{display:block;font-size:9px;color:#89958e;margin-top:5px}.stat-mark{position:absolute;right:13px;top:12px;color:#e3ece5;font-size:21px}.week-head{margin-top:27px}.week-total{font-size:9px;color:#7c9186}.week-chart{height:151px;display:flex;align-items:flex-end;justify-content:space-between;padding:12px 9px 10px;background:#fff;border:1px solid #edf0eb;border-radius:16px}.day-column{height:100%;width:11%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:5px}.bar-track{height:80px;width:13px;display:flex;align-items:flex-end;background:#f1f3ef;border-radius:8px;overflow:hidden}.bar-fill{width:100%;border-radius:8px;background:#dce8df}.bar-fill.active{background:#719486}.day-label{font-size:9px;color:#929f97}.day-dot{height:14px;width:14px;border-radius:50%;font-size:8px;line-height:14px;text-align:center;color:transparent}.day-dot.checked{background:#edf3ed;color:#547b70}.reflection-card{margin-top:13px;background:#edf3ed;border-radius:16px;padding:16px;display:flex;flex-direction:column}.reflection-icon{font-size:16px;color:#bc986d}.reflection-title{font-size:11px;font-weight:700;margin-top:7px}.reflection-copy{font-size:10px;color:#74877d;line-height:1.7;margin-top:6px}.recent-heading{margin-top:27px}.recent-item{display:flex;gap:12px;padding:11px 3px;border-bottom:1px solid #e9ede8}.recent-date{width:36px;flex:none;text-align:center;color:#8a9990;font-size:9px}.recent-date view{width:4px;height:4px;border-radius:50%;margin:6px auto 0;background:#719486}.recent-text{display:block;font-size:10px;color:#435850;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:270px}.recent-sub{display:block;font-size:8px;color:#a2aca5;margin-top:5px}.small-empty{background:#fff;border-radius:14px;padding:17px;color:#98a39b;font-size:10px;line-height:1.6}.settings-group{background:#fff;border:1px solid #edf0eb;border-radius:17px;padding:0 15px;margin:10px 0}.setting-row{min-height:66px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f0f2ef}.setting-row:last-child{border-bottom:0}.setting-title{display:block;font-size:11px;font-weight:650}.setting-desc{display:block;font-size:9px;color:#9aa59e;margin-top:5px}.setting-row switch{transform:scale(.75);transform-origin:right center}.setting-value{font-size:10px;color:#668378}.reminder-status{display:flex;align-items:center;gap:8px;color:#9aa49d;font-size:9px;padding:9px 4px 17px}.reminder-status.on{color:#648276}.status-icon{font-size:14px}.info-group{padding:15px;margin-top:0}.group-title{display:block;font-size:12px;font-weight:700;margin-bottom:7px}.info-row{display:flex;gap:10px;padding:11px 0;border-bottom:1px solid #f0f2ef}.info-row:last-child{border-bottom:0}.info-number{font-size:9px;color:#c49a6c;padding-top:1px}.info-title{display:block;font-size:10px;font-weight:650}.info-desc{display:block;font-size:9px;color:#8c9991;line-height:1.65;margin-top:4px}.disclaimer-card{border:1px solid #eddfcf;background:#fbf5ed;border-radius:15px;padding:14px;margin-top:13px}.disclaimer-title{display:block;font-size:10px;font-weight:700;color:#8d6e4c}.disclaimer-copy{display:block;margin-top:6px;font-size:9px;line-height:1.8;color:#927e68}.danger-button{background:transparent;border:1px solid #eadbd6!important;border-radius:12px;color:#aa7265;font-size:10px;height:40px;width:100%;margin-top:17px}.version-copy{display:block;text-align:center;font-size:8px;color:#aab3ac;margin:15px 0 24px}.modal-backdrop{position:fixed;inset:0;z-index:10;background:#172b2780;display:flex;align-items:flex-end;justify-content:center}.editor-sheet{width:100%;max-width:540px;max-height:92vh;overflow:auto;background:#f9faf7;border-radius:23px 23px 0 0;padding:10px 22px calc(20px + env(safe-area-inset-bottom))}.sheet-handle{height:4px;width:34px;border-radius:4px;background:#dce2dc;margin:0 auto 18px}.sheet-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:17px}.sheet-title{display:block;font-size:20px;font-weight:700}.close-button{font-size:25px;color:#91a097;padding:0 4px}.form-label{font-size:10px;font-weight:650;margin:13px 0 7px}.picker-control{height:38px;background:#fff;border:1px solid #e8ece7;border-radius:10px;padding:0 11px;display:flex;align-items:center;justify-content:space-between;font-size:10px;color:#51665d}.dream-input{width:100%;min-height:110px;background:#fff;border:1px solid #e8ece7;border-radius:12px;padding:11px;font-size:11px;line-height:1.7}.clarity-label{display:flex;justify-content:space-between}.clarity-label text{color:#67867b}slider{margin:0 2px}.editor-options{display:flex;align-items:center;justify-content:space-between;margin:7px 0 15px}.lucid-toggle{display:flex;align-items:center;gap:7px;font-size:9px;color:#7a8981}.checkbox{width:16px;height:16px;border:1px solid #cbd5cd;border-radius:5px;color:#fff;line-height:15px;text-align:center}.lucid-toggle.picked .checkbox{background:#547b70;border-color:#547b70}.mood-picker{display:flex;gap:7px;align-items:center;font-size:9px;color:#8a9790}.mood-picker picker view{color:#547b70}.editor-actions{display:flex;gap:9px}.delete-button{height:43px;width:70px;border-radius:12px;background:#f4e9e5;color:#a56d5f;font-size:11px}.save-button{height:43px;flex:1}.editor-privacy{text-align:center;display:block;font-size:8px;color:#a4ada6;margin-top:12px}.onboarding-backdrop{align-items:center;padding:20px}.onboarding-card{width:100%;max-width:380px;background:#fbfcf9;border-radius:25px;padding:28px 23px 21px;text-align:center;box-shadow:0 18px 60px #172b2730}.onboard-moon{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;background:#e8f0e9;color:#5d8275;font-size:38px}.onboard-title{display:block;font-size:22px;font-weight:700;letter-spacing:1px}.onboard-copy{display:block;margin:12px auto 0;max-width:285px;font-size:10px;line-height:1.9;color:#85928b}.onboard-points{display:flex;flex-direction:column;gap:10px;align-items:flex-start;width:max-content;margin:22px auto;color:#60766b;font-size:10px}.onboard-cta{height:44px;width:100%;margin-top:4px}.onboard-skip{display:block;font-size:9px;color:#a0aaa3;margin-top:13px;padding:4px}.onboarding-backdrop~.tabbar{pointer-events:none}
</style>
