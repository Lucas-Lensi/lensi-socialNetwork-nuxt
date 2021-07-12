<template>
    <div class="container flex flex-col">
        <div class="flex flex-row">
            <modalCreatePost v-if="postCreation"/>
            <div class="flex flex-col">
                <button @click="postCreation = true" class="bg-blue-700 font-bold w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Creer
                </button>
            </div>
        </div>

        <ul>
            <li v-for="(post, index) in allPosts" :key="index">
                <postCard :post="post"/>
            </li>
        </ul>
    </div>
</template>

<script>
import Post from '~/lib/post'
import jwt_decode from 'jwt-decode'

export default {
    middleware: "authenticated",
    components: {
        myInput: () => import('~/components/htmlElement/myInput.vue'),
        postCard: () => import('~/components/blockComponents/post'),
        modalCreatePost: () => import('~/components/modalComponents/postCreation')
    },
    data() {
        return {
            newPostContent: '',
            allPosts: [],
            postCreation: false
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            try {
                const res = await Post.getPosts(this.$cookies.get('auth_lensi_sn'));
                if (res.data.status) {
                    this.allPosts = res.data.data
                }
            } catch (error) {

            }
        },
        async createPost() {
            let post = {
                content: this.newPostContent,
                userId: jwt_decode(this.$cookies.get('auth_lensi_sn'))._id
            }
            const res = await Post.createPost(this.$cookies.get('auth_lensi_sn'), post)
        }
    },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
