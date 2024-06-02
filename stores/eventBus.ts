// eventBus.ts

// Toast
export const toastMessage = ref('')
export const toastType = ref('') // 新增一個 ref 來存儲 toast 的類型
let toastTimeoutId: string | number | NodeJS.Timeout | undefined // 用於存儲計時器的 ID

export function showToast(message: any, type: 'error' | 'normal' = 'normal') {
  // 清除之前的計時器
  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId)
  }

  // 立即更新彈出訊息
  toastMessage.value = message
  toastType.value = type // 更新 toast 的類型

  // 設置一個新的計時器，在三秒後清除彈出訊息
  toastTimeoutId = setTimeout(() => {
    toastMessage.value = ''
    toastType.value = 'normal' // 重置 toast 的類型
  }, 3000)
}
/**
 * 成功的 showToast('test');
 * 錯誤的 showToast('test', 'error')
 */

// ToastError
export const toastErrorMessage = ref('')
export function showToastError(message: any) {
  toastErrorMessage.value = message
  setTimeout(() => {
    toastErrorMessage.value = ''
  }, 3000)
}

// CustomDialog 彈窗
export const dialogTitle = ref('')
export const dialogMessage = ref('')
export const showDialog = ref(false)
export const userInput = ref<string | null>(null) // 修改
let resolveDialogPromise: (value: { confirmed: boolean; userInput: string | null }) => void

export function openDialog(
  title: string,
  message: string,
  input: string | null = null
): Promise<{ confirmed: boolean; userInput: string | null }> {
  // 修改
  dialogTitle.value = title
  dialogMessage.value = message
  userInput.value = input
  showDialog.value = true
  return new Promise((resolve) => {
    resolveDialogPromise = resolve
  })
}

export function confirmDialog() {
  resolveDialogPromise({ confirmed: true, userInput: userInput.value })
  showDialog.value = false
}

export function cancelDialog() {
  resolveDialogPromise({ confirmed: false, userInput: null })
  showDialog.value = false
}

/**
  // 再次確認
  const Dialogresult = await openDialog(
    '取消訂單',
    '請確認您要取消此筆訂單，取消後不可撤銷。您確定要執行此操作嗎？',
    '取消原因'
  )
  if (!Dialogresult.confirmed) {
    return
  }
 */

// Loading
export const isLoading = ref(false)

export function showLoading() {
  isLoading.value = true
}

export function hideLoading() {
  isLoading.value = false
}
