<template>
    <v-container>
        <div class="d-flex flex-row mb-1 mt-1">
            <span>Table Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the table into which photos will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field class="minimum-id-length"
            v-model="tableName"
            dense
            hide-details="auto"
            spellcheck="false"
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1 mt-5">
            <span>Student ID Column Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the <code>VARCHAR</code> column into which the cardholder's ID will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field class="minimum-id-length"
            v-model="studentIdColumnName"
            dense
            hide-details="auto"
            spellcheck="false"
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1 mt-5">
            <span>Photo ID Column Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the <code>BLOB</code> column into which the cardholder's jpeg encoded image will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field class="minimum-id-length"
            v-model="photoIdColumnName"
            dense
            hide-details="auto"
            spellcheck="false"
            solo>
        </v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: 'SimpleDatabaseStorage',

        props: {
            tableName: {
                type: String,
                default: function() {
                    return 'CLOUDCARD_PHOTOS'
                }
            },
            studentIdColumnName: {
                type: String,
                default: function() {
                    return 'STUDENT_ID'
                }
            },
            photoIdColumnName: {
                type: String,
                default: function() {
                    return 'PHOTO'
                }
            },
        },

        created: function () {
        },

        data() {
            return {
                
            }
        },

        methods: {
        }
    }
</script>

<style scoped>
    .container {
        padding: 12px 0;
    }
</style>
