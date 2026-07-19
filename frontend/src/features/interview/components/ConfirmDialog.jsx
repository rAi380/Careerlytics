import React from 'react'
import '../style/confirmDialog.scss'

const ConfirmDialog = ({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, danger = true }) => {
    if (!open) return null

    return (
        <div className='confirm-overlay' onClick={onCancel}>
            <div className='confirm-dialog' onClick={(e) => e.stopPropagation()}>
                <h3 className='confirm-dialog__title'>{title}</h3>
                <p className='confirm-dialog__message'>{message}</p>
                <div className='confirm-dialog__actions'>
                    <button className='confirm-dialog__btn confirm-dialog__btn--cancel' onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button
                        className={`confirm-dialog__btn ${danger ? 'confirm-dialog__btn--danger' : 'confirm-dialog__btn--primary'}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog