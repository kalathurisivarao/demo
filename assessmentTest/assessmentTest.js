import { LightningElement, wire } from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';
const PageSizeOptions = [

{ label: '10', value: 10 },

 { label: '20', value: 20 },

 { label: '30', value: 30 },
 { label: '40', value: 40 },
 { label: '50', value: 50 },

];
export default class GetProducts extends LightningElement {
    pageOptions = PageSizeOptions;
    pageLimit = PageSizeOptions[0].value;
    presentPage = 1;
    pageNumber=1;
    totalPages;
    columns = [
        { label: 'Product Name', fieldName: 'Name', type: 'text' },
        { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
        { label: 'Price', fieldName: 'Price__c', type: 'Currency' },
        { label: 'Description', fieldName: 'Description', type: 'text' }
    ];
    result = [];
    @wire(getProducts, { pageSize: '$pageLimit', pageNumber: '$presentPage' })
    gettingProducts({ error, data }) {
        if (data) {
            this.result = data;
        } else if (error) {
            console.error(error);
        }
    }
    handleChange(event) {
        const { value } = event.target;
        this.pageLimit = value;
        this.presentPage = 1;
    }
    handlePrevious() {
        this.presentPage = this.presentPage - 1;
    }
    handleNext() {
        this.presentPage = this.presentPage + 1;
    }
    handleFirst() {
        this.presentPage = 1;
    }

   handleLast() {
        this.totalPages = Math.ceil(this.result.length / this.pageLimit);
        this.presentPage = this.totalPages;
    
    }

}