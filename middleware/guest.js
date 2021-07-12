export default function({ app, store, redirect, route, error }){
    const token = app.$cookies.get('auth_lensi_sn');
    if (token) {
      return redirect('/')
    }
  }