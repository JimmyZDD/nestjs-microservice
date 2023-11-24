/*
 * @Author: zdd
 * @Date: 2023-11-24 21:14:57
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-24 21:46:27
 * @FilePath: config.ts
 */
export default {
  // these are used in the mail templates
  project: {
    name: 'nestjs',
    address: '杭州市西湖区',
    logoUrl:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    socials: [
      ['GitHub', '__Project_GitHub_URL__'],
      ['__Social_Media_1__', '__Social_Media_1_URL__'],
      ['__Social_Media_2__', '__Social_Media_2_URL__']
    ],
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms'
  }
};
