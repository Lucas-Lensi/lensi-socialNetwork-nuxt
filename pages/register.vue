<template>
    <div class="h-screen overflow-hidden bg-blue-700">
        <div class="h-3/6 bg-blue-700 transform scale-110 -rotate-6 z-0"></div>
        <div class="h-4/6 bg-white transform scale-110 -rotate-12 sm:-rotate-6" style="width: 150%"></div>
        <!-- <div class="h-3/6 transform scale-110 -rotate-6 z-0">s</div>
        <div class="h-4/6 bg-blue-700 transform scale-110 -rotate-6">s</div> -->
        <div class="flex bg-white w-11/12 sm:w-9/12 md:w-4/12 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto shadow-2xl border-black">
            <div class="w-full m-7">
                <label for="" class="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                    Creer un compte
                </label>
                <div class="mt-10">
                    <div class="grid grid-cols-2 gap-4">
                        <myInput placeholder="Prenom" type="text" v-model="user.firstName" :error="error.firstName" errorMsg="Veillez entrer un prénom" @focusInput="error.firstName = false"></myInput>
                        <myInput placeholder="Nom" type="text" v-model="user.lastName" :error="error.lastName" errorMsg="Veuillez entrer un nom" @focusInput="error.lastName = false"></myInput>
                    </div>
                    <div class="flex my-7 items-center text-center mx-auto">
                        <hr class="border-gray-400 border-1 w-3/6 rounded-md mx-auto">
                    </div>
                    <myInput placeholder="Email" type="email" v-model="user.email" :error="error.email" class="mt-7" :errorMsg="errorEmail" @focusInput="error.email = false"></myInput>
                    <myInput placeholder="Mot de passe" type="password" v-model="user.password" :error="error.password" class="mt-7" errorMsg="Veuillez entrer un mot de passe" @focusInput="error.password = false" ></myInput>
                    <myInput placeholder="Confirmer le mot de passe" type="password" v-model="user.confirmationPassword" :error="error.confirmationPassword" class="mt-7" errorMsg="Les mots de passe ne sont pas identiques" @focusInput="error.confirmationPassword = false"></myInput>

                    <div class="mt-7 relative">
                        <button @click="register()" class="bg-blue-700 w-full py-3 rounded-xl text-white font-bold shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            S'enregistrer
                        </button>
                    </div>
                    <div class="mt-7">
                        <div class="flex justify-center items-center">
                            <label class="mr-2" >Déjà un compte ?</label>
                            <nuxt-link to="/login" class="text-blue-500 font-normal transition duration-150 ease-in-out transform hover:scale-105 hover:font-bold">
                                Se connecter
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import User from '~/lib/user'

export default {
    middleware: 'guest',
    components: {
      myInput: () => import('../components/htmlElement/myInput.vue'),
    },
    data() {
        return {
            user:{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmationPassword: ''
            },
            error:{
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                confirmationPassword: false
            },
            errorMdp: '',
            errorEmail: '',
            regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
    },
    methods: {
        async checkForm() {
            if (this.user.firstName && this.user.lastName && this.user.email && this.user.password && this.user.confirmationPassword) {
                if (!this.user.email.match(this.regexEmail)) {
                    this.error.email = true
                    this.errorEmail = 'Email invalide'
                    return false
                }
                if (this.user.password !== this.user.confirmationPassword) {
                    this.error.confirmationPassword = true
                    return false
                }
                return true
            } else {
                !this.user.firstName ? this.error.firstName = true : null
                !this.user.lastName ? this.error.lastName = true : null
                !this.user.password ? this.error.password = true : null
                !this.user.confirmationPassword ? this.error.confirmationPassword = true : null
                !this.user.email ? (this.error.email = true, this.errorEmail = 'Veuillez entrer un email') : null
                return false
            }
        },
        async register() {
            if (await this.checkForm()) {
                try {
                    const res = await User.createUser(this.user);
                    if (res.data.status) {
                        const logged = await User.login(this.user);
                        if (logged.data.status) {
                            this.$cookies.set('auth_lensi_sn', logged.data.data.token, {
                                maxAge: 60 * 60 * 10,
                            })
                            this.$router.push('/')
                        }
                    }
                } catch (error) {
                    console.log(error);
                    return this.$nuxt.error({ statusCode: 500, message: err.message });
                }
            }
        }
    }
};
</script>