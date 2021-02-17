<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>File Name Resolver</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>SimpleFileNameResolver - uses the cardholder's identifier value as the file name.</span><br>
                <span>DatabaseFileNameResolver - executes select query to determine the file name</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="resolverName"
            :items="resolverOptions"
            hint="Select a file name resolver to use"
            persistent-hint
            dense
            outlined
            @change="emitChange()">
        </v-select>
    </v-container>
</template>
<script>
export default {
    name: 'FileNameResolver',

    props: {
        fileNameResolverData: {
            type: Object,
            default: function() {
                return {
                    resolver: {
                        type: 'downloader.fileNameResolver',
                        value: 'SimpleFileNameResolver'
                    },
                    query: {
                        type: 'DatabaseFileNameResolver.baseFileName.query',
                        value: ''
                    }
                }
            }
        }
    },

    data() {
        return {
            resolverName: '',
            dbNameQuery: '',
            resolverOptions: [ 'SimpleFileNameResolver', 'DatabaseFileNameResolver' ]
        }
    },

    created: function() {
        this.resolverName = this.fileNameResolverData.resolver.value
        this.dbNameQuery = this.fileNameResolverData.query.value
    },

    methods: {
        emitChange() {
            console.log('emitChange')
            const result = [
                {
                    type: this.fileNameResolverData.resolver.type,
                    value: this.resolverName
                },
            ]
            if (this.resolverName === 'DatabaseFileNameResolver') {
                result.push(
                    {
                        type: this.fileNameResolverData.query.type,
                        value: this.dbNameQuery
                    }
                )
            }
            this.$emit('set_value', result)
        }
    }
}
</script>
<style scoped>

</style>