<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Table Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the table where the photos will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field
            dense
            solo>
        </v-text-field>
    </v-container>
</template>
<script>
export default {
    name: 'DatabaseConnection',

    
    
}
</script>