const jwt = require('jsonwebtoken');

export default function ({ app, store, redirect, route, error }) {
  try {
    const token = app.$cookies.get('auth_lensi_sn');
    let user;
    try {
      user = jwt.verify(token, 'ds°DSQ897ddqs$*dDdsq*');
      if (Date.now() >= user.exp * 1000 || user.isPatient === true) {
        app.$cookies.remove('auth_lensi_sn');
        return redirect('/login')
      }
    } catch (e) {
      app.$cookies.remove('auth_lensi_sn');
      return redirect('/login')
    }
  } catch (e) {
    app.$cookies.remove('auth_lensi_sn');
    return redirect('/login')
  }
}