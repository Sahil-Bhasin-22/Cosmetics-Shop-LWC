import { LightningElement, track } from 'lwc';

export default class CustomerRegistration extends LightningElement {
    @track Name = '';
    @track Email = '';
    @track Phone = '';
    @track Address = '';

    handleNameChange(event) {
        this.Name = event.target.value;
    }
    handleEmailChange(event) {
        this.Email = event.target.value;
    }
    handlePhoneChange(event) {
        this.Phone = event.target.value;
    }
    handleAddressChange(event) {
        this.Address = event.target.value;
    }
    handleSubmit() {
        const customerData = {
            Name: this.Name,
            Email: this.Email,
            Phone: this.Phone,
            Address: this.Address
        };
        console.log('Customer Data Submitted: ', customerData);
    }
}
