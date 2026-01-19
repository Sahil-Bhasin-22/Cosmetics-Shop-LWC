import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import PRODUCT2_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import PRODUCTCODE_FIELD from '@salesforce/schema/Product2.ProductCode';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';
import ISACTIVE_FIELD from '@salesforce/schema/Product2.IsActive';

export default class ProductCatalog extends LightningElement {
  products = [];
  loading = true;
  error;

  // Configure which list view and fields to fetch via LDS
  listViewApiName = 'All'; // change if you need a different list view
  pageSize = 50;

  @wire(getListUi, {
    objectApiName: PRODUCT2_OBJECT,
    listViewApiName: '$listViewApiName',
    pageSize: '$pageSize',
    sortBy: NAME_FIELD
  })
  wiredList({ data, error }) {
    if (error) {
      this.error = this.normalizeError(error);
      this.loading = false;
      return;
    }
    if (data) {
      try {
        const records = data?.records?.records || [];
        this.products = records.map((r) => ({
          id: r.id,
          name: r.fields?.Name?.value,
          code: r.fields?.ProductCode?.value,
          family: r.fields?.Family?.value,
          isActive: r.fields?.IsActive?.value
        }));
        this.error = undefined;
      } catch (e) {
        this.error = e?.message || 'Unknown parsing error';
      } finally {
        this.loading = false;
      }
    }
  }

  get hasProducts() {
    return this.products && this.products.length > 0;
  }

  normalizeError(err) {
    if (!err) return 'Unknown error';
    if (Array.isArray(err.body)) {
      return err.body.map((e) => e.message).join(', ');
    }
    if (typeof err.body?.message === 'string') {
      return err.body.message;
    }
    return err.message || JSON.stringify(err);
  }
}
