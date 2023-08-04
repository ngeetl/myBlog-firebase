import React from 'react'

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className='toasts'>
      {toasts.map(toast => {
          return (
              <div className={toast.type === "err" ? 'toast_wrap' : 'toast_wrap toast_suc'}
                   onClick={() => removeToast(toast.id)}
                   key={toast.id}>
                  <div className='toast'>
                      {toast.message}
                  </div>
              </div>
          )
      })}
    </div>
  )
}

export default Toast
