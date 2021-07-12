<template>
    <div class="h-screen overflow-hidden bg-blue-700">
        <!-- <div class="h-3/6 transform scale-110 -rotate-6 z-0">s</div>
        <div class="h-4/6 bg-blue-700 transform scale-110 -rotate-6">s</div> -->
        <div class="h-3/6 bg-blue-700 transform scale-110 -rotate-6 z-0">s</div>
        <div class="h-4/6 bg-white transform scale-110 -rotate-6" style="width: 150%">s</div>
        <div class="flex bg-white w-11/12 sm:w-9/12 md:w-4/12 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto shadow-2xl border-black">
            <div class="w-full m-7">
                <label for="" class="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                    Se connecter
                </label>
                <div class="mt-10">
                    <myInput placeholder="Email" type="email" v-model="user.email" :error="!emailFound" class="mt-7" errorMsg="Aucun compte n'a été trouvé" @focusInput="emailFound = true"></myInput>
                    <myInput placeholder="Mot de passe" type="password" v-model="user.password" :error="!passwordCorrect" class="mt-7" errorMsg="Mot de passe incorrect" @focusInput="passwordCorrect = true"></myInput>
                    <div class="mt-7">
                        <button @click="connectUser()" class="bg-blue-700 font-bold w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                            Se connecter
                        </button>
                    </div>
                    <div class="mt-7">
                        <div class="flex justify-center items-center">
                            <label class="mr-2" >Pas de compte ?</label>
                            <nuxt-link to="/register" class=" text-blue-500 font-normal transition duration-150 ease-in-out transform hover:scale-105 hover:font-bold">
                                Creer un compte
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
            user: {
                email: '',
                password: ''
            },
            emailFound: true,
            passwordCorrect: true
        }
    },
    methods: {
        async connectUser() {
            try {
                const isLogged = await User.login(this.user);
                if (!isLogged.data.status) {
                    if (isLogged.data.message === "Email introuvable") {
                        this.emailFound = false;
                        return;
                    } else if (isLogged.data.message === "Mot de passe incorrect") {
                        this.passwordCorrect = false;
                        return;
                    } else {
                        return this.$nuxt.error({ statusCode: 500, message: isLogged.data.message });
                    }
                } else {
                    this.$cookies.set(
                        "auth_lensi_sn",
                        isLogged.data.data.token,
                        {
                            maxAge: 60 * 60 * 10,
                        }
                    );
                    this.$router.push("/");
                }
            } catch (err) {
                console.log(err);
                return this.$nuxt.error({ statusCode: 500, message: err.message });
            }
        }
    }
};
</script>

<style lang="css" scoped>
</style>