<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6 mb-3">
            <h1>PURCHASE</h1>
        </div>
        <div v-if="cart.length" class="col-6 mb-3">
            <div class="row header">
                <div class="col-2"></div>
                <div class="col-3"></div>
                <div class="col-3 text-center">Quantity</div>
                <div class="col-2 text-end">Price</div>
                <div class="col-2 text-end">Total</div>
            </div>
        </div>
        <div v-else>
            <h3>Cart is empty.</h3>
        </div>
        <div v-for="product in cart"  class="col-6">
            <div class="row align-items-center">
                <div class="col-2 text-center"><img :src="ProductImage(product.image)" class="product-image" :alt="product.title"/></div>
                <div class="col-3 title">{{ product.title }}</div>
                <div class="col-3 text-center">
                    {{ product.quantity }}
                </div>
                <div class="col-2 text-end">{{ (product.sale_price ?? product.price).toFixed(2) }} €</div>
                <div class="col-2 text-end">{{ ((product.sale_price ?? product.price) * product.quantity).toFixed(2) }} €</div>
            </div>
        </div>
        <div class="col-6">
            <hr/>
        </div>
        <div class="col-6 mb-5 summary">
            <div class="row justify-content-end">
                <div class="col-4 bold">Total without VAT</div>
                <div class="col-3 text-end">{{ totalPrice }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">VAT <small>(22%)</small></div>
                <div class="col-3 text-end">{{ DDV }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">Total with VAT</div>
                <div class="col-3 text-end">{{ totalPriceDDV }} €</div>
            </div>
        </div>
        <div class="col-8 mb-3">
            <h3>DELIVERY INFORMATION</h3>
        </div>
        <div class="row col-8 mb-3">
            <form class="col-5">
                <label>First name</label>
                <input type="text" class="form-control" v-model="customer.first_name" @blur="customer_preview.first_name = customer.first_name">
                <div v-if="errors.first_name" class="invalid">
                    {{ errors.first_name }}
                </div>

                <label>Last name</label>
                <input type="text" class="form-control" v-model="customer.last_name" @blur="customer_preview.last_name = customer.last_name">
                <div v-if="errors.last_name" class="invalid">
                    {{ errors.last_name }}
                </div>

                <label>Address</label>
                <input type="text" class="form-control" v-model="customer.address" @blur="customer_preview.address = customer.address">
                <div v-if="errors.address" class="invalid">
                    {{ errors.address }}
                </div>

                <label>Postal code</label>
                <input type="text" class="form-control" v-model="customer.postal_number" @blur="customer_preview.postal_number = customer.postal_number">
                <div v-if="errors.postal_number" class="invalid">
                    {{ errors.postal_number }}
                </div>

                <label>Post</label>
                <input type="text" class="form-control" v-model="customer.post" @blur="customer_preview.post = customer.post">
                <div v-if="errors.post" class="invalid">
                    {{ errors.post }}
                </div>

                <label>E-mail</label>
                <input type="email" class="form-control" v-model="customer.email" @blur="customer_preview.email = customer.email">
                <div v-if="errors.email" class="invalid">
                    {{ errors.email }}
                </div>
            </form>
            <div class="col-7">
                <div class="card p-3 mb-3">
                    <p>Payment: COD</p>
                    <p>Delivery: Pošta Slovenije</p>
                    <div class="card p-3 bg-grey">
                        <p>{{customer_preview.first_name}} {{customer_preview.last_name}}</p>
                        <p>{{customer_preview.address}}</p>
                        <p>{{customer_preview.postal_number}} {{customer_preview.post}}</p>
                        <p>{{customer_preview.email}}</p>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-dark" @click="Submit()">Submit order</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, inject, ref} from "vue";

export default {
    name: "Purchase",
    setup() {
        const ClearCart = inject('ClearCart');
        const cart = ref([...inject('cart').value]);
        const ChangeActiveComponent = inject('ChangeActiveComponentSale');

        const customer = ref({
            first_name: null,
            last_name: null,
            address: null,
            postal_number: null,
            post: null,
            email: null
        });

        const customer_preview = ref({
            first_name: null,
            last_name: null,
            address: null,
            postal_number: null,
            post: null,
            email: null
        });

        const errors = ref({
            first_name: "",
            last_name: "",
            address: "",
            postal_number: "",
            post: "",
            email: ""
        });

        const totalPriceDDV = computed(() => {
            return cart.value.reduce((prev, cur) => {
                return prev + ((cur.sale_price ?? cur.price) * cur.quantity);
            }, 0).toFixed(2)
        });

        const DDV = computed(() => {
            return (totalPriceDDV.value * 0.22).toFixed(2);
        });

        const totalPrice = computed(() => {
            return (totalPriceDDV.value - DDV.value).toFixed(2);
        });


        function DecreaseQuantity(product) {
            if(product.quantity > 0) product.quantity--
        }

        function IncreaseQuantity(product) {
            product.quantity++
        }

        function ProductImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        function ResetErrors() {
            errors.value = {
                first_name: "",
                last_name: "",
                address: "",
                postal_number: "",
                post: "",
                email: ""
            };
        }

        function ValidateForm() {
            ResetErrors();

            let formIsValid = true;

            if(!customer.value.first_name) {
                errors.value.first_name = "First name is required.";
                formIsValid = false;
            }

            if(!customer.value.last_name) {
                errors.value.last_name = "Last name is required.";
                formIsValid = false;
            }

            if(!customer.value.address) {
                errors.value.address = "Address is required.";
                formIsValid = false;
            }

            // Some countries use alphanumeric postal numbers
            if(!customer.value.postal_number) {
                errors.value.postal_number = "Postal number is required..";
                formIsValid = false;
            }

            if(!customer.value.post) {
                errors.value.post = "Post is required.";
                formIsValid = false;
            }

            if(!customer.value.email) {
                errors.value.email = "E-mail is required.";
                formIsValid = false;
            }

            // copied from https://stackoverflow.com/a/46181
            else if(!String(customer.value.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                errors.value.email = "E-mail is not valid.";
                formIsValid = false;
            }

            return formIsValid;
        }

        const SetCartSummary = inject('SetCartSummary');
        function Submit() {
            if(!ValidateForm()) return;
            SetCartSummary(cart.value);
            ChangeActiveComponent('ThankYou');
            ClearCart();
        }

        return {
            DDV,
            totalPrice,
            totalPriceDDV,
            DecreaseQuantity,
            IncreaseQuantity,
            ProductImage,
            cart,
            customer,
            customer_preview,
            Submit,
            errors
        }
    }
}
</script>

<style scoped>
.header, .title {
    font-size: large;
    font-weight: 500;
}

.summary {
    font-weight: 500;
}

.product-image {
    max-height: 50px;
    max-width: 50px;
}

.bg-grey {
    background-color: #dadada;
}

.invalid {
    width: 100%;
    margin-bottom: 0.25rem;
    font-size: .875em;
    color: #dc3545;
}
</style>