import { useCallback, useState } from 'react'

export default function useModal() {
  const [open, setVisible] = useState(true)
  const show = useCallback(() => setVisible(true), [open])
  const close = useCallback(() => setVisible(false), [open])

  const modalProps = {
    open,
    onOk: close,
    onCancel: close
  }

  return {
    open,
    show,
    close,
    modalProps
  }
}
