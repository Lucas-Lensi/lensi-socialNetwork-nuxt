<template>
    <div class="primary-color-3">
        <!-- <b-container fluid>
            <b-row v-if="error.statusCode === 404">
                <b-col lg="10" offset-lg="1" class="pt-5" style="text-align: center">
                    <h1>Erreur {{error.statusCode}}</h1>
                    <h4 class="mt-5"><i>La page demandée n'existe pas.</i></h4>
                </b-col>
            </b-row>
            <b-row v-else-if="error.statusCode === 401">
                <b-col lg="10" offset-lg="1" class="pt-5" style="text-align: center">
                    <h1>Erreur {{error.statusCode}}</h1>
                    <h4 class="mt-5"><i>Vous n'avez pas accès à cette page. Essayez de vous connecter si ce n'est pas le cas</i></h4>
                </b-col>
            </b-row>
            <b-row v-else-if="error.statusCode === 500">
                <b-col lg="10" offset-lg="1" class="pt-5" style="text-align: center">
                    <h1>Erreur {{error.statusCode}}</h1>
                    <h4 class="mt-5"><i>Une erreur système est survenue.</i></h4>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col lg="10" offset-lg="1" class="pt-5" style="text-align: center">
                    <h1>Erreur {{error.statusCode}}</h1>
                    <h4 class="mt-5"><i>Une erreur système est survenue.</i></h4>
                </b-col>
            </b-row>
        </b-container> -->
    </div>
</template>

<script>
import ErrorLog from '~/lib/error'
export default {
    name: 'Error',
    props: ['error'],
    data () {
        return {
        };
    },
    methods: {
        detectBrowser () {
            if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1 ) {
                return 'Opera';
            } else if(navigator.userAgent.indexOf('Chrome') != -1 ) {
                return 'Chrome';
            } else if(navigator.userAgent.indexOf('Safari') != -1) {
                return 'Safari';
            } else if(navigator.userAgent.indexOf('Firefox') != -1 ) {
                return 'Firefox'
            } else if((navigator.userAgent.indexOf('MSIE') != -1 ) || (!!document.documentMode == true )) {
                return 'IE';
            } else {
                return 'inconnu';
            }
        },
        async postErrorLog (data) {
            try {
                data.path = data.path || this.$router.currentRoute.path;
                const response = await ErrorLog.postErrorLog(data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    async mounted () {
        try {
            this.error.navigator = this.detectBrowser();
            console.log(this.error);
            if (this.error.type === 'invalid-token') {
                await User.logOut();
            }
            console.log('<---------------ERROR-------------->')
            console.log(this.error.message);
            console.log('<---------------ERROR-------------->')
            await this.postErrorLog(this.error);
        } catch (err) {
            console.log(err);
        }
    }
};
</script>