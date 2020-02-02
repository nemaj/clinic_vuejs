<template>
<v-dialog max-width="290" :value="value" @input="$emit('input')">
	<v-card>
		<v-card-text>
			<v-alert text type="success" v-show="true" color="green darken-1">
    			<slot>Success</slot>
      		</v-alert>
  		</v-card-text>

		<v-card-actions>
	    	<div class="flex-grow-1"></div>

	    	<v-btn color="green darken-1" text @click.native="$emit('input')">OK</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>
<script>
export default {
	props:['value']
}
</script>