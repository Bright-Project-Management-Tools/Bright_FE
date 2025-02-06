import { store } from '@/store' // Adjust the import per your project structure
import { setTheme } from '@features/theme/utils/themeSlice'
import { setDataViewMode } from '@features/dev-dock/utils/data-slice'

// Existing functions
export const toggleTheme = () => {
  const state = store.getState()
  const currentTheme = state.currentTheme.value
  const newTheme = currentTheme === 'light-default' ? 'dark-default' : 'light-default'
  store.dispatch(setTheme(newTheme))
  console.log('Theme toggled to', newTheme)
}

export const toggleSelectionMode = () => {
  console.log('Selection mode toggled')
}

export const toggleLanguage = () => {
  console.log('Language toggled')
}

export const changeDataView = () => {
  const state = store.getState()
  const currentView = state.dataViewMode.current
  const newView =
    currentView === 'No Data'
      ? 'Fake Data'
      : currentView === 'Fake Data'
      ? 'Actual Data'
      : 'No Data'
  store.dispatch(setDataViewMode(newView))
  console.log('Data view changed to', newView)
}

export const refreshData = () => {
  // Implement refresh logic if needed, e.g. re-fetching data
  console.log('Data refreshed')
}
