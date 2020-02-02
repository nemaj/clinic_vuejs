<template>
<v-dialog max-width="290" :value="value" @input="$emit('input')">
	<v-card>
		<v-card-text>
			<v-alert text type="error" v-show="true" color="red darken-1">
				<p v-for="error in local_errors">{{ error }}</p>
      		</v-alert>
  		</v-card-text>

		<v-card-actions>
	    	<div class="flex-grow-1"></div>

	    	<v-btn color="red darken-1" text @click.native="$emit('input')">OK</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>
<script>
export default {
	props:['value', 'errors'],
	data: () => ({
		local_errors: []
	}),
	watch:{
		value(val){
			this.local_errors = this.errors;
		}
	}
}
</script>