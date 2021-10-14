<template>
    <div>
        <div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <div class="flex flex-col w-full md:w-64 text-gray-700 bg-white bg-blue-700 flex-shrink-0" x-data="{ open: false }">
            <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <a href="#" class="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Contacts</a>
            </div>
            <nav v-for="(conv, index) in conversations" :key="index" class="md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                    {{conv.title ? conv.title : 'Sans titre'}}
                </a>
            </nav>
        </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import Conversation from '~/lib/conversation'

    export default {
        middleware: 'authenticated',
        data() {
            return {
                conversations: [],
                user: {}
            }
        },
        async mounted() {
            // await this.getCurrentUser();
            await this.getConversations();
        },
        methods: {
            // async getCurrentUser() {
                // this.user = await jwt_decode(this.$cookies.get('auth_lensi_sn'));
            // },
            async getConversations() {
                try {
                    let res = await Conversation.getConversationsByUser(this.$cookies.get('auth_lensi_sn'));
                    if (res.status === 200) {
                        this.conversations = this.conversations = res.data.data
                        console.log(this.conversations);
                    }
                } catch (err) {
                    return this.$nuxt.error({ statusCode: 500, message: err.message });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>