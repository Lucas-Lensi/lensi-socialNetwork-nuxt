<template>
    <div>
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div class="flex justify-center md:justify-end -mt-16">
                <img
                    class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                />
            </div>
            <div>
                <p class="mt-2 text-gray-600">
                    {{post.content}}
                </p>
            </div>
            <div class="flex justify-end mt-4">
                <a href="#" class="text-xl font-medium text-indigo-500"
                    >{{user.firstName}} {{user.lastName}}</a
                >
            </div>
            <div class="row">
                <Picker :data="emojiIndex" set="apple" @select="showEmoji" />
            </div>

            <div class="row">
                <div>
                {{ emojisOutput }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '~/lib/user'

import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

let emojiIndex = new EmojiIndex(data);
export default {
    props: {
        post: {
            type: Object
        }
    },
    components: {
        Picker
    },
    data() {
        return {
            user: {},
            emojiIndex: emojiIndex,
            emojisOutput: ""
        }
    },
    mounted() {
        this.getAuthor();
    },
    methods: {
        async getAuthor() {
            try {
                const res = await User.getUserForPost(this.$cookies.get('auth_lensi_sn'), this.post.userId);
                if (res.data.status) {
                    this.user = res.data.data
                }
            } catch (error) {
                console.log(error);
            }
        },
        showEmoji(emoji) {
            this.emojisOutput = this.emojisOutput + emoji.native;
        }
    }
};
</script>

<style lang="css" scoped>
</style>