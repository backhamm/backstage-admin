export const checkData = {
  name: {title: '用户名', errMsg: '8~20位数字或字母', reg: /^[a-zA-Z0-9]{6,20}$/, maxlength: 20},
  nickName: {title: '别名', errMsg: '2~10位数字、字母或汉字', reg: /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/, maxlength: 10},
  passWord: {title: '密码', errMsg: '6~16位', reg: /^.{6,16}$/, maxlength: 16, inputType: 'password'},
  phone: {title: '手机号', errMsg: '格式有误', reg: /^$|1[3456789]\d{9}$/, maxlength: 11, placeholder: '请填写正确的手机号'},
  rmk: {title: '备注', type: 'textarea'},
  occupy: {title: '占成'},
  washCode: {title: '洗码'},
  money: {title: '金额', type: 'number'},
  oldPassword: {title: '原密码', errMsg: '6~16位', reg: /^.{6,16}$/, maxlength: 16, inputType: 'password'},
  newPassword: {title: '新密码', errMsg: '6~16位', reg: /^.{6,16}$/, maxlength: 16, inputType: 'password'},
  verifyNewPassword: {title: '确认密码', errMsg: '6~16位', reg: /^.{6,16}$/, maxlength: 16, inputType: 'password'}
}
