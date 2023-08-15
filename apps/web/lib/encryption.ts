import CryptoJS from 'crypto-js'

export const encrypt = (value: string) =>
  CryptoJS.AES.encrypt(value ?? '', 'Secret').toString()

export const decrypt = (value: string) =>
  CryptoJS.AES.decrypt(value, 'Secret').toString(CryptoJS.enc.Utf8)
