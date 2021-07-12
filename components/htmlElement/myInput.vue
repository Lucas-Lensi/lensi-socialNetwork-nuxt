<template>
    <div class="relative">
        <input
            @input="handleInput"
            v-model="content"
            @focus="toggleError"
            :type="type"
            :placeholder="placeholder"
            :class="
                'mt-1 p-5 font-bold block outline-none w-full bg-gray-200 h-11 rounded-xl shadow-lg'
                + (error == true ? ' red-border' : '')
            "
        />
        <p v-if="error" class="text-red-600 text-xs mt-1 ml-1 error-msg">
            {{ errorMsg }}
        </p>
    </div>
</template>

<script>
export default {
    name: "myInput",
    props: {
        value: {
            type: String
        },
        placeholder: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
        error: {
            type: Boolean,
            default: false,
        },
        errorMsg: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            content: this.value,
        };
    },
    methods: {
        handleInput(e) {
            this.$emit("input", this.content);
        },
        async toggleError(type) {
            this.$emit("focusInput");
        },
    },
};
</script>

<style lang="css" scoped>
.red-border {
    border: 1px solid red;
}

.error-msg {
    position: absolute;
}
</style>