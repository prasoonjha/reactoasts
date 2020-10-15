import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import '../index.css'

const typeIcon = {
  success: { class: 'text-green-500 bg-green-200 rounded-full', icon: 'done' },
  error: { class: 'text-red-500 bg-red-200 rounded-full', icon: 'error' },
  warning: {
    class: 'text-yellow-500 bg-yellow-200 rounded-full',
    icon: 'warning'
  },
  info: { class: 'text-blue-500 bg-blue-200 rounded-full', icon: 'info' }
}

const positionClasses = {
  topLeft: 'mt-4 ',
  topRight: 'mt-4',
  bottomLeft: 'mb-4 ',
  bottomRight: 'mb-4'
}

let root = document.getElementById('toast-root')
const newRoot = document.createElement('div')
newRoot.id = 'toast-root'
root = root || document.body.appendChild(newRoot)
root.classList.add(
  'fixed',
  'h-screen',
  'w-screen',
  'pointer-events-none',
  'top-0',
  'flex'
)

let toastCounts = 0

const ToastElem = ({ ID, position, type, text, onHide }) => {
  let posRoot = document.getElementById(position)
  const side = position
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .split(' ')[1]
  const [anim, setAnim] = useState(0)
  let animTimeout = null
  if (!posRoot) {
    posRoot = document.createElement('div')
    posRoot.id = position
    root.append(posRoot)
  }
  const hide = () =>
    setTimeout(() => {
      animTimeout = setTimeout(() => onHide(ID), 900)
      setAnim(`out-${side}`)
    }, 3000)
  useEffect(() => {
    const hideTimeout = hide()
    setAnim(`in-${side}`)
    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(animTimeout)
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      className={`bg-gray-100 p-4 rounded-md w-full shadow-md z-10 pointer-events-auto toast slide-${anim} ${positionClasses[position]}`}
    >
      <div>
        <i
          className={`material-icons-outlined text-sm p-1 ${typeIcon[type].class}`}
        >
          {typeIcon[type].icon}
        </i>
        <span className='text-xs ml-4 font-bold'>{text} </span>
        <span className='float-right text-gray-500 ml-2'>x</span>
      </div>
    </div>,
    posRoot
  )
}

const ToastWrapper = ({ toast }) => {
  const [allToasts, setToasts] = useState([])

  const handleToastHide = (id) => {
    setToasts((toasts) => toasts.filter((item) => item.key !== id))
  }

  useEffect(() => {
    if (toast) {
      setToasts((toasts) => {
        return [...toasts, toast]
      })
    }
  }, [toast])
  return allToasts.map((item) => (
    <ToastElem
      ID={item.key}
      position={item.position}
      type={item.type}
      key={`toast_elem_${item.key}`}
      onHide={handleToastHide}
    />
  ))
}

const Toast = ({ position, type, text }) => {
  toastCounts++
  const toast = { key: toastCounts, position, type, text }
  return ReactDOM.render(<ToastWrapper toast={toast} />, root)
}

const ProgressElem = ({ elapseTime }) => {
  const [width, setWidth] = useState(100)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setWidth(width - 1)
    }, elapseTime / 100)
    return () => {
      clearTimeout(progressInterval)
    }
  }, width)
  return <div className='progress-bar' />
}

export default Toast