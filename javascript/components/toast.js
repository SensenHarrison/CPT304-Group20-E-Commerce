export class ToastManager {
    constructor() {
        this.container = null;
    }

    getContainer() {
        if (!this.container) {
            this.container = this.createContainer();
        }
        return this.container;
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
            document.body.appendChild(container);
        }
        return container;
    }

    getColorByType(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        return colors[type] || colors.info;
    }

    createToastElement(message, type) {
        const toast = document.createElement('div');
        const bgColor = this.getColorByType(type);

        toast.style.cssText = `
            background: ${bgColor}; 
            color: white; 
            padding: 12px 20px; 
            margin-top: 10px; 
            border-radius: 8px; 
            font-size: 14px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        toast.textContent = message;

        return toast;
    }

    show(message, type = 'info', duration = 3000) {
        const container = this.getContainer();
        const toast = this.createToastElement(message, type);

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);

        return toast;
    }

    success(message) {
        return this.show(message, 'success');
    }

    error(message) {
        return this.show(message, 'error');
    }

    info(message) {
        return this.show(message, 'info');
    }
}

export const toast = new ToastManager();

export default toast;