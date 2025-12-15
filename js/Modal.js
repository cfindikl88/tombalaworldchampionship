/**
 * Modal Dialog Component
 * Provides accessible, reusable modal dialogs with focus management
 */
export class Modal {
    /**
     * Creates a new Modal instance
     * @param {Object} options - Modal configuration
     * @param {string} options.title - Modal title
     * @param {string} options.message - Modal message content
     * @param {string} [options.type='info'] - Modal type: 'info', 'success', 'error', 'confirm'
     * @param {Function} [options.onConfirm] - Callback for confirm button
     * @param {Function} [options.onCancel] - Callback for cancel button
     */
    constructor(options) {
        this.options = {
            title: options.title || 'Bilgi',
            message: options.message || '',
            type: options.type || 'info',
            onConfirm: options.onConfirm || (() => { }),
            onCancel: options.onCancel || (() => { }),
            confirmText: options.confirmText || 'Tamam',
            cancelText: options.cancelText || 'İptal'
        };

        this.previousFocus = null;
        this.modal = null;

        this.create();
    }

    /**
     * Creates the modal DOM structure
     */
    create() {
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.setAttribute('role', 'presentation');

        // Create modal container
        const modal = document.createElement('div');
        modal.className = `modal modal-${this.options.type}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');
        modal.setAttribute('aria-describedby', 'modal-message');

        // Create modal content
        const content = document.createElement('div');
        content.className = 'modal-content';

        // Title
        const title = document.createElement('h2');
        title.id = 'modal-title';
        title.className = 'modal-title';
        title.textContent = this.options.title;

        // Message
        const message = document.createElement('p');
        message.id = 'modal-message';
        message.className = 'modal-message';
        message.innerHTML = this.options.message;

        // Buttons
        const buttons = document.createElement('div');
        buttons.className = 'modal-buttons';

        if (this.options.type === 'confirm') {
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn secondary-btn modal-btn';
            cancelBtn.textContent = this.options.cancelText;
            cancelBtn.addEventListener('click', () => this.handleCancel());
            buttons.appendChild(cancelBtn);
        }

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'btn primary-btn modal-btn';
        confirmBtn.textContent = this.options.confirmText;
        confirmBtn.addEventListener('click', () => this.handleConfirm());
        confirmBtn.setAttribute('autofocus', '');
        buttons.appendChild(confirmBtn);

        // Assemble
        content.appendChild(title);
        content.appendChild(message);
        content.appendChild(buttons);
        modal.appendChild(content);
        backdrop.appendChild(modal);

        this.modal = backdrop;
        this.firstFocusable = confirmBtn;
    }

    /**
     * Shows the modal
     */
    show() {
        // Save current focus
        this.previousFocus = document.activeElement;

        // Add to DOM
        document.body.appendChild(this.modal);

        // Trigger reflow for animation
        void this.modal.offsetWidth;
        this.modal.classList.add('active');

        // Set focus to first button
        setTimeout(() => {
            this.firstFocusable?.focus();
        }, 100);

        // Event listeners
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.handleCancel();
            }
        });

        document.addEventListener('keydown', this.handleKeydown);
    }

    /**
     * Handles keyboard events
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeydown = (e) => {
        if (e.key === 'Escape') {
            this.handleCancel();
        }

        // Tab trap
        if (e.key === 'Tab') {
            const focusableElements = this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    /**
     * Handles confirm button click
     */
    handleConfirm() {
        this.options.onConfirm();
        this.close();
    }

    /**
     * Handles cancel button click
     */
    handleCancel() {
        this.options.onCancel();
        this.close();
    }

    /**
     * Closes and removes the modal
     */
    close() {
        this.modal.classList.remove('active');
        document.removeEventListener('keydown', this.handleKeydown);

        setTimeout(() => {
            this.modal.remove();
            // Restore focus
            if (this.previousFocus) {
                this.previousFocus.focus();
            }
        }, 300);
    }
}

/**
 * Utility functions for common modal types
 */
export const showAlert = (message, title = 'Bilgi') => {
    return new Promise((resolve) => {
        const modal = new Modal({
            title,
            message,
            type: 'info',
            onConfirm: resolve
        });
        modal.show();
    });
};

export const showSuccess = (message, title = 'Başarılı') => {
    return new Promise((resolve) => {
        const modal = new Modal({
            title,
            message,
            type: 'success',
            onConfirm: resolve
        });
        modal.show();
    });
};

export const showError = (message, title = 'Hata') => {
    return new Promise((resolve) => {
        const modal = new Modal({
            title,
            message,
            type: 'error',
            onConfirm: resolve
        });
        modal.show();
    });
};

export const showConfirm = (message, title = 'Onay') => {
    return new Promise((resolve) => {
        const modal = new Modal({
            title,
            message,
            type: 'confirm',
            confirmText: 'Evet',
            cancelText: 'Hayır',
            onConfirm: () => resolve(true),
            onCancel: () => resolve(false)
        });
        modal.show();
    });
};
