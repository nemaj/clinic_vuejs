<template>
<div>
	<button @click="showWizardDialog = true" class="btn btn-primary">Show Wizard dialog</button>
	<wizard-dialog v-model="showWizardDialog"></wizard-dialog>  
</div>
</template>
<script>
import WizardDialog from "./WizardDialog.vue";

export default {
    components: {
  		WizardDialog
  	},
  	data: () => ({
  		showWizardDialog: false
  	})  
}
</script> 