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
        <div v-if="resolverName === 'DatabaseFileNameResolver'">
            <v-divider class="mt-1 mb-2"></v-divider>
            <div class="d-flex flex-row mb-1">
                <span>Database Query</span>
                <v-tooltip bottom max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon class="ml-1"
                        v-bind="attrs"
                        v-on="on"
                        >
                            info_outline
                        </v-icon>
                    </template>
                    <span>Select query to get the base file name to which <code>.jpg</code> will be added</span><br>
                </v-tooltip>
            </div>
            <v-textarea
                v-model="dbNameQuery"
                placeholder="SELECT TOP 1 student_id FROM my_table WHERE external_id = ? AND other_column LIKE 'abc%' ORDER BY date_created DESC"
                outlined
                dense
                @change="emitChange()">
            </v-textarea>
        </div>
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
        console.log('fileNameResolverData', this.fileNameResolverData)
        this.resolverName = this.fileNameResolverData.resolver.value
        this.dbNameQuery = this.fileNameResolverData.query.value
    },

    methods: {
        emitChange() {
            var result = []
            console.log('resolverName', this.resolverName)
            if (this.resolverName === 'DatabaseFileNameResolver') {
                result = [
                    {
                        type: this.fileNameResolverData.resolver.type,
                        value: this.resolverName
                    },
                    {
                        type: this.fileNameResolverData.query.type,
                        value: this.dbNameQuery
                    }
                ]
            } else {
                result = [
                    {
                        type: this.fileNameResolverData.resolver.type,
                        value: this.resolverName
                    },
                    {
                        type: this.fileNameResolverData.query.type,
                        value: ''
                    }
                ]
            }
            console.log('result', result)
            this.$emit('set_value', result)
        }
    }
}
</script>
<style scoped>

</style>