declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}

declare module 'vue-avatar' {
  // export const Avatar: any
  const Avatar: any;
  export default Avatar;
}

