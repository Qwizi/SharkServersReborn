import axios from 'axios';

export enum AccountTypes {
    STEAM = 'steam'
}

class Api {
    private axios;

    constructor() {
        this.axios = axios.create()
    }

    async login(username: string, password: string) {
        return this.axios.post('/api/auth/login', {
            username: username,
            password: password
        })
    }

    async register(username: string, email: string, password: string) {
        return this.axios.post('/api/auth/register', {
            username: username,
            email: email,
            password: password
        })
    }

    async activateAccountWithEncryptedCode(encryptedCode: string) {
        return this.axios.post('/api/activate-account/encrypted', {
            code: encryptedCode
        })
    }

    async activateAccount(code: string) {
        return this.axios.post('/api/activate-account', {
            code: code
        })
    }

    async resendActivateAccountEmail(email: string) {
        return this.axios.post('/api/activate-account/resend', {
            email: email
        })
    }

    async checkResetPasswordEncryptedCode(encryptedCode: string) {
        return this.axios.post('/api/reset-password/check', {
            encrypted_code: encryptedCode
        })
    }

    async resetPassword(encryptedCode: string, newPassword: string) {
        return this.axios.post('/api/reset-password', {
            encrypted_code: encryptedCode,
            new_password: newPassword
        })
    }

    async sendResetPasswordEmail(email: string) {
        return this.axios.post('/api/reset-password/send', {
            email: email
        })
    }

    async disconnectAccount (account: AccountTypes) {
        return this.axios.post('/api/auth/disconnect-account', {account: account});
    }

    async changeUsername(username: string) {
        return this.axios.post('/api/profile/username', {
            username: username
        })
    }

    async changePassword(currentPassword: string, newPassword: string, newPasswordConfirm: string) {
        return this.axios.post('/api/profile/password', {
            old_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: newPasswordConfirm
        })
    }

    async changeEmail(email: string) {
        return this.axios.post('/api/profile/email', {
            email: email,
        })
    }
}

const api = new Api();

export default api;